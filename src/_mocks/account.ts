// ----------------------------------------------------------------------

interface Account {
  displayName: string,
  email: string,
  photoURL: string,
  role: 'user'
}

const account: Account = {
  displayName: 'Jaydon Frankie',
  email: 'demo@minimals.cc',
  photoURL: '/static/avatars/avatar_default.jpg',
  role: 'user',
};

export default account;
