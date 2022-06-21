import styled from "styled-components";
import Button, { ButtonProps } from "@mui/material/Button";

// ----------------------------------------------------------------------

const ButtonContainer = styled(Button)`
  flex-shrink: 0;

  &.MuiButton-root {
    transition-property: background, box-shadow;
    transition-duration: .3s;
  }

  & .MuiButton-endIcon {
    position: absolute;
    right: 2.5em;
  }
`;

// ----------------------------------------------------------------------

interface RoundButtonProps extends ButtonProps {
  text: string;
  postfixIcon?: React.SVGProps<SVGSVGElement>; /* Just use endIcon */
}

const RoundButton: React.FC<RoundButtonProps> = ({ text, postfixIcon, ...props }: RoundButtonProps) => {
  return (
    <ButtonContainer endIcon={postfixIcon} variant="round" {...props}>
      {text}
    </ButtonContainer>
  );
};

export default RoundButton;
