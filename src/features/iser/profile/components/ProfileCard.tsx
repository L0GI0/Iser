import { Typography, Box, alpha, Card, Grid, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from 'rootStore/rootReducer';
import styled from 'styled-components';
import ACCOUNT from '_mocks/account';

// ----------------------------------------------------------------------

type ProfileCardVariant = "primary" | "secondary";

interface ProfileCardProps {
  profileVariant?: ProfileCardVariant
}

const ProfileCardContainer = styled(Card)<ProfileCardProps>(({ theme, profileVariant }) => ({
  borderRadius: theme.borders.borderRadius.section,
  boxShadow: theme.shadows[3],
  padding: theme.spacing(2),
  ...(profileVariant === 'primary' && {
  backgroundColor:  alpha(theme.palette.background.default, 0.8),
    backdropFilter: `saturate(200%) blur(30px)`,
    marginTop: theme.spacing(-8),
    marginLeft: theme.spacing(3),
    position: "relative",
    marginRight: theme.spacing(3)
  }),
  ...(profileVariant === 'secondary' && {
    marginBottom: theme.spacing(6),
  }),
  [theme.breakpoints.only('xs')]: {
    '.MuiGrid-root': {
      justifyContent: 'center',
    }
  }
}))

const ProfileAvatar = styled(Avatar).attrs({ src: ACCOUNT.photoURL, alt: 'profile-image '})(( { theme }) => ({
  height: '94px',
  width: '94px',
  boxShadow: theme.shadows[1]
}))

// ----------------------------------------------------------------------

const ProfileCard: React.FC<ProfileCardProps> = ({profileVariant = "primary"}) => {

  const { profile } = useSelector((state: RootState) => state.accountReducer)

  return (
  <ProfileCardContainer profileVariant={profileVariant}>
    <Grid container spacing={3} alignItems="center">
      <Grid item>
        <ProfileAvatar />
      </Grid>
      <Grid item>
        <Box height="100%" mt={0.5} sx={{ height: '100%', marginTop: 0.5, lineHeight: 1}}>
          <Typography variant="h4" fontWeight="medium">
            {profile.firstName} {profile.lastName}
          </Typography>
          <Typography variant="subtitle2" fontWeight={400}>
            {profile.role}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  </ProfileCardContainer>
  )
}

export default ProfileCard;