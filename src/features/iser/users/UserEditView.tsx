import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import {
  useNavigate,
} from "react-router-dom";
import { RootState } from 'rootStore/rootReducer';
import LoadingBackdrop from 'common/components/backdrops/LoadingBackdrop';
import { triggerNotification } from 'features/notifiers/store/notifiersSlice';
import { fetchUser, fetchUserFail, updateUser } from 'features/iser/store/iserSlice';
import { useRenderMiddleware } from 'common/utils/useObservable';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators'
import { ActionFromCreator } from "rootStore/common";

import ProfileSettings from '../profile/components/ProfileSettings';
import ProfileCard  from '../profile/components/ProfileCard';
import UserEditViewSkeleton from './components/skeletons/UserEditViewSkeleton';
import UserSettings from './components/UserSettings/UserSettings';

// ----------------------------------------------------------------------

const UserEditView = () => {

  const fetchUserState = useSelector((state: RootState) => state.iserReducer.iserReactiveState.fetchUser);
  const targetUser = useSelector((state: RootState) => state.iserReducer.targetUser);

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useRenderMiddleware(fetchUserFail.type, 
    switchMap((action: ActionFromCreator<typeof fetchUserFail>) => {
    if(action.payload.error.response.requestStatus === 'not_found')
      return of(navigate('/iser/users/not_found'));
    return of();
  }))

  useEffect(() => {
    dispatch(fetchUser({userId: params.id ?? ""}))
  }, [])

  const onProfileFormSubmit = async (data: Profile) => {
      dispatch(triggerNotification())
      await dispatch(updateUser({ ...data, userId: params.id ?? ''}))
      dispatch(fetchUser({userId: params.id ?? ""}))
    }

  const userProfile = targetUser ? {
      firstName: targetUser.firstName,
      lastName: targetUser.lastName,
      emailAddress: targetUser.emailAddress,
      role: targetUser.role,
      location: targetUser.location,
      gender: targetUser.gender,
      language: targetUser.language,
      birthDate: targetUser.birthDate
    } : null


  const userDetails = targetUser ? {
      userId: targetUser.userId,
      emailAddress: targetUser.emailAddress,
      userStatus: targetUser.userStatus,
      userType: targetUser.userType,
    } : null

  return (
    <LoadingBackdrop open={fetchUserState.isRequesting} Skeleton={<UserEditViewSkeleton/>}>
        { (targetUser?.userId === params.id && userProfile && userDetails) && (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <ProfileCard profileVariant="secondary" profile={{...userProfile, ...userDetails}}/>
        </Grid>
        <Grid item xs={12} sm={12}>
          <ProfileSettings
            profile={userProfile}
            onProfileUpdate={onProfileFormSubmit}
            isLoading={false}/>
        </Grid>
        <Grid item xs={12} sm={12}>
          <UserSettings user={userDetails}/>
        </Grid>
      </Grid>)}
    </LoadingBackdrop>
  )
}


UserEditView.whyDidYouRender = true;

export default UserEditView;
