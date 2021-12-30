import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { VariantType, useSnackbar } from 'notistack';

import TwoSectionsLayout from "common/components/TwoSectionsLayout";
import { LineSeparator } from "common/components/styledElements";

import {
WhiteSection,
  NavyBlueBubbledSection,
} from "common/components/styledElements";
import { AccountForm } from "../components/styledElements";
import RoundButton from "common/components/RoundButton";
import CheckboxInput from "common/components/CheckboxInput";
import InfoContent from "../components/InfoContent";
import LoadingBackdrop from "common/components/backdrops/LoadingBackdrop";
import ResultBackdrop from "common/components/backdrops/ResultBackdrop";

import CredentialsFromInput, { CredentialsFormRef } from "../components/CredentialsFormInput";
import { signUp, clearRequestStatus } from '../store/accountSlice'
import { RootState } from "rootStore/rootReducer";


const RegistrationTerms = styled(Typography).attrs({
  variant: "body1",
  component: "span",
})`
  && {
    margin-top: 4em;
    color: grey;
    font-weight: bold;
  }
`;

const SignUpForm: React.FC = () => {

  const { enqueueSnackbar } = useSnackbar();

  const isFetching = useSelector(
    (state: RootState) => state.accountReducer.isFetching
  );

  const signUpStatus = useSelector(
    (state: RootState) => state.accountReducer.requestStatus
  );

  const inputFormRef = useRef<CredentialsFormRef>(null);
  const dispatch = useDispatch();
  
  const signUpUser = (): void => {
    if (inputFormRef.current?.validateForm()) {
      dispatch(
        inputFormRef.current &&
          signUp({
            accountLogin: inputFormRef.current.inputs.emailInput.value,
            accountPassword: inputFormRef.current.inputs.passwordInput.value,
          })
      );
    }
  };

  useEffect(() => {
    console.log(`Use EFFECT RUN`);
    if(signUpStatus){
      enqueueSnackbar('Test snackbar', { variant: 'info'})
      return
    }
  }, [signUpStatus, enqueueSnackbar])

  return (
      <AccountForm onSubmit={() => console.log("test")}>
        <LoadingBackdrop open={isFetching}>
          <ResultBackdrop open={!!signUpStatus} resultText='Registration complete' onClose={() => dispatch(clearRequestStatus())}>
            <CredentialsFromInput labelText="Rejestracja" disableAutofocus={!!signUpStatus} ref={inputFormRef} />
            <RoundButton
              text="Załóż darmowe konto"
              style={{ width: "100%", marginTop: "3em" }}
              color="primary"
              onClick={signUpUser}/>
          </ResultBackdrop>
        </LoadingBackdrop>
      </AccountForm>

  );
};

const SignUpRightSection: React.FC = () => {
  return (
    <WhiteSection>
      <SignUpForm/>
      <LineSeparator>LUB</LineSeparator>
      <RoundButton
        text="Zaloguj sie z kontem Google"
        color="primary"
        style={{ width: "100%", marginBottom: "3em" }}
      />
      <CheckboxInput
        promptText={
          "Zapisuje się do newslettera i chcę otrzymywać najnowsze treści"
        }
      />
      <RegistrationTerms>
        Rejestrując się potwierdzasz, że zapoznałeś się z regulaminem oraz
        akceptujesz jego warunki.
      </RegistrationTerms>
    </WhiteSection>
  );
};

const SignUpLeftSection: React.FC = () => {
  const history = useHistory();

  const redirectToSignInView = () => {
    history.push("/signin");
  };
  return (
    <NavyBlueBubbledSection>
      <InfoContent
        header="Zarejestruj się do wersji beta platformy i uzyskaj darmowy dostęp na zawsze"
        description="Uzupełnij formularz i założ darmowe konto."
        footer={
          <React.Fragment>
            Masz już konto?
            <RoundButton
              onClick={redirectToSignInView}
              text="Zaloguj się"
              backgroundHover="rgba(85,52,235,255)"
              style={{ marginLeft: "2em" }}
              color="secondary"
            />
          </React.Fragment>
        }
      />
    </NavyBlueBubbledSection>
  );
};

const SignUpView: React.FC = () => {
  return (
    <TwoSectionsLayout
      leftSection={<SignUpLeftSection />}
      rightSection={<SignUpRightSection />}
    />
  );
};

export default SignUpView;
