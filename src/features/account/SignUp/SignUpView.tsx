import React, { useRef, useMemo, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Container } from "@mui/material";
import TwoSectionsLayout from "common/components/TwoSectionsLayout";
import {
  WhiteSection,
  NavyBlueBubbledSectionLeft,
} from "common/components/styledElements";
import RoundButton from "common/components/RoundButton";
import CheckboxInput from "common/components/inputs/CheckboxInput";
import LoadingBackdrop from "common/components/backdrops/LoadingBackdrop";
import ResultBackdrop from "common/components/backdrops/ResultBackdrop";
import { RootState } from "rootStore/rootReducer";
import { RESULT_VARIANTS, ResultVariant } from "common/components/backdrops/ResultBackdrop";
import { signUp, clearSignUpStatus } from '../store/accountSlice'
import { REQUEST_STATUS, RequestStatus } from "../store/accountSlice";
import { useStateChangeNotifier, getSignUpStateToSnackbarMap } from 'features/notifiers/useStateChangeNotifiers'
import { triggerNotification } from 'features/notifiers/store/notifiersSlice'
import { ReactiveContainer as SignUpFormContainer } from 'common/components/styledElements'
import { useTranslation } from "react-i18next"
import { TFunction } from "react-i18next";
import InfoContent from "../components/InfoContent";
import { LineDivider, ResponsiveContainer, SignInWithGoogleButton } from "../components/styledElements";
import CredentialsFromInput, { CredentialsFormRef } from "../components/CredentialsFormInput";


// ----------------------------------------------------------------------

const RegistrationTerms = styled(Typography).attrs({
  variant: "body1",
})`
  && {
    margin-top: 2.5em;
    color: grey;
    font-weight: bold;
  }
`;

// ----------------------------------------------------------------------

type SignUpResult = {
  variant: ResultVariant,
  message: string
}

const getSignUpResult = (status: RequestStatus, t: TFunction<["account", "notifiers"]>): SignUpResult => {
  if(status === REQUEST_STATUS.success)
    return { variant: RESULT_VARIANTS.success, message: t("sign_up.notifications.sign_up_completed")}

  return { variant: RESULT_VARIANTS.error, message: t('sign_up.notifications.sign_up_failure')}
}

const SignUpForm: React.FC = () => {

  const { requestStatus: { signUp: signUpStatus }, isFetching } = useSelector((state: RootState) => state.accountReducer)

  const { t } = useTranslation(['account', 'notifiers'])

  const inputFormRef = useRef<CredentialsFormRef>(null);
  
  const dispatch = useDispatch();
  useStateChangeNotifier(signUpStatus, getSignUpStateToSnackbarMap(dispatch, t));

  const signUpResult: SignUpResult = useMemo(() => {
    if(signUpStatus)
      return getSignUpResult(signUpStatus, t)
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
      <SignUpFormContainer>
      <Typography variant="h3">{t('sign_up.form.label_sign_up')}</Typography>
        <LoadingBackdrop open={isFetching}>
          <ResultBackdrop
            open={!!signUpStatus}
            variant={signUpResult.variant}
            resultText={signUpResult.message}
            descriptionText={t("sign_up.result.sign_up_failure_description")}
            onClose={() => dispatch(clearSignUpStatus())}>
             <CredentialsFromInput disableAutofocus={!!signUpStatus} ref={inputFormRef} />
            <RoundButton
              text={t('sign_up.form.button_sign_up')}
              style={{ width: "100%" }}
              color="primary"
              onClick={signUpUser}/>
          </ResultBackdrop>
        </LoadingBackdrop>
      </SignUpFormContainer>

  );
};

// ----------------------------------------------------------------------

const SignUpRightSection: React.FC = () => {

  const { t } = useTranslation('account')

  return (
    <WhiteSection>
      <Container maxWidth="sm">
        <SignUpForm/>
        <LineDivider text={t('separator_text')}/>
        <SignInWithGoogleButton sx={{ marginBottom: '2em' }}/>
        <CheckboxInput
          promptText={
            t("sign_up.form.checkbox_newsletter_agreement")
          }
        />
        <RegistrationTerms>
          {t('sign_up.form.text_registration_terms')}
        </RegistrationTerms>
      </Container>
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
      <Container maxWidth="sm">
        <InfoContent
          header={t('sign_up.section_info.header_welcome_to_iser')}
          description={t("sign_up.section_info.text_description")}
          footer={
            <ResponsiveContainer>
              {t('sign_up.section_info.info_footer.text_already_signed_up')}
              <RoundButton
                onClick={redirectToSignInView}
                text={t('sign_up.section_info.info_footer.button_sign_in')}
                color="secondary"
              />
            </ResponsiveContainer>
          }
        />
      </Container>
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
