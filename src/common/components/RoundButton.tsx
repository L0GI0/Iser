import styled from "styled-components";
import Button from "@mui/material/Button";

// ----------------------------------------------------------------------

const ButtonContainer = styled(Button).attrs({
  variant: "round",
})`
  flex-shrink: 0;

  &.MuiButton-root {
    transition-property: background, box-shadow;
    transition-duration: .3s;
  }
`;

// ----------------------------------------------------------------------

interface ButtonProps {
  text: string;
  postfixIcon?: React.SVGProps<SVGSVGElement>;
}

const RoundButton: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ text, postfixIcon, ...props }: ButtonProps) => {
  return (
    <ButtonContainer {...props} endIcon={postfixIcon}>
      {text}
    </ButtonContainer>
  );
};

export default RoundButton;
