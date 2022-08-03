import { Grid, Card } from '@mui/material';
import ProfileCard from 'features/iser/profile/components/ProfileCard';
import AppearanceSettings from './components/AppearanceSettings';
import PasswordSettings from './components/PasswordSettings';

// ----------------------------------------------------------------------

const SettingsView: React.FC = () => {

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} lg={6}>
        <ProfileCard profileVariant="secondary"/>
        <PasswordSettings/>
      </Grid>
      <Grid item xs={12} md={12} lg={6}>
        <AppearanceSettings/>
      </Grid>   
    </Grid>
    )
}

export default SettingsView;