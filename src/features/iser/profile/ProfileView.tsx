import { Box, alpha, Card, Grid } from '@mui/material';
import profile_bg from "common/images/profile_bg.jpg";
import styled from 'styled-components';
import PlatformSettings from './components/PlatformSettings'; 
import ProfileSettings from './components/ProfileSettings';
import ProfileCard from './components/ProfileCard';

// ----------------------------------------------------------------------

const ProfileContent = styled.div`
  position: relative;
`

const ProfileBackground = styled(Box)(( { theme: { functions: { linearGradient },  palette, borders, spacing}}) => ({
  backgroundImage: 
  `${linearGradient(
    alpha(palette.primary.dark, 0.8),
    alpha(palette.primary.lighter, 0.8)
  )}, url(${profile_bg})`,
  backgroundSize: "cover",
  backgroundPosition: "50%",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  position: "relative",
  minHeight: "18.75rem",
  borderRadius: borders.borderRadius.xxl,
  marginTop: spacing(-3)
}))

const MainProfileCard = styled(ProfileCard)(({ theme }) => ({
  ".MuiCard-root": {
    marginTop: theme.spacing(-8),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  }
}))

// ----------------------------------------------------------------------

const ProfileView = () => {
  return (<ProfileContent>
      <ProfileBackground/>
      <MainProfileCard/>
      <Box sx={{ mt: 5, mb: 3 }}>
        <Grid container spacing={3}> 
          <Grid item xs={12} md={5}>
            <PlatformSettings />
          </Grid>
          <Grid item xs={12} md={7}>
            <ProfileSettings/>
          </Grid>
        </Grid>
      </Box>
    </ProfileContent>
  )
}

export default ProfileView;