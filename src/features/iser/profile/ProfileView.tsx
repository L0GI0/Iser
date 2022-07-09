import { Typography, Box, alpha, Card, Grid, Avatar } from '@mui/material'
import profile_bg from "common/images//profile_bg.jpg"
import styled from 'styled-components'
import account from '_mocks/account'
import PlatformSettings from './components/PlatformSettings' 
import ProfileData from './components/ProfileSettings'
import ACCOUNT from '_mocks/account'

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

const ProfileCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.borders.borderRadius.section,
  backdropFilter: `saturate(200%) blur(30px)`,
  backgroundColor:  alpha(theme.palette.background.default, 0.8),
  boxShadow: theme.shadows[3],
  position: "relative",
  marginTop: theme.spacing(-8),
  marginLeft: theme.spacing(3),
  marginRight: theme.spacing(3),
  padding: theme.spacing(2),
  [theme.breakpoints.only('xs')]: {
    '.MuiGrid-root': {
      justifyContent: 'center',
    }
  }
}))

const ProfileAvatar = styled(Avatar).attrs({ src: account.photoURL, alt: 'profile-image '})(( { theme }) => ({
  height: '94px',
  width: '94px',
  boxShadow: theme.shadows[1]
}))

// ----------------------------------------------------------------------

const Profile = () => {
  return (<ProfileContent>
      <ProfileBackground/>
      <ProfileCard>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <ProfileAvatar />
          </Grid>
          <Grid item>
            <Box height="100%" mt={0.5} sx={{ height: '100%', marginTop: 0.5, lineHeight: 1}}>
              <Typography variant="h4" fontWeight="medium">
                {ACCOUNT.firstName} {ACCOUNT.lastName}
              </Typography>
              <Typography variant="subtitle2" fontWeight={400}>
                {ACCOUNT.position}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </ProfileCard>
      <Box sx={{ mt: 5, mb: 3 }}>
        <Grid container spacing={3}> 
          <Grid item xs={12} md={5}>
            <PlatformSettings />
          </Grid>
          <Grid item xs={12} md={7}>
            <ProfileData/>
          </Grid>
        </Grid>
      </Box>
    </ProfileContent>
  )
}

export default Profile