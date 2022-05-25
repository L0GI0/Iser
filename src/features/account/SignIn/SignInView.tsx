import React, { useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";

import { logIn } from "../store/accountSlice";
import TwoSectionsLayout from "common/components/TwoSectionsLayout";
import {
  WhiteSection,
  NavyBlueBubbledSectionRight
} from "common/components/styledElements";
import CredentialsFromInput, {
  CredentialsFormRef,
} from "../components/CredentialsFormInput";
import { AccountForm, GreyRedirectLink, LineDivider } from "../components/styledElements";
import RoundButton from "common/components/RoundButton";
import CheckboxInput from "common/components/CheckboxInput";
import InfoContent from "../components/InfoContent";
import { RootState } from "rootStore/rootReducer";
import { useStateChangeNotifier, getSignInStateSnackbarMap } from 'features/notifiers/useStateChangeNotifiers'
import LoadingBackdrop from "common/components/backdrops/LoadingBackdrop";
import { triggerNotification } from "features/notifiers/store/notifiersSlice";
import { useTranslation } from 'react-i18next'

// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------

const SignInForm: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['account', 'notifiers']);

  const inputFormRef = useRef<CredentialsFormRef>(null);
  const { requestStatus: { signIn: signInStatus }, isLoggingIn } = useSelector(
    (state: RootState) => state.accountReducer
  );

  useStateChangeNotifier(signInStatus, getSignInStateSnackbarMap(dispatch, t));

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
      <AccountForm>
        <LoadingBackdrop open={isLoggingIn}>
          <CredentialsFromInput labelText={t('sign_in.form.label_sign_in')} ref={inputFormRef} />
        </LoadingBackdrop>
        <RememberMeContainer>
          <CheckboxInput promptText={t('sign_in.form.checkbox_remember_me')} />
          <RoundButton text={t('sign_in.form.button_sign_in')} color="primary" onClick={logInUser} />
        </RememberMeContainer>
      </AccountForm>
  );
};

// ----------------------------------------------------------------------

const SignInLeftSection: React.FC = () => {

  const { t } = useTranslation('account');

  return (
    <WhiteSection>
      <SignInForm />
      <LineDivider text={t('separator_text')} />
      <RoundButton
        text={t('sign_in.form.button_sign_in_with_google')}
        style={{ width: "100%" }}
        color="primary"
      />
      <ForgotPasswordTip>
      {t('sign_in.form.text_forgot_password')}
        <GreyRedirectLink> {t('sign_in.form.link_reset_password')}</GreyRedirectLink>
      </ForgotPasswordTip>
    </WhiteSection>
  );
};

// ----------------------------------------------------------------------

const SignInRightSection: React.FC = () => {
  const navigate = useNavigate();

  const { t } = useTranslation('account');

  const redirectToSignUpView = () => {
    navigate("/app/signup");
  };

  return (
    <NavyBlueBubbledSectionRight>
      <InfoContent
        header={t('sign_in.section_info.header_welcome_to_iser')}
        description={t('sign_in.section_info.text_description')}
        footer={
          <React.Fragment>
            <Typography variant="body2" component="span">
            { t('sign_in.section_info.info_footer.text_first_visit') }
            </Typography>
            <RoundButton
              text={t('sign_in.section_info.info_footer.button_sign_up')}
              style={{ marginLeft: "2em" }}
              color="secondary"
              onClick={redirectToSignUpView}
            />
          </React.Fragment>
        }
      />
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
