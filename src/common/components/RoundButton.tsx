import styled from "styled-components";
import Button from "@mui/material/Button";

interface ButtonStyleProps {
  background?: string;
  backgroundHover?: string;
}

const ButtonContainer = styled(Button)<ButtonStyleProps>`
  display: flex;
  position: relative;
  flex-shrink: 0;

  &.MuiButton-root {
    border-radius: 5em;
    margin: 1em 0;
    transition-property: background, box-shadow;
    transition-duration: .2s;
    box-shadow: ${(props) =>
      props.color === "primary"
        ? "0px 10px 10px rgba(92, 58, 252, 0.5)"
        : "0px 10px 10px rgba(86,55,235,255)"};
    text-transform: none;
    padding: 0.75em 3em;
    &:hover {
      box-shadow: ${(props) =>
        props.color === "primary"
          ? "0px 5px 10px rgba(92, 58, 252, 0.5)"
          : "0px 0px 10px 1px rgba(110,96,255,255)"};
      background: ${(props) =>
        props.color === "primary"
          ? "rgba(92, 58, 252, 0.9)"
          : "rgba(86,55,235,255)"};
    }
    color: white;
  }
`;

interface ButtonProps extends ButtonStyleProps {
  text: string;
  postfixIcon?: React.SVGProps<SVGSVGElement>;
}

const RoundButton: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ text, postfixIcon, ...props }: ButtonProps) => {
  return (
    <ButtonContainer {...props} endIcon={postfixIcon} variant="contained">
      {text}
    </ButtonContainer>
  );
};

export default RoundButton;
