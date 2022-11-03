import styled from 'styled-components';
import { Box, Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'rootStore/rootReducer';
import { triggerNotification } from 'features/notifiers/store/notifiersSlice';
import { updateProfile } from 'features/account/store/accountSlice';
import { useStateChangeNotifier, getProfileStateSnackbarMap } from 'features/notifiers/useStateChangeNotifiers'
import { useTranslation } from 'react-i18next';
import { ProfileContent, ProfileBackground } from './components/styledElements';
import PlatformSettings from './components/PlatformSettings'; 
import ProfileSettings from './components/ProfileSettings';
import ProfileCard from './components/ProfileCard';

// ----------------------------------------------------------------------

export const MainProfileCard = styled(ProfileCard)(({ theme }) => ({
  ".MuiCard-root": {
    marginTop: theme.spacing(-8),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  }
}))

// ----------------------------------------------------------------------

const ProfileView = () => {

  const { profile, user } = useSelector((state: RootState) => state.accountReducer);
  const dispatch = useDispatch();

  const { accountReactiveState: { profileUpdate: profileUpdateState }} = useSelector((state: RootState) => state.accountReducer);
  
  const { t } = useTranslation('notifiers')

  useStateChangeNotifier(profileUpdateState.reqStatus, getProfileStateSnackbarMap(dispatch, t));

  const onProfileFormSubmit = (data: Profile) => {
    dispatch(triggerNotification())
    dispatch(updateProfile({
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      birthDate: data.birthDate,
      location: data.location,
      language: data.language,
      role: data.role }))}

  return (
    <ProfileContent>
      <ProfileBackground/>
      <MainProfileCard profile={{
          firstName: profile.firstName,
          lastName: profile.lastName,
          emailAddress: user.emailAddress,
          role: profile.role,
          location: profile.location,
          userStatus: user.userStatus,
          userType: user.userType
        }}/>
      <Box sx={{ mt: 3, mb: 3 }}>
        <Grid container spacing={3}> 
          <Grid item xs={12} md={5}>
            <PlatformSettings />
          </Grid>
          <Grid item xs={12} md={7}>
            <ProfileSettings profile={profile} onProfileUpdate={onProfileFormSubmit} isLoading={profileUpdateState.isRequesting}/>
          </Grid>
        </Grid>
      </Box>
    </ProfileContent>
  )
}

export default ProfileView;