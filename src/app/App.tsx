import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import SignInView from "../features/account/SignIn/SignInView";
import SignUpView from "../features/account/SignUp/SignUpView";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import "./App.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgba(92, 58, 252, 255)",
    },
    secondary: {
      main: "rgba(110,96,255,255)",
    },
  },
});

const ErrorFallback: React.FC<FallbackProps> = ({ resetErrorBoundary }) => {
  useEffect(() => {
    resetErrorBoundary();
  }, []);

  return <Redirect to="/signin" />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router basename="/">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div className="App">
            <Switch>
              <Route path="/signin" component={SignInView} />
              <Route path="/signup" component={SignUpView} />
              <Redirect exact to="/signin" />
            </Switch>
          </div>
        </ErrorBoundary>
      </Router>
    </ThemeProvider>
  );
}

export default App;
