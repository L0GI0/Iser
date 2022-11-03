import { Grid, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from 'rootStore/rootReducer';
import ProfileCard from 'features/iser/profile/components/ProfileCard';
import AppearanceSettings from './components/AppearanceSettings';
import PasswordSettings from './components/PasswordSettings';

// ----------------------------------------------------------------------

const SettingsView: React.FC = () => {

  const { profile, user } = useSelector((state: RootState) => state.accountReducer);

  return (
    <Grid container spacing={3}>
      <Grid item sm={12} md={12} lg={6}>
        <ProfileCard direction={{xs: "column", sm: "row", md: "row", lg: "column", xl: "row"}} profileVariant="secondary" profile={{
          firstName: profile.firstName,
          lastName: profile.lastName,
          emailAddress: user.emailAddress,
          role: profile.role,
          location: profile.location,
          userStatus: user.userStatus,
          userType: user.userType
        }}/>
        <Box mt={3}>
          <PasswordSettings/>
        </Box>
      </Grid>
      <Grid item sm={12} md={12} lg={6}>
        <AppearanceSettings/>
      </Grid>   
    </Grid>
    )
}

export default SettingsView;