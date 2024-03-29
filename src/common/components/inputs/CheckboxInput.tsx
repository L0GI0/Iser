import styled from "styled-components";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

// ----------------------------------------------------------------------

const CheckboxInputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const PromptText = styled(Typography).attrs({
  variant: "body2",
  component: "span",
})`
  && {
    margin: 0 1em;
  }
  display: flex;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

const StyledCheckbox = styled(Checkbox)`
  &.MuiCheckbox-root {
    :hover {
      background-color: ${({ theme }) => theme.palette.action.hover};
    }
  }
`;

// ----------------------------------------------------------------------

interface CheckboxInputProps {
  promptText?: string;
}

const CheckboxInput = ({ promptText }: CheckboxInputProps) => {
  return (
    <CheckboxInputContainer>
      <StyledCheckbox />
      {promptText ? <PromptText>{promptText}</PromptText> : ""}
    </CheckboxInputContainer>
  );
};

export default CheckboxInput;
