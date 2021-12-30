import styled from "styled-components";
import BubbledBackground from "../images/bgg.png";

export const WhiteSection = styled.section`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 900px;
  flex-wrap: nowrap;
  padding: 0em 7em;
  height: 100%;
  width: 100%;
  background-color: rgba(245, 246, 251, 255);
`;

export const NavyBlueBubbledSection = styled.section`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  min-height: 900px;
  color: white;
  background: url(${BubbledBackground}) no-repeat rgba(92, 58, 252, 255);
  box-shadow: 0px 0px 5px 0px rgba(92, 58, 252, 255);
  background-size: cover;
  background-position: center;
`;

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
