import React, { useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { VariantType, useSnackbar } from 'notistack';

import TwoSectionsLayout from "common/components/TwoSectionsLayout";
import { LineSeparator } from "common/components/styledElements";

import {
WhiteSection,
  NavyBlueBubbledSectionLeft,
} from "common/components/styledElements";
import RoundButton from "common/components/RoundButton";
import CheckboxInput from "common/components/CheckboxInput";
import LoadingBackdrop from "common/components/backdrops/LoadingBackdrop";
import ResultBackdrop from "common/components/backdrops/ResultBackdrop";
import { RootState } from "rootStore/rootReducer";
import { RESULT_VARIANTS, ResultVariant } from "common/components/backdrops/ResultBackdrop";

import { AccountForm } from "../components/styledElements";
import InfoContent from "../components/InfoContent";
import CredentialsFromInput, { CredentialsFormRef } from "../components/CredentialsFormInput";
import { signUp, clearSignUpStatus } from '../store/accountSlice'
import { REQUEST_STATUS, RequestStatus } from "../store/accountSlice";
import { useStateChangeNotifier, getSignUpStateToSnackbarMap } from 'features/notifiers/useStateChangeNotifiers'
import { triggerNotification } from 'features/notifiers/store/notifiersSlice'


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

type SignUpResult = {
  variant: ResultVariant,
  message: string
}

const getSignUpResult = (status: RequestStatus): SignUpResult => {
  if(status === REQUEST_STATUS.success)
    return { variant: RESULT_VARIANTS.success, message: 'Registration complete'}

  return { variant: RESULT_VARIANTS.error, message: 'Registration failed'}
}

const SignUpForm: React.FC = () => {

  const { requestStatus: { signUp: signUpStatus }, isFetching } = useSelector((state: RootState) => state.accountReducer)

  const inputFormRef = useRef<CredentialsFormRef>(null);
  const dispatch = useDispatch();
  useStateChangeNotifier(signUpStatus, getSignUpStateToSnackbarMap(dispatch));

  const signUpResult: SignUpResult = useMemo(() => {
    if(signUpStatus)
      return getSignUpResult(signUpStatus)
    return { variant: RESULT_VARIANTS.error, message: 'Internal Application Error' }
  }, [signUpStatus])

  const signUpUser = (): void => {
    if (inputFormRef.current?.validateForm()) {
      dispatch(triggerNotification());
      dispatch(
        inputFormRef.current &&
          signUp({
            accountLogin: inputFormRef.current.inputs.emailInput.value,
            accountPassword: inputFormRef.current.inputs.passwordInput.value,
            accountType: 'user'
          })
      );
    }
  };
  
  return (
      <AccountForm onSubmit={() => console.log("test")}>
        <LoadingBackdrop open={isFetching}>
          <ResultBackdrop open={!!signUpStatus} variant={signUpResult.variant} resultText={signUpResult.message} onClose={() => dispatch(clearSignUpStatus())}>
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
  const navigate = useNavigate();

  const redirectToSignInView = () => {
    navigate("/app/signin");
  };
  return (
    <NavyBlueBubbledSectionLeft>
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
    </NavyBlueBubbledSectionLeft>
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
