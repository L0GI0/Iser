import { Box, alpha, Card, Avatar } from '@mui/material';
import styled from 'styled-components';
import ACCOUNT from '_mocks/account';
import profile_bg from "common/images/profile_bg.jpg";
import { ProfileCardProps } from './ProfileCard';

// ----------------------------------------------------------------------

export const ProfileContent = styled.div`
  position: relative;
`

export const ProfileBackground = styled(Box)(( { theme: { functions: { linearGradient },  palette, borders, spacing}}) => ({
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

export const ProfileCardContainer = styled(Card)<Pick<ProfileCardProps, 'profileVariant'>>(({ theme, profileVariant }) => ({
  borderRadius: theme.borders.borderRadius.section,
  boxShadow: theme.shadows[3],
  padding: theme.spacing(3),
  ...(profileVariant === 'primary' && {
  backgroundColor:  alpha(theme.palette.background.default, 0.8),
    backdropFilter: `saturate(200%) blur(30px)`,
    marginTop: theme.spacing(-8),
    marginLeft: theme.spacing(3),
    position: "relative",
    marginRight: theme.spacing(3)
  }),
  [theme.breakpoints.only('xs')]: {
    '.MuiGrid-root': {
      justifyContent: 'center',
    }
  }
}))

export const ProfileAvatar = styled(Avatar).attrs({ src: ACCOUNT.photoURL, alt: 'profile-image '})(( { theme }) => ({
  height: '94px',
  width: '94px',
  boxShadow: theme.shadows[1]
}))