import { LANGUAGES } from 'common/constants';
import { USER_TYPE, USER_STATUS } from 'features/account/contants';
import { GENDER } from 'features/iser/profile/constants';
import { ActionCreator } from "@reduxjs/toolkit";
import { AjaxError } from "rxjs/ajax";

// ----------------------------------------------------------------------

export type ActionFromCreator<C extends ActionCreator<unknown>> = ReturnType<C>;

export type CaseReducerRecord = Record<string, ActionCreator<unknown>>;

export type ActionFromCaseReducerActions<R extends CaseReducerRecord> =
  ActionFromCreator<R[keyof R]>;

export interface RequestError {
  error: AjaxError
}

export const userInitialState = {
    emailAddress: '',
    userType: USER_TYPE.user,
    userStatus: USER_STATUS.active
}

export const profileInitialState = {
    firstName: "",
    lastName: "",
    gender: GENDER.other,
    birthDate: new Date('01/01/1990'),
    location: "",
    language: LANGUAGES["en-GB"].value,
    role: ""
}
