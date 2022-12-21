import React, { useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Container, Box } from "@mui/material";
import { useTranslation } from 'react-i18next'
import TwoSectionsLayout from "common/components/layouts/TwoSectionsLayout";
import {
  WhiteSection,
  NavyBlueBubbledSectionRight,
  ReactiveContainer as SignInFormContainer
} from "common/components/styledElements";
import RoundButton from "common/components/RoundButton";
import CheckboxInput from "common/components/inputs/CheckboxInput";
import { RootState } from "rootStore/rootReducer";
import { useStateChangeNotifier, getSignInStateSnackbarMap } from 'features/notifiers/useStateChangeNotifiers'
import LoadingBackdrop from "common/components/backdrops/LoadingBackdrop";
import CredentialsFromInput, {
  CredentialsFormRef,
} from "../components/CredentialsFormInput";
import InfoContent from "../components/InfoContent";
import { triggerNotification } from "features/notifiers/store/notifiersSlice";
import { GreyRedirectLink, LineDivider, ResponsiveContainer, SignInWithGoogleButton } from "../components/styledElements";
import { logIn } from "../store/accountSlice";

// ----------------------------------------------------------------------

interface TypographyType {
  value: string
}

const ForgotPasswordTip = styled(Typography).attrs<TypographyType>(({
  value
}) => ({value: value, variant: 'subtitle1'}))`
  && {
    margin-top: 2.5em;
  }
  display: inline-flex;
  align-items: center;
  color: grey;
  width: 100%;
`;

// ----------------------------------------------------------------------

const SignInForm: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['account', 'notifiers']);

  const inputFormRef = useRef<CredentialsFormRef>(null);
  const { accountReactiveState: { logIn: logInState} } = useSelector(
    (state: RootState) => state.accountReducer
  );

  useStateChangeNotifier(logInState.reqStatus, getSignInStateSnackbarMap(dispatch, t));

  const logInUser = () => {
    if (inputFormRef.current?.validateForm()) {
      dispatch(triggerNotification());
      dispatch(
        inputFormRef.current &&
          logIn({
            accountLogin: inputFormRef.current.inputs.emailInput.value,
            accountPassword: inputFormRef.current.inputs.passwordInput.value,
          })
      );
    }
  };

  return (
      <SignInFormContainer>
      <Typography variant="h3">{t('sign_in.form.label_sign_in')}</Typography>
        <LoadingBackdrop open={logInState.isRequesting}>
          <CredentialsFromInput ref={inputFormRef} />
        </LoadingBackdrop>
        <ResponsiveContainer>
          <CheckboxInput promptText={t('sign_in.form.checkbox_remember_me')} />
          <RoundButton text={t('sign_in.form.button_sign_in')} color="primary" onClick={logInUser} />
        </ResponsiveContainer>
      </SignInFormContainer>
  );
};

// ----------------------------------------------------------------------

const SignInLeftSection: React.FC = () => {

  const { t } = useTranslation('account');

  return (
    <WhiteSection>
      <Container maxWidth="sm">
        <SignInForm />
        <LineDivider text={t('separator_text')} />
        <SignInWithGoogleButton/>
        <ForgotPasswordTip>
        {t('sign_in.form.text_forgot_password')}
          <GreyRedirectLink> {t('sign_in.form.link_reset_password')}</GreyRedirectLink>
        </ForgotPasswordTip>
      </Container>
    </WhiteSection>
  );
};

// ----------------------------------------------------------------------

const SignInRightSection: React.FC = () => {
  const navigate = useNavigate();

  const { t } = useTranslation('account');

  const redirectToSignUpView = () => {
    navigate('/app/signup');
  };

  return (
    <NavyBlueBubbledSectionRight>
      <Container maxWidth="sm">
        <InfoContent
          header={t('sign_in.section_info.header_welcome_to_iser')}
          description={t('sign_in.section_info.text_description')}
          footer={
            <ResponsiveContainer>
              <Typography variant="body2" component="span">
              { t('sign_in.section_info.info_footer.text_first_visit') }
              </Typography>
              <RoundButton
                onClick={redirectToSignUpView}
                text={t('sign_in.section_info.info_footer.button_sign_up')}
                color="secondary"
              />
            </ResponsiveContainer>
          }
        />
      </Container>
    </NavyBlueBubbledSectionRight>
  );
};

// ----------------------------------------------------------------------

const SignInView: React.FC = () => {
  return (
    <TwoSectionsLayout
      leftSection={<SignInLeftSection />}
      rightSection={<SignInRightSection />}
    />
  );
};

export default SignInView;
