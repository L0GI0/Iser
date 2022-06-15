import styled from "styled-components";
import { Typography, Container } from "@mui/material";
import { InfoSectionContent } from "./styledElements";

// ----------------------------------------------------------------------

const InfoHeader = styled(Typography).attrs({ variant: "h3", component: "h2" })`
  line-height: 1.5em;
  width: 100%;
`;

const InfoDescription = styled(Typography).attrs({
  variant: "body1",
  component: "span",
})`
  width: 100%;
  font-size: 16px;
  opacity: 0.8;
`;

const InfoFooter = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
`;

interface InfoContentProps {
  header: string;
  description: string;
  footer: React.ReactNode;
}

const InfoContent = ({ header, description, footer }: InfoContentProps) => {
  return (
    <InfoSectionContent>
      <InfoHeader>{header}</InfoHeader>
      <InfoDescription>{description}</InfoDescription>
      <InfoFooter>{footer}</InfoFooter>
    </InfoSectionContent>
  );
};

export default InfoContent;
