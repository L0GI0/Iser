import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import styled from "styled-components";
import { Subject, Observable } from "rxjs";
import { map, debounceTime, distinctUntilChanged } from "rxjs/operators";

import RoundInput from "common/components/RoundInput";
import { useFormValidator } from "common/utils/useFormValidator";

import { ReactComponent as PasswordIcon } from "common/images/pswd-icon.svg";
import { ReactComponent as MailIcon } from "common/images/mail-icon.svg";

// ----------------------------------------------------------------------


const FormLabel = styled.h1`
  font-size: 30px;
  text-align: start;
  width: 100%;
  margin-bottom: 2em;
`;

// ----------------------------------------------------------------------


const useObservable = (observable: Observable<any>, setter: any) => {
  useEffect(() => {
    let subscription = observable.subscribe((result: any) => {
      setter(result);
  });
    return () => subscription.unsubscribe();
  }, []);
};

const emptyInputState = {
  value: "testEmail@gmail.com",
  error: "",
};

type InputState = typeof emptyInputState;

export interface CredentialsFormRef {
  inputs: { [key: string]: InputState };
  validateForm: () => boolean;
}

interface CredentialsFormProps {
  labelText: string;
  disableAutofocus?: boolean;
}

const validateEmailInput = new Subject();
const validatePasswordInput = new Subject();

const createDebounceObservable = (observable: any, callbackFunction: any) => {
  return observable.pipe(
    debounceTime(750),
    distinctUntilChanged(),
    map((value) => callbackFunction(value))
  );
};

const CredentialsFormInput = forwardRef(
  (
    { labelText, disableAutofocus = false}: CredentialsFormProps,
    inputValuesRef: React.Ref<CredentialsFormRef>
  ) => {
    const [emailInput, setEmailInput] = useState<InputState>({
      ...emptyInputState,
    });

    const [passwordInput, setPasswordInput] = useState<InputState>({
      ...emptyInputState,
    });

    const emailInputField = useRef<HTMLInputElement>(null);
    const passwordInputField = useRef<HTMLInputElement>(null);

    useEffect(() => {
      !disableAutofocus && emailInputField?.current?.focus();
    }, [disableAutofocus]);

    const { validateEmail, validatePassword } = useFormValidator();

    useObservable(
      createDebounceObservable(validateEmailInput, validateEmail),
      (emailError: string) => {
        setEmailInput((prevEmailState: InputState) => {
          return { ...prevEmailState, error: emailError };
        });
      }
    );

    useObservable(
      createDebounceObservable(validatePasswordInput, validatePassword),
      (passwordError: string) => {
        setPasswordInput((prevPasswordState: InputState) => {
          return { ...prevPasswordState, error: passwordError };
        });
      }
    );

    const handleEmailInputValueChange = (newEmailValue: string) => {
      setEmailInput({ value: newEmailValue, error: "" });
      validateEmailInput.next(newEmailValue);
    };

    const handlePasswordInputValueChange = (newPasswordValue: string) => {
      setPasswordInput({ value: newPasswordValue, error: "" });
      validatePasswordInput.next(newPasswordValue);
    };

    const validateForm = (): boolean => {
      const formInputStates = [
        {
          input: emailInput,
          focus: () => {
            emailInputField.current?.focus();
          },
        },
        {
          input: passwordInput,
          focus: () => {
            passwordInputField.current?.focus();
          },
        },
      ];

      const foundInputError =
        formInputStates.find(
          (formInput) =>
            formInput.input.error.length > 0 ||
            formInput.input.value.length === 0
        ) || null;

      if (foundInputError) {
        foundInputError.focus();
        return false;
      }

      return true;
    };

    useImperativeHandle(
      inputValuesRef,
      (): CredentialsFormRef => ({
        inputs: {
          emailInput: emailInput,
          passwordInput: passwordInput,
        },
        validateForm,
      })
    );

    return (
      <React.Fragment>
        {labelText && <FormLabel>{labelText}</FormLabel>}
        <RoundInput
          value={emailInput.value}
          errorMessage={emailInput.error}
          placeholder="Adres e-mail"
          type="text"
          postfixIcon={<MailIcon />}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleEmailInputValueChange(event.target.value);
          }}
          inputRef={emailInputField}
        />
        <RoundInput
          value={passwordInput.value}
          errorMessage={passwordInput.error}
          placeholder="Hasło"
          type="password"
          postfixIcon={<PasswordIcon />}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handlePasswordInputValueChange(event.target.value);
          }}
          inputRef={passwordInputField}
        />
      </React.Fragment>
    );
  }
);

export default CredentialsFormInput;
