import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import styled from "styled-components";
import { Subject } from "rxjs";
import { map, debounceTime, distinctUntilChanged } from "rxjs/operators";

import RoundInput from "../../../common/components/RoundInput";
import { useFormValidator } from "../../../common/utils/useFormValidator";

import { ReactComponent as PasswordIcon } from "../../../common/images/pswd-icon.svg";
import { ReactComponent as MailIcon } from "../../../common/images/mail-icon.svg";

const FormLabel = styled.h1`
  font-size: 30px;
  text-align: start;
  width: 100%;
  margin-bottom: 2em;
`;

const useObservable = (observable: any, setter: any) => {
  useEffect(() => {
    let subscription = observable.subscribe((result: any) => {
      setter(result);
    });
    return () => subscription.unsubscribe();
  }, []);
};

export interface InputRef {
  input: InputState;
  focus: () => void;
}

export type CredentialsFormRef = Record<string, InputRef>;

interface CredentialsFormProps {
  labelText: string;
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

const emptyInputState = {
  value: "",
  error: "",
};

type InputState = typeof emptyInputState;

const CredentialsFormInput = forwardRef(
  (
    { labelText }: CredentialsFormProps,
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
      emailInputField?.current?.focus();
    }, []);

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
      setEmailInput((prevEmailState: InputState) => {
        return { ...prevEmailState, value: newEmailValue };
      });
      validateEmailInput.next(newEmailValue);
    };

    const handlePasswordInputValueChange = (newPasswordValue: string) => {
      setPasswordInput((prevPasswordState: InputState) => {
        return { ...prevPasswordState, value: newPasswordValue };
      });
      validatePasswordInput.next(newPasswordValue);
    };

    useImperativeHandle(
      inputValuesRef,
      (): CredentialsFormRef => ({
        emailInput: {
          input: emailInput,
          focus: () => {
            emailInputField?.current?.focus();
          },
        },
        passwordInput: {
          input: passwordInput,
          focus: () => {
            passwordInputField?.current?.focus();
          },
        },
      })
    );

    return (
      <React.Fragment>
        {labelText ? <FormLabel>{labelText}</FormLabel> : ""}
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
