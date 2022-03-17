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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

import { RootState } from "rootStore/rootReducer";
import PageLoadingWrapper from "common/components/PageLoadingWrapper";
import SignInView from "features/account/SignIn/SignInView";
import SignUpView from "features/account/SignUp/SignUpView";
import DashboardView from "features/supervision/Manage/DashboardView";
import useSnackbarNotifier from "features/notifiers/useSnackbarNotifier";

import "./App.css";
// import { palette } from "@mui/system";

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    round: true;
  }
}


const appTheme = {
  palette: {
    primary: {
      main: 'rgba(92, 58, 252, 255)',
    },
    secondary: {
      main: 'rgba(110,96,255,255)',
    },
  }
}

/* When using MUI's theme with MUI System or any other styling solution,
  it can be convenient to add additional variables to the theme so
  you can use them everywher - https://mui.com/customization/theming/ */
const theme = createTheme(appTheme)

/* Using custom theme immutability approach for better performance. Thus, worse readability */
if(theme.components){
  theme.components.MuiButton = {
  ...theme!.components!.MuiButton,
    styleOverrides: {
      root: {
        textTransform: 'none',
        margin: '1em 0',
      }
    },
    variants: [
      {
        props: { variant: 'round'},
        style: {
          borderRadius: '5em',
          padding: '0.75em 3em',
        }
      },
      {
        props: { variant: 'round', color: "primary" },
        style: {
          background: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          boxShadow: '0px 10px 10px rgba(92, 58, 252, 0.5)',
          ":hover": {
            background: 'rgba(92, 58, 252, 0.9)',
            boxShadow: '0px 5px 10px rgba(92, 58, 252, 0.5)'
          }
        }
      },
      {
        props: { variant: 'round', color: "secondary" },
        style: {
          background: theme.palette.secondary.main,
          boxShadow: '0px 10px 10px rgba(86,55,235,255)',
          ":hover": {
            background: 'rgba(86,55,235,255)',
            boxShadow: '0px 0px 10px 1px rgba(110,96,255,255)'
          }
        }
      },
    ] 
  }
}


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
    (state: RootState) => state.accountReducer.role
  );


  const isAuthorised2 = requiredRoles.includes(userRole)

  const isAuthorized = requiredRoles.some((role) => role === userRole)

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

  useSnackbarNotifier();
  // useStateChangeNotifiers();

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
