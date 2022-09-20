export {};

declare global {
  
  type Languages = 'en-GB' | 'pl' | 'de' | 'fr';
  
  interface Language {
    value: Languages,
    label: string,
    icon: string,
  }

  type AccountType = 'admin' | 'user'
  
  type Genders = 'Famale' | 'Male' | 'Other';

  interface Profile {
    firstName: string,
    lastName: string,
    gender: Genders,
    birthDate: Date | null,
    location: string,
    language: Languages
    role: string
  }

  type UserStatus = 'active' | 'banned';

  interface User extends Profile {
    userId: string,
    emailAddress : string,
    userStatus: UserStatus,
    userType: AccountType,
  }
  
  type RequestStatus = 'success' | 'failed' | 'unauthorised'  | "forbidden";

}