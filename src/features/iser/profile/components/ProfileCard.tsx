import { Typography, Box, Stack } from '@mui/material';
import Iconify from 'common/components/Iconify';
import Label from 'common/components/Label';
import { ProfileCardContainer, ProfileAvatar } from './styledElements';
import { ResponsiveStyleValue} from '@mui/system';

// ----------------------------------------------------------------------

type ProfileCardVariant = "primary" | "secondary";

export interface ProfileCardProps {
  profile: Pick<Account, 'firstName' | 'lastName' | 'emailAddress' | 'role' | 'userStatus' | 'userType' | 'location'>,
  profileVariant?: ProfileCardVariant,
  direction?: ResponsiveStyleValue<'row' | 'row-reverse' | 'column' | 'column-reverse'>
}

const ProfileCard: React.FC<ProfileCardProps> = ({profile, profileVariant = "primary", direction={xs: "column", sm: "row"}}) => {

  return (
  <ProfileCardContainer profileVariant={profileVariant}>
    <Stack direction={direction} alignItems='center'spacing={3}>
        <ProfileAvatar />
        <Box height="100%" width="100%" mt={0.5} sx={{ height: '100%', marginTop: .5, lineHeight: 1}}>
          <Stack direction={direction} justifyContent="space-between" alignItems="center" spacing={2}>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', sm: 'start'}}}>
              <Typography variant="h4">
                {profile.firstName} {profile.lastName}
              </Typography>
              <Typography variant="subtitle2" sx={{color: 'grey.500'}}>
                {profile.role}
              </Typography>
            </Box>
            <Stack direction="column" alignItems="start">
              <Stack direction="row" justifyContent="center" maxWidth={'50vw'} alignItems="center" spacing={2}>
                <Iconify icon="ic:outline-email" sx={{minWidth: 24}}/>
                <Typography variant="h6" noWrap={true} textOverflow="ellipsis">
                  {profile.emailAddress}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <Iconify icon="ci:location"/>
                <Typography variant="subtitle2">
                  {profile.location}
                </Typography>
              </Stack> 
            </Stack>
            <Stack direction={{xs: "row", sm: "column"}} spacing={1}>
              <Label variant='filled' color={(profile.userStatus === 'banned' && 'error') || 'success'}>
                <Typography variant='button' >
                  { profile.userStatus }
                </Typography>
              </Label>
              <Label variant='outlined' color={(profile.userType === 'admin' && 'warning') || 'info'}>
                <Typography variant='label'>
                  { profile.userType }
                </Typography>
              </Label>
            </Stack>
          </Stack>
        </Box>
      </Stack>
  </ProfileCardContainer>
  )
}

export default ProfileCard;