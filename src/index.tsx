import './wdyr';

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import EnhancedSnackbarProvider from 'features/notifiers/EnhancedSnackbarProvider';
import "./index.css";
import App from "./app/App";
import store, { persistor } from "./rootStore/store";

// ----------------------------------------------------------------------

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <EnhancedSnackbarProvider maxSnack={3}>
          <App/>
        </EnhancedSnackbarProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
