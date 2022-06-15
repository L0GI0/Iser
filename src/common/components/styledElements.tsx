import styled from "styled-components";
import React from 'react';
import { Container } from '@mui/material'
import BubbledBackground from "../images/bgg.png";
import { ReactComponent as GreenCircle } from "../images/g-circle.svg";
import { ReactComponent as PinkCircle } from "../images/p-circle.svg";

// ----------------------------------------------------------------------

export const WhiteSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 900px;
  flex-wrap: nowrap;
  height: 100%;
  width: 100%;
  background-color: ${({ theme })  => theme.palette.background.default};
`;

export const NavyBlueBubbledSection = styled.section`
  position: relative;
  overflow: hidden;
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  min-height: 900px;
  color: white;
  background: url(${BubbledBackground}) no-repeat rgba(92, 58, 252, 255);
  box-shadow: 0px 0px 5px 0px ${({theme}) => theme.palette.primary.main};
  background-size: cover;
  background-position: center;
`;

export const ReactiveContainer = styled(Container)`
  position: relative;
  padding: 0;
`

interface SectionProps {
  children: React.ReactNode
}

const TopRightCircle = styled(PinkCircle)`
  position: absolute;
  top: -750px;
  left: calc(100% - 450px);
`;

const TopLeftCircle = styled(PinkCircle)`
  position: absolute;
  top: -750px;
  right: calc(100% - 450px);
`;

const BottomLeftCircle = styled(GreenCircle)`
  position: absolute;
  bottom: -500px;
  right: -650px;
`;


export const NavyBlueBubbledSectionRight = ( { children }: SectionProps) => {
  return (
  <NavyBlueBubbledSection>
    <Container maxWidth="sm">
      <TopLeftCircle/>
      <BottomLeftCircle/>
        { children }
    </Container>
    </NavyBlueBubbledSection>)
}

export const NavyBlueBubbledSectionLeft = ( { children }: SectionProps) => {
  return ( 
  <NavyBlueBubbledSection>
    <Container maxWidth="sm">
      <TopRightCircle/>
      { children }
      </Container>
  </NavyBlueBubbledSection>)
}