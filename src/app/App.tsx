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
import { SnackbarProvider } from "notistack";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

import { RootState } from "rootStore/rootReducer";
import PageLoadingWrapper from "common/components/PageLoadingWrapper";
import SignInView from "features/account/SignIn/SignInView";
import SignUpView from "features/account/SignUp/SignUpView";
import DashboardView from "features/supervision/Manage/DashboardView";

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

interface AuthRouteProps {
  Component: React.FC<any>;
  path: string;
  exact?: boolean;
  requiredRoles: string[];
}

const allRoutes = {
  signIn: "/signin",
  signUp: "/signup",
  dashboard: "/dashboard",
};

interface UserRoles {
  admin: {
    landingPage: typeof allRoutes[keyof typeof allRoutes];
  };
}

const userRoles: UserRoles = {
  admin: {
    landingPage: allRoutes.dashboard,
  },
};

const AuthRoute = ({
  Component,
  path,
  exact = false,
  requiredRoles,
}: AuthRouteProps): JSX.Element => {
  const isLoggingIn = useSelector(
    (state: RootState) => state.accountReducer.isLoggingIn
  );

  const userRole = useSelector(
    (state: RootState) => state.accountReducer.isLoggingIn
  );

  const isAuthorized = true;

  return (
    <PageLoadingWrapper loading={isLoggingIn}>
      <Route
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
      <SnackbarProvider maxSnack={3}>
      <Router basename="/">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div className="App">
            <Switch>
              <Route path="/signin" component={SignInView} />
              <Route path="/signup" component={SignUpView} />
              <AuthRoute
                path="/dashboard"
                Component={DashboardView}
                requiredRoles={["admin"]}
              ></AuthRoute>
              <Redirect exact to="/signin" />
            </Switch>
          </div>
        </ErrorBoundary>
      </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
