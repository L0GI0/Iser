import { SetStateAction } from "react";
import { PaletteColor } from '@mui/material/styles';

export {};

declare global {

  type IserColor = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

  type IserSkin = keyof PaletteColor;
  
  type IserUIVariant = 'text' | 'filled' | 'outlined' | 'contained';

  type Languages = 'en-GB' | 'pl' | 'de' | 'fr';
  
  interface Language {
    value: Languages,
    label: string,
    icon: string
  }

  type AccountType = 'admin' | 'user'
  
  type Genders = 'Famale' | 'Male' | 'Other';

  interface Profile {
    firstName: string,
    lastName: string,
    gender: Genders,
    birthDate: Date | null,
    location: string,
    language: Languages,
    role: string
  }

  type UserStatus = 'active' | 'banned';

  interface User {
    userId: string,
    emailAddress: string,
    userStatus: UserStatus,
    userType: AccountType
  }

  interface Account extends Profile, User {}
  
  type RequestStatus = 'success' | 'failed' | 'unauthorised' | "forbidden";

  type ReactiveRequestState<ResponseType = undefined> = {
    isRequesting: boolean,
    reqStatus: RequestStatus | null,
  } & (ResponseType extends undefined ? {} : {
    reqStatusResponse: ResponseType | null,
  })

  type SetStateCallback<T> = Dispatch<SetStateAction<T>>
}