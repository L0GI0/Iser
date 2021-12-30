import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";

import { logIn } from "../store/accountSlice";
import TwoSectionsLayout from "common/components/TwoSectionsLayout";
import {
  WhiteSection,
  NavyBlueBubbledSection,
  LineSeparator,
} from "common/components/styledElements";
import CredentialsFromInput, {
  CredentialsFormRef,
} from "../components/CredentialsFormInput";
import { AccountForm, GreyRedirectLink } from "../components/styledElements";
import RoundButton from "common/components/RoundButton";
import CheckboxInput from "common/components/CheckboxInput";
import InfoContent from "../components/InfoContent";
import { RootState } from "rootStore/rootReducer";

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

const SignInForm: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const inputFormRef = useRef<CredentialsFormRef>(null);
  const accessToken = useSelector(
    (state: RootState) => state.accountReducer.accessToken
  );

  const redirectToDashboard = () => {
    history.push("/dashboard");
  };

  useEffect(() => {
    console.log(`Current access token = ${accessToken}`);
  }, []);

  const logInUser = () => {
    if (inputFormRef.current?.validateForm()) {
      dispatch(
        inputFormRef.current &&
          logIn({
            accountLogin: inputFormRef.current.inputs.emailInput.value,
            accountPassword: inputFormRef.current.inputs.passwordInput.value,
          })
      );
      redirectToDashboard();
    }
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
