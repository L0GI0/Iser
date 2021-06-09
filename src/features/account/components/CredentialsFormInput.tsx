import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import styled from "styled-components";
import { Observable, Subject, from } from "rxjs";
import {
  map,
  filter,
  mergeMap,
  debounceTime,
  distinctUntilChanged,
} from "rxjs/operators";

import RoundInput from "../../../common/components/RoundInput";
import {
  useFormValidator,
  fieldsNames,
} from "../../../common/utils/useFormValidator";

import { ReactComponent as PasswordIcon } from "../../../common/images/pswd-icon.svg";
import { ReactComponent as MailIcon } from "../../../common/images/mail-icon.svg";

const FormLabel = styled.h1`
  font-size: 30px;
  text-align: start;
  width: 100%;
  margin-bottom: 2em;
`;

const useObservable = (
  observable: Observable<any>,
  setter: React.Dispatch<React.SetStateAction<any>>
) => {
  useEffect(() => {
    let subscription = observable.subscribe((result) => {
      setter(result);
    });

    return () => subscription.unsubscribe();
  }, [observable, setter]);
};

export interface CredentialsFormRef {
  emailInputValue: string;
  passwordInputValue: string;
}

interface CredentialsFormProps {
  labelText: string;
}

type fieldsErrors = { [key in fieldsNames]: string };

const formFieldInput = new Subject();

const createDebounceObservable = (callbackFunction: any) => {
  console.log(`Running observable`);
  return formFieldInput.pipe(
    debounceTime(750),
    map((value) => callbackFunction(value))
  );
};

// const validateFormObservable = formFieldInput.pipe(
//   debounceTime(750),
//   distinctUntilChanged(),
//   (inputValue) => from("test")
// );

const CredentialsFormInput = forwardRef(
  (
    { labelText }: CredentialsFormProps,
    inputValuesRef: React.Ref<CredentialsFormRef>
  ) => {
    const [emailInputValue, setEmailInputValue] = useState<string>("");
    const [passwordInputValue, setPasswordInputValue] = useState<string>("");
    const [inputFieldsErrors, setInputFieldsErrors] = useState<fieldsErrors>({
      email: "",
      password: "",
    });

    const { validateEmail } = useFormValidator();

    useObservable(
      createDebounceObservable(validateEmail),
      setInputFieldsErrors
    );

    const handleEmailInputValueChange = (newValue: string) => {
      setEmailInputValue(newValue);
      formFieldInput.next(newValue);
    };

    const handlePasswordInputValueChange = (newValue: string) => {
      setPasswordInputValue(newValue);
      formFieldInput.next(newValue);
    };

    useEffect(() => {
      console.log(`Input fields errors = ${inputFieldsErrors}`);
    }, [inputFieldsErrors]);

    useImperativeHandle(
      inputValuesRef,
      (): CredentialsFormRef => ({
        emailInputValue,
        passwordInputValue,
      })
    );

    useEffect(() => {
      console.log(
        `Email = ${emailInputValue} | Password = ${passwordInputValue}`
      );
    }, [emailInputValue, passwordInputValue]);

    return (
      <React.Fragment>
        {labelText ? <FormLabel>{labelText}</FormLabel> : ""}
        <RoundInput
          errorMessage={inputFieldsErrors.email}
          placeholder="Adres e-mail"
          type="text"
          postfixIcon={<MailIcon />}
          value={emailInputValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            console.log("Handling input change");
            handleEmailInputValueChange(event.target.value);
          }}
        />
        <RoundInput
          placeholder="Hasło"
          type="password"
          postfixIcon={<PasswordIcon />}
          value={passwordInputValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            console.log("Handling input change");
            handlePasswordInputValueChange(event.target.value);
          }}
        />
      </React.Fragment>
    );
  }
);

export default CredentialsFormInput;
