import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Subject } from "rxjs";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";

import RoundInput from "common/components/inputs/IserRoundTextInput";
import useObservable, { createDebounceObservable } from "common/utils/useObservable";
import { useFormValidator } from "common/utils/useFormValidator";

import { ReactComponent as PasswordIcon } from "common/images/pswd_icon.svg";
import { ReactComponent as MailIcon } from "common/images/mail_icon.svg";
import FormInput from 'common/components/inputs/FormInput';
import Label from 'common/components/Label';
import { useTranslation } from 'react-i18next'

// ----------------------------------------------------------------------

type InputState = {
  value: string,
  error: string
}

const adminInputState: InputState = {
  value: "testEmail@gmail.com",
  error: "",
};

const userInputState: InputState = {
  value: "testEmailUser@gmail.com",
  error: "",
}


export interface CredentialsFormRef {
  inputs: { [key: string]: InputState },
  validateForm: () => boolean;
}

interface CredentialsFormProps {
  disableAutofocus?: boolean;
  viewPredefinedAccounts?: boolean;
}

const validateEmailInput = new Subject();
const validatePasswordInput = new Subject();

const CredentialsFormInput = forwardRef(
  (
    { disableAutofocus = false,
      viewPredefinedAccounts = false
    }: CredentialsFormProps,
    inputValuesRef: React.Ref<CredentialsFormRef>
  ) => {
    const [emailInput, setEmailInput] = useState<InputState>({
      ...adminInputState,
    });

    const [passwordInput, setPasswordInput] = useState<InputState>({
      ...adminInputState,
    });

    const emailInputField = useRef<HTMLInputElement>(null);
    const passwordInputField = useRef<HTMLInputElement>(null);

    const { t } = useTranslation(['common', 'account']);

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

    const setPredefinedAdminAccount = () => {
      setEmailInput(adminInputState);
      setPasswordInput(adminInputState);
    }

    const setPredefinedUserAccount = () => {
      setEmailInput(userInputState);
      setPasswordInput(userInputState);
    }

    const clearCredentialsInput = () => {
      setEmailInput({value: "", error: ""});
      setPasswordInput({value: "", error: ""});
    }

    return (
      <React.Fragment>
        { viewPredefinedAccounts &&
          (<FormInput label={t('account:sign_in.form.label_select_account')}>
            <RadioGroup row defaultValue="admin">
              <FormControlLabel
              value="admin"
              control={
                <Radio
                onClick={setPredefinedAdminAccount}
                color="warning"
                  sx={{
                    color: 'warning.main',
                    '&.Mui-checked': {
                      color: 'warning.main',
                    }}}
                  />}
                label={<Label color="warning" skinVariant="outlined">Admin</Label>} />
              <FormControlLabel
                value="user"
                control={<Radio
                  onClick={setPredefinedUserAccount}
                  color="info" 
                  sx={{
                    color: 'info.main',
                    '&.Mui-checked': {
                      color: 'info.main',
                    }}}
                />} 
                label={<Label color="info" skinVariant="outlined">User</Label>} />
              <FormControlLabel
                value="other"
                control={<Radio onClick={clearCredentialsInput}
                  sx={{
                    color: 'primary.main',
                    '&.Mui-checked': {
                      color: 'primary.main',
                    }}}/>}
                label={<Label skinVariant="outlined">Other</Label>} />
                
            </RadioGroup>
          </FormInput>)}
        <RoundInput
          value={emailInput.value}
          errorMessage={emailInput.error}
          placeholder={t('forms.fields.email.input_placeholder')}
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
          placeholder={t('forms.fields.password.input_placeholder')}
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
