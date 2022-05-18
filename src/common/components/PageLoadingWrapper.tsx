import React from "react";
import styled from "styled-components";
import CircularProgress from '@mui/material/CircularProgress';

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
        <RedirectionSpinnerContainer><CircularProgress /></RedirectionSpinnerContainer>
      ) : (
        children
      )}
    </React.Fragment>
  );
};

export default PageLoadingWrapper;
