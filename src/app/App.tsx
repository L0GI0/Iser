import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

import { RootState } from "../rootStore/rootReducer";
import PageLoadingWrapper from "../common/components/PageLoadingWrapper";
import SignInView from "../features/account/SignIn/SignInView";
import SignUpView from "../features/account/SignUp/SignUpView";
import DashboardView from "../features/supervision/Manage/DashboardView";

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

interface PrivateRouteProps {
  component: any;
  [k: string]: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  path,
  ...props
}) => {
  const isLoggingIn = useSelector(
    (state: RootState) => state.accountReducer.isLoggingIn
  );

  const isAuthorized = true;

  return (
    <PageLoadingWrapper loading={isLoggingIn}>
      <Route
        {...props}
        path={path}
        render={(props) => {
          if (isAuthorized) {
            return <Component {...props} />;
          } else {
            return <Redirect to={{ pathname: "/signin" }} />;
          }
        }}
      />
    </PageLoadingWrapper>
  );
};

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
              <PrivateRoute
                path="/dashboard"
                component={DashboardView}
              ></PrivateRoute>
              <Redirect exact to="/signin" />
            </Switch>
          </div>
        </ErrorBoundary>
      </Router>
    </ThemeProvider>
  );
}

export default App;
