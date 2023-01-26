import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import {
  useNavigate,
} from "react-router-dom";
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators'
import { RootState } from 'rootStore/rootReducer';
import LoadingBackdrop from 'common/components/backdrops/LoadingBackdrop';
import InfoCard from 'common/components/Card/InfoCard';
import { useRenderMiddleware } from 'common/utils/useObservable';
import { ActionFromCreator } from "rootStore/common";

import { fetchUser, fetchUserFail } from '../store/iserSlice';
import { ProfileContent, ProfileBackground } from '../profile/components/styledElements';
import ProfileCard  from '../profile/components/ProfileCard';

// ----------------------------------------------------------------------

const UserProfileView = () => {

  const fetchUserState = useSelector((state: RootState) => state.iserReducer.iserReactiveState.fetchUser);
  const targetUser = useSelector((state: RootState) => state.iserReducer.targetUser);

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUser({userId: params.id ?? ""}))
  }, [])

  useRenderMiddleware(fetchUserFail.type, 
    switchMap((action: ActionFromCreator<typeof fetchUserFail>) => {
    if(action.payload.error.response.requestStatus === 'not_found')
      return of(navigate('/iser/users/not_found'));
    return of();
  }))

    const userProfile = targetUser ? {
      firstName: targetUser.firstName,
      lastName: targetUser.lastName,
      emailAddress: targetUser.emailAddress,
      role: targetUser.role,
      location: targetUser.location,
      gender: targetUser.gender,
      language: targetUser.language,
      birthDate: targetUser.birthDate?.toLocaleString()
    } : null


  const userDetails = targetUser ? {
      userId: targetUser.userId,
      emailAddress: targetUser.emailAddress,
      userStatus: targetUser.userStatus,
      userType: targetUser.userType,
    } : null

  return (
    <LoadingBackdrop open={fetchUserState.isRequesting}>
        { targetUser && userProfile && userDetails &&
        <> 
          <ProfileContent>
            <ProfileBackground/>
            <ProfileCard profileVariant="primary" profile={{
              firstName: targetUser.firstName,
              lastName: targetUser.lastName,
              emailAddress: targetUser.emailAddress,
              role: targetUser.role,
              location: targetUser.location,
              userStatus: targetUser.userStatus,
              userType: targetUser.userType
              }}/>
          </ProfileContent>
          <Box sx={{ mt: 5, mx: 5 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} lg={6}>
                <InfoCard
                  title="Profile information"
                  info={userProfile}
                  action={{
                    route: `/iser/users/edit/${params.id}`,
                    tooltip: "Edit Profile",
                    icon: "fa-solid:user-edit",
                    authorised: true }}/>
              </Grid>
              <Grid item xs={12} lg={6}>
                <InfoCard
                  title="User information"
                  info={userDetails}
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