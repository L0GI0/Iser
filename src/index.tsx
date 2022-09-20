import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SnackbarProvider } from "notistack";
import "./index.css";
import App from "./app/App";
import store, { persistor } from "./rootStore/store";
import styled from 'styled-components'

// ----------------------------------------------------------------------

const StyledSnackbarProvider = styled(SnackbarProvider)`
  &&.SnackbarItem-contentRoot {
    border-radius: 5em;
    white-space: pre-wrap;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StyledSnackbarProvider maxSnack={3}>
          <App />
        </StyledSnackbarProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
