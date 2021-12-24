import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { CircularProgress } from '@material-ui/core'

import TwoSectionsLayout from "common/components/TwoSectionsLayout";
import { LineSeparator } from "common/components/styledElements";
import {
  WhiteSection,
  NavyBlueBubbledSection,
} from "common/components/styledElements";
import CredentialsFromInput from "../components/CredentialsFormInput";
import { AccountForm } from "../components/styledElements";
import RoundButton from "common/components/RoundButton";
import CheckboxInput from "common/components/CheckboxInput";
import InfoContent from "../components/InfoContent";
import { CredentialsFormRef } from "../components/CredentialsFormInput";
import { signUp } from '../store/accountSlice'

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

  const inputFormRef = useRef<CredentialsFormRef>(null);
  const isFetching = useState<boolean>(false);
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

  return (
    <AccountForm onSubmit={() => console.log("test")}>
      <CredentialsFromInput labelText="Rejestracja" ref={inputFormRef} />
      <RoundButton
        text="Załóż darmowe konto"
        style={{ width: "100%", marginTop: "3em" }}
        color="primary"
        onClick={signUpUser}
      />
    </AccountForm>
  );
};

const SignUpRightSection: React.FC = () => {
  return (
    <WhiteSection>
      <SignUpForm />
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
