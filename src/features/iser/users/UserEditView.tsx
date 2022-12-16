import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AjaxResponse, AjaxError } from "rxjs/ajax";
import { map} from "rxjs/operators";
import { Grid } from '@mui/material';
import {
  useNavigate,
} from "react-router-dom";
import { ajaxApi } from 'common/api/ajaxApi';
import { RootState } from 'rootStore/rootReducer';
import { Observable } from "rxjs";
import LoadingBackdrop from 'common/components/backdrops/LoadingBackdrop';
import { triggerNotification } from 'features/notifiers/store/notifiersSlice';
import { useTranslation } from 'react-i18next';
import { userInitialState, profileInitialState } from 'features/account/store/accountSlice';
import { userRequestsDefaultState } from 'features/iser/store/iserSlice';
import { useStateChangeNotifier, getUsersProfileStateSnackbarMap } from 'features/notifiers/useStateChangeNotifiers'

import ProfileSettings from '../profile/components/ProfileSettings';
import ProfileCard  from '../profile/components/ProfileCard';
import UserEditViewSkeleton from './components/skeletons/UserEditViewSkeleton';
import UserSettings from './components/UserSettings/UserSettings';

// ----------------------------------------------------------------------

interface AccountDataState {
  user: User,
  profile: Profile 
}

const accountDataInitialState = {
  user: { ...userInitialState, userId: '' },
  profile: profileInitialState
}

const UserEditView = () => {

  const [editProfileReqState, setEditProfileReqState] = useState<ReactiveRequestState>(userRequestsDefaultState);
  const [accountData, setAccountData] = useState<AccountDataState>(accountDataInitialState);
  const [isAccountOutdated, setIsAccountOutdated] = useState<boolean>(true);

  
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { t } = useTranslation('notifiers');

  const updateProfileReqState = (status: RequestStatus | null | undefined, isRequesting: boolean | undefined) => {
    setEditProfileReqState((prevUserReqState) => ({
      isRequesting: isRequesting ?? prevUserReqState.isRequesting, 
      reqStatus: status === undefined ? prevUserReqState.reqStatus : status,
    }))
  }

  useStateChangeNotifier(
    editProfileReqState.reqStatus,
    getUsersProfileStateSnackbarMap(
      t,
      accountData.user.emailAddress || 'unknown',
      () => updateProfileReqState(null, undefined)));
 
  const params = useParams();

  const accessToken = useSelector((state: RootState) => state.accountReducer.accessToken);
  
  const ajax = ajaxApi(undefined, accessToken);


  
  const fetchUser = (): Observable<Account> => {
    updateProfileReqState(null, true);
    return ajax.get(`users/${params.id}`).pipe(
      map((ajaxResponse: AjaxResponse<{ user: Account }>): Account => {
        return ajaxResponse.response.user;
      }));
  }

  const updateProfile = (data: Profile) =>
    ajax.post(`profile/${params.id}`, { ...data }).pipe(
      map((ajaxResponse: AjaxResponse<{ profile: Profile }>): Profile => {
        return ajaxResponse.response.profile;
      }),
    );

  useEffect(() => {
    if(isAccountOutdated){
      fetchUser().subscribe({
        next: (account: Account) => {
          const { emailAddress, userStatus, userType, userId, ...rest } = account;
          setAccountData({
          user: { 
            emailAddress: emailAddress,
            userId: userId,
            userStatus: userStatus,
            userType: userType
          },
          profile: { ...rest}})
          setIsAccountOutdated(false);
      },
        error: (error: AjaxError) => { 
          if(error.status === 404)
            navigate('/iser/users/not_found')
          setIsAccountOutdated(false);
          updateProfileReqState(undefined, false);
        },
        complete: () => { 
          setIsAccountOutdated(false);
          updateProfileReqState(undefined, false);
         }
      }
      )  
    }
  }, [isAccountOutdated])

const onProfileFormSubmit = (data: Profile) => {
    updateProfileReqState(undefined, true);
    dispatch(triggerNotification())
    updateProfile(data).subscribe({
      next: (profileUpdateResponse: Profile) => {
        setAccountData((prevAccountData) => {
          return { user: prevAccountData.user, profile: profileUpdateResponse as Profile}
        })
      },
      error: (error: AjaxError) => {
        updateProfileReqState('failed', false);
      },
      complete: () => {
        updateProfileReqState('success', false);
      }
    })
  }

  return (
    <LoadingBackdrop open={editProfileReqState.isRequesting} Skeleton={<UserEditViewSkeleton/>}>
        { (accountData.user.userId === params.id) && (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <ProfileCard profileVariant="secondary" profile={{
            firstName: accountData.profile.firstName,
            lastName: accountData.profile.lastName,
            emailAddress: accountData.user.emailAddress,
            role: accountData.profile.role,
            location: accountData.profile.location,
            userStatus: accountData.user.userStatus,
            userType: accountData.user.userType
            }}/>
        </Grid>
        <Grid item xs={12} sm={12}>
          <ProfileSettings
            profile={accountData.profile}
            onProfileUpdate={onProfileFormSubmit}
            isLoading={false}/>
        </Grid>
        <Grid item xs={12} sm={12}>
          <UserSettings updateAccount={setIsAccountOutdated} user={accountData.user}/>
        </Grid>
      </Grid>)}
    </LoadingBackdrop>
  )
}


UserEditView.whyDidYouRender = true;

export default UserEditView;
