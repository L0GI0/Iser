import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AjaxResponse, AjaxError } from "rxjs/ajax";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Box, Grid } from '@mui/material';
import {
  useNavigate,
} from "react-router-dom";
import { ajaxApi } from 'common/api/ajaxApi';
import { RootState } from 'rootStore/rootReducer';
import LoadingBackdrop from 'common/components/backdrops/LoadingBackdrop';
import { ProfileContent, ProfileBackground } from '../profile/components/styledElements';
import InfoCard from 'common/components/InfoCard';
import ProfileCard  from '../profile/components/ProfileCard';

// ----------------------------------------------------------------------

interface AccountDataState {
  user: Omit<User, keyof Profile | 'userId'>,
  profile: Profile
}

const UserProfileView = () => {

  const [isUserFetching, setIsUserFetching] = useState<boolean>(true);
  const [accountData, setAccountData] = useState<AccountDataState | null>(null);

  const params = useParams();

  const state = useSelector((state: RootState) => state);

  const navigate = useNavigate();

  const ajax = ajaxApi(state);

  const fetchUser = (): Observable<Account> =>
    ajax.get(`users/${params.id}`).pipe(
      map((ajaxResponse: AjaxResponse<{ user: Account }>): Account => {
        return ajaxResponse.response.user;
      })
    );

  useEffect(() => {
  }, [accountData])

  useEffect(() => {
    fetchUser().subscribe({
      next: (user: Account) => { const { emailAddress, userStatus, userType, userId, ...rest } = user;
        setAccountData({
          user: { 
            emailAddress: emailAddress,
            userStatus: userStatus,
            userType: userType
        },
        profile: { ...rest }})},
      error: (error: AjaxError) => { setIsUserFetching(false);
        if(error.status === 404)
          navigate('/iser/users/not_found')
        },
      complete: () => { return setIsUserFetching(false) }
    }
    )
  }, [])

  return (
    <LoadingBackdrop open={isUserFetching}>
        { accountData &&
        <> 
          <ProfileContent>
            <ProfileBackground/>
            <ProfileCard profileVariant="primary" profile={{
              firstName: accountData.profile.firstName,
              lastName: accountData.profile.lastName,
              emailAddress: accountData.user.emailAddress,
              role: accountData.profile.role,
              location: accountData.profile.location,
              userStatus: accountData.user.userStatus,
              userType: accountData.user.userType
              }}/>
          </ProfileContent>
          <Box sx={{ mt: 5, mx: 5 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} lg={6}>
                <InfoCard
                  title="Profile information"
                  info={accountData.profile}
                  action={{
                    route: `/iser/users/edit/${params.id}`,
                    tooltip: "Edit Profile",
                    icon: "fa-solid:user-edit",
                    authorised: true }}/>
              </Grid>
              <Grid item xs={12} lg={6}>
                <InfoCard
                  title="User information"
                  info={accountData.user}
                  action={{
                    route: `/iser/users/edit/${params.id}`,
                    tooltip: "Edit User",
                    icon: "fa-solid:user-edit",
                    authorised: true }}/>
              </Grid>
            </Grid>
          </Box>
        </>
        } 
    </LoadingBackdrop>
  )
}

export default UserProfileView;