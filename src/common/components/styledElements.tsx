import styled from "styled-components";
import React from 'react';
import BubbledBackground from "../images/bgg.png";
import { alpha } from '@mui/material/styles'
import { ReactComponent as GreenCircle } from "../images/g-circle.svg";
import { ReactComponent as PinkCircle } from "../images/p-circle.svg";

export const WhiteSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 900px;
  flex-wrap: nowrap;
  padding: 0em 7em;
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

interface SectionProps {
  children: React.ReactNode
}

const TopRightCircle = styled(PinkCircle)`
  position: absolute;
  top: -750px;
  left: 400px;
`;

const TopLeftCircle = styled(PinkCircle)`
  position: absolute;
  top: -750px;
  right: 400px;
`;

const BottomLeftCircle = styled(GreenCircle)`
  position: absolute;
  bottom: -500px;
  right: -650px;
`;

export const NavyBlueBubbledSectionRight = ( { children }: SectionProps) => {
  return <NavyBlueBubbledSection>
    <TopLeftCircle/>
    <BottomLeftCircle/>
      { children }
    </NavyBlueBubbledSection>
}

export const NavyBlueBubbledSectionLeft = ( { children }: SectionProps) => {
  return <NavyBlueBubbledSection>
    <TopRightCircle/>
      { children }
    </NavyBlueBubbledSection>
}

export const LineSeparator = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 2em 0;
  font-size: 10px;
  width: 100%;
  color: rgba(225, 221, 221, 255);
  ::before,
  ::after {
    content: "";
    flex: 1;
    border-bottom: 2px solid rgba(225, 221, 221, 255);
  }

  :not(:empty)::before {
    margin-right: 1em;
  }

  :not(:empty)::after {
    margin-left: 1em;
  }
`;
