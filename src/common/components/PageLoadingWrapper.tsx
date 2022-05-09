import React from "react";
import styled from "styled-components";

// ----------------------------------------------------------------------

export const RedirectionSpinnerContainer = styled.div`
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`;

// ----------------------------------------------------------------------

type TranslateType = {
  loading: boolean;
};

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
