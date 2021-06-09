import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

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
  variant: "subtitle2",
})`
  && {
    color: grey;
    font-weight: bold;
    margin: 0 1em;
  }
  text-decoration: underline;
  transition: all 0.3s;
  &:hover {
    cursor: pointer;
    color: rgba(85, 52, 235, 255);
    text-shadow: 0px 0px 1px rgba(92, 58, 252, 0.5);
  }
`;
