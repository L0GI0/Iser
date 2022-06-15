import React from "react";
import styled from "styled-components";
import Grid from "@mui/material/Grid";

// ----------------------------------------------------------------------

const TwoSections = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  height: 100%;
  width: 100%;
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

const ResponsiveGrid = styled(Grid).attrs({ xs: 12, lg: 6 })`
  min-height: 100vh;
  scroll-snap-align: start; 
`

// ----------------------------------------------------------------------

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
      <ResponsiveGrid>{leftSection}</ResponsiveGrid>
      <ResponsiveGrid>{rightSection}</ResponsiveGrid>
    </Grid>
  </TwoSections>
);

export default TwoSectionsLayout;
