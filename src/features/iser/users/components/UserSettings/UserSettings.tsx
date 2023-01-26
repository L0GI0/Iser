import BanUser from './BanUser';
import DeleteUser from './DeleteUser';
import UserPermissions from './UserPermissions';
import { Stack } from '@mui/material';

// ----------------------------------------------------------------------

interface UserSettingsProps {
  user: User
}

const UserSettings: React.FC<UserSettingsProps> = ({ user }) => {

  return (
    <Stack spacing={2}>
      <UserPermissions user={user}/>
      <BanUser user={user}/>
      <DeleteUser user={user}/>
    </Stack>
  )
}

export default UserSettings;