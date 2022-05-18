import React, { useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

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
import { useTranslation } from "react-i18next"

// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------

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

  const { t } = useTranslation(['account', 'notifiers'])

  const inputFormRef = useRef<CredentialsFormRef>(null);
  const dispatch = useDispatch();
  useStateChangeNotifier(signUpStatus, getSignUpStateToSnackbarMap(dispatch, t));

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
      <AccountForm>
        <LoadingBackdrop open={isFetching}>
          <ResultBackdrop open={!!signUpStatus} variant={signUpResult.variant} resultText={signUpResult.message} onClose={() => dispatch(clearSignUpStatus())}>
             <CredentialsFromInput labelText={t('sign_up.form.label_sign_up')} disableAutofocus={!!signUpStatus} ref={inputFormRef} />
            <RoundButton
              text={t('sign_up.form.button_sign_up')}
              style={{ width: "100%", marginTop: "3em" }}
              color="primary"
              onClick={signUpUser}/>
          </ResultBackdrop>
        </LoadingBackdrop>
      </AccountForm>

  );
};

// ----------------------------------------------------------------------

const SignUpRightSection: React.FC = () => {

  const { t } = useTranslation('account')

  return (
    <WhiteSection>
      <SignUpForm/>
      <LineSeparator>{t('separator-text')}</LineSeparator>
      <RoundButton
        text={t('sign_up.form.button_sign_in_with_google')}
        color="primary"
        style={{ width: "100%", marginBottom: "3em" }}
      />
      <CheckboxInput
        promptText={
          t("sign_up.form.checkbox_newsletter_agreement")
        }
      />
      <RegistrationTerms>
        {t('sign_up.form.text_registration_terms')}
      </RegistrationTerms>
    </WhiteSection>
  );
};

// ----------------------------------------------------------------------

const SignUpLeftSection: React.FC = () => {
  const navigate = useNavigate();

  const redirectToSignInView = () => {
    navigate("/app/signin");
  };

  const { t } = useTranslation('account')

  return (
    <NavyBlueBubbledSectionLeft>
      <InfoContent
        header={t('sign_up.section_info.info_content.header_welcome_to_iser')}
        description={t("sign_up.section_info.info_content.text_description")}
        footer={
          <React.Fragment>
            {t('sign_up.section_info.info_content.info_footer.text_already_signed_up')}
            <RoundButton
              onClick={redirectToSignInView}
              text={t('sign_up.section_info.info_content.info_footer.button_sign_in')}
              style={{ marginLeft: "2em" }}
              color="secondary"
            />
          </React.Fragment>
        }
      />
    </NavyBlueBubbledSectionLeft>
  );
};

// ----------------------------------------------------------------------

const SignUpView: React.FC = () => {
  return ( 
    <TwoSectionsLayout
      leftSection={<SignUpLeftSection />}
      rightSection={<SignUpRightSection />}
    />
  );
};

export default SignUpView;
