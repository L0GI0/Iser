import styled from "styled-components";
import { Divider, Typography, Box, ButtonProps } from "@mui/material";
import RoundButton from "common/components/RoundButton";
import { useTranslation } from 'react-i18next'

// ----------------------------------------------------------------------

export const FormSectionContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 0em 7em;
  height: 100%;
`;

export const InfoSectionContent = styled.div`
  display: flex;
  margin: 0 2em;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  height: 400px;
  @media (max-width: 600px) {
    flex-direction: column;
    margin: 0;
    text-align: center;
  }
`;

export const GreyRedirectLink = styled(Typography).attrs({
})`
  && {
    color: grey;
    font-weight: bold;
    margin: 0 1em;
  }
  text-decoration: underline;
  transition-property: color text-shadow;
  transition-duration: .2s;
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.palette.primary.main};
    text-shadow: 0px 0px 1px rgba(92, 58, 252, 0.5);
  }
`
export const ResponsiveContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media (max-width: 600px) {
    flex-direction: column;
    margin: 0;
    && .MuiButton-round {
      width: 100%;
    }
  }
`;

interface LineDividerProps {
  text: string
}

export const LineDivider = ({ text }: LineDividerProps) => { 
  return (
    <Divider sx={{ my: 5, width: '100%', alignItems: 'center', height: 0 }}>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        { text }
      </Typography>
    </Divider>)
}

export const SignInWithGoogleButton = (props: ButtonProps) => {
  const { t } = useTranslation('account');

  return (
    <RoundButton
      {...props }
      text={t('sign_in.form.button_sign_in_with_google')}
      style={{ width: "100%" }}
      color="primary"
      postfixIcon={<Box component="img" alt={"google-icon"} src={"/static/icons/ic_google.svg"} sx={{ width: 32 }} />}
      />)
}