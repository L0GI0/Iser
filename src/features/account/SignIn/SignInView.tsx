import React, { useRef } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logIn } from "../store/accountSlice";

import TwoSectionsLayout from "../../../common/components/TwoSectionsLayout";
import {
  WhiteSection,
  NavyBlueBubbledSection,
  LineSeparator,
} from "../../../common/components/styledElements";
import CredentialsFromInput, {
  CredentialsFormRef,
  InputRef,
} from "../components/CredentialsFormInput";
import { AccountForm, GreyRedirectLink } from "../components/styledElements";
import RoundButton from "../../../common/components/RoundButton";
import CheckboxInput from "../../../common/components/CheckboxInput";
import InfoContent from "../components/InfoContent";
import Typography from "@material-ui/core/Typography";
import { InputProps } from "@material-ui/core";

const RememberMeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ForgotPasswordTip = styled(Typography).attrs({
  variant: "subtitle2",
})`
  && {
    margin-top: 5em;
  }
  display: inline-flex;
  text-align: start;
  color: grey;
  width: 100%;
`;

interface IterableInputForm {
  [s: string]: InputRef;
}

const SignInForm: React.FC = () => {
  const dispatch = useDispatch();
  const inputFormRef = useRef<CredentialsFormRef>(null);

  const validateForm = (): boolean => {
    if (inputFormRef.current) {
      const foundError: keyof typeof inputFormRef.current | undefined =
        Object.keys(inputFormRef.current).find((inputName) => {
          if (
            inputFormRef.current &&
            (inputFormRef.current[inputName].input.error.length > 0 ||
              inputFormRef.current[inputName].input.value.length === 0)
          )
            return inputName;
        });

      if (foundError) {
        inputFormRef.current[foundError].focus();
        return false;
      }
    }

    return true;
  };

  const logInUser = () => {
    if (validateForm())
      dispatch(
        inputFormRef.current &&
          logIn({
            accountLogin: inputFormRef.current.emailInput.input.value,
            accountPassword: inputFormRef.current.passwordInput.input.value,
          })
      );
  };

  return (
    <AccountForm onSubmit={() => console.log("test")}>
      <CredentialsFromInput labelText="Logowanie" ref={inputFormRef} />
      <RememberMeContainer>
        <CheckboxInput promptText={"Zapamiętaj mnie na tym komputerze"} />
        <RoundButton text="Zaloguj sie" color="primary" onClick={logInUser} />
      </RememberMeContainer>
    </AccountForm>
  );
};

const SignInLeftSection: React.FC = () => {
  return (
    <WhiteSection>
      <SignInForm />
      <LineSeparator>LUB</LineSeparator>
      <RoundButton
        text="Zaloguj sie z kontem Google"
        style={{ width: "100%" }}
        color="primary"
      />
      <ForgotPasswordTip>
        {"Zapomniałeś hasła?"}
        <GreyRedirectLink> {"Zresetuj hasło"}</GreyRedirectLink>
      </ForgotPasswordTip>
    </WhiteSection>
  );
};

const SignInRightSection: React.FC = () => {
  const history = useHistory();

  const redirectToSignUpView = () => {
    history.push("/signup");
  };

  return (
    <NavyBlueBubbledSection>
      <InfoContent
        header="Witaj w LanguaGeiser - platformie do konfigurowalnej nauki!"
        description="Wprowadź swoje dane żeby zalogować się do panelu"
        footer={
          <React.Fragment>
            <Typography variant="body2" component="span">
              Nie masz jeszcze konta ?
            </Typography>
            <RoundButton
              text="Zarejestruj się"
              style={{ marginLeft: "2em" }}
              color="secondary"
              onClick={redirectToSignUpView}
            />
          </React.Fragment>
        }
      />
    </NavyBlueBubbledSection>
  );
};

const SignInView: React.FC = () => {
  return (
    <TwoSectionsLayout
      leftSection={<SignInLeftSection />}
      rightSection={<SignInRightSection />}
    />
  );
};

export default SignInView;
