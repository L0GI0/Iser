
// ----------------------------------------------------------------------

export const USER_TYPES: AccountType[] = ['user', 'admin']

export const USER_TYPE: Record<AccountType, AccountType> = {
  user: 'user',
  admin: 'admin'
}

export const USER_STATUS: Record<UserStatus, UserStatus> = {
  active: 'active',
  banned: 'banned'
}