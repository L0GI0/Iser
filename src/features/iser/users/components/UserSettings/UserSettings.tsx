import BanUser from './BanUser';
import DeleteUser from './DeleteUser';
import UserPermissions from './UserPermissions';
import { Stack } from '@mui/material';

// ----------------------------------------------------------------------

interface UserSettingsProps {
  user: User,
  updateAccount: SetStateCallback<boolean>
}

const UserSettings: React.FC<UserSettingsProps> = ({ user, updateAccount }) => {

  return (
    <Stack spacing={2}>
      <UserPermissions user={user} updateAccount={updateAccount} />
      <BanUser user={user} updateAccount={updateAccount} />
      <DeleteUser user={user} updateAccount={updateAccount}/>
    </Stack>
  )
}

export default UserSettings;