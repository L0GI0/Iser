import React from "react";
import styled from "styled-components";
import { ReactComponent as GreenCircle } from "../images/g-circle.svg";
import { ReactComponent as PinkCircle } from "../images/p-circle.svg";
import Grid from "@mui/material/Grid";

const TwoSections = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  height: 100%;
  width: 100%;
  min-height: 900px;
  min-width: 1600px;
  overflow: hidden;
`;

interface LogoProps {
  logoSource: any;
}

const Logo = styled.div<LogoProps>`
  position: absolute;
  background: ${(props) => `url(${props.logoSource}) no-repeat`};
  background-size: contain;
  background-position: center;
  left: 7em;
  top: 5em;
  width: 200px;
  height: 50px;
`;

interface TwoSectionsLayoutProps {
  leftSection: React.ReactNode;
  rightSection: React.ReactNode;
  logo?: any;
}

const TwoSectionsLayout: React.FC<TwoSectionsLayoutProps> = ({
  leftSection,
  rightSection,
  logo,
}) => (
  <TwoSections>
    {logo && <Logo logoSource={logo} />}
    <Grid container>
      <Grid xs={6}>{leftSection}</Grid>
      <Grid xs={6}>{rightSection}</Grid>
    </Grid>
  </TwoSections>
);

export default TwoSectionsLayout;
