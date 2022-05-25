import styled from "styled-components";
import { Divider, Typography } from "@mui/material";

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
  text-align: start;
  justify-content: space-between;
  align-items: flex-start;
  width: 650px;
  flex-direction: column;
  height: 400px;
`;

export const AccountForm = styled.form`
  position: relative;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
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