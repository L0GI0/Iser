// ----------------------------------------------------------------------

interface Account {
  firstName: string,
  lastName: string,
  email: string,
  photoURL: string,
  gender: string,
  role: string,
  location: string,
  accountType: 'user'
}

const ACCOUNT: Account = {
  firstName: 'Jaydon',
  lastName: "Frankie",
  email: 'demo@minimals.cc',
  photoURL: '/static/avatars/avatar_default.jpg',
  gender: 'Male',
  role: 'Software Engineer',
  location: 'Poland',
  accountType: 'user',
};

export default ACCOUNT;
