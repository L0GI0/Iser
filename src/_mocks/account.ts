// ----------------------------------------------------------------------

interface Account {
  firstName: string,
  lastName: string,
  email: string,
  photoURL: string,
  gender: string,
  position: string,
  location: string,
  role: 'user'
}

const ACCOUNT: Account = {
  firstName: 'Jaydon',
  lastName: "Frankie",
  email: 'demo@minimals.cc',
  photoURL: '/static/avatars/avatar_default.jpg',
  gender: 'Male',
  position: 'Software Engineer',
  location: 'Poland',
  role: 'user',
};

export default ACCOUNT;
