import React from "react";
import styled from "styled-components";

type TranslateType = {
  loading: boolean;
};

export const RedirectionSpinnerContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageLoadingWrapper: React.FC<TranslateType> = ({ loading, children }) => {
  return (
    <React.Fragment>
      {loading ? (
        <RedirectionSpinnerContainer>Loading</RedirectionSpinnerContainer>
      ) : (
        children
      )}
    </React.Fragment>
  );
};

export default PageLoadingWrapper;
