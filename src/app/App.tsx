import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useLocation,
  useHistory,
} from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import AuthError from "features/account/components/AuthError";

import { RootState } from "rootStore/rootReducer";
import PageLoadingWrapper from "common/components/PageLoadingWrapper";
import SignInView from "features/account/SignIn/SignInView";
import SignUpView from "features/account/SignUp/SignUpView";
import DashboardView from "features/supervision/Manage/DashboardView";
import useSnackbarNotifier from "features/notifiers/useSnackbarNotifier";
import { useDispatch } from 'react-redux' 
import { authenticate } from 'features/account/store/accountSlice' 
import ThemeProvider from 'common/theme'
import "./App.css";
// import { palette } from "@mui/system";

// declare module '@mui/material/Button' {
//   interface ButtonPropsVariantOverrides {
//     round: true;
//   }
// }


// const appTheme = {
//   palette: {
//     primary: {
//       main: 'rgba(92, 58, 252, 255)',
//     },
//     secondary: {
//       main: 'rgba(110,96,255,255)',
//     },
//   }
// }

/* When using MUI's theme with MUI System or any other styling solution,
  it can be convenient to add additional variables to the theme so
  you can use them everywhere - https://mui.com/customization/theming/ */
// const theme = createTheme(appTheme)

/* Using custom theme immutability approach for better performance. Thus, worse readability */
// if(theme.components){
//   theme.components.MuiButton = {
//   ...theme!.components!.MuiButton,
//     styleOverrides: {
//       root: {
//         textTransform: 'none',
//         margin: '1em 0',
//       }
//     },
//     variants: [
//       {
//         props: { variant: 'round'},
//         style: {
//           borderRadius: '5em',
//           padding: '0.75em 3em',
//         }
//       },
//       {
//         props: { variant: 'round', color: "primary" },
//         style: {
//           background: theme.palette.primary.main,
//           color: theme.palette.primary.contrastText,
//           boxShadow: '0px 10px 10px rgba(92, 58, 252, 0.5)',
//           ":hover": {
//             background: 'rgba(92, 58, 252, 0.9)',
//             boxShadow: '0px 5px 10px rgba(92, 58, 252, 0.5)'
//           }
//         }
//       },
//       {
//         props: { variant: 'round', color: "secondary" },
//         style: {
//           background: theme.palette.secondary.main,
//           boxShadow: '0px 10px 10px rgba(86,55,235,255)',
//           ":hover": {
//             background: 'rgba(86,55,235,255)',
//             boxShadow: '0px 0px 10px 1px rgba(110,96,255,255)'
//           }
//         }
//       },
//     ] 
//   }
// }


interface AppRouteProps {
  Component: React.FC<any>;
  path: string;
  authorizedRoles?: string[];
  isPreAuth?: boolean;
  exact?: boolean;
}

const allRoutes = {
  signIn: "signin",
  signUp: "signup",
  dashboard: "dashboard",
};

type ValueOf<T> = T[keyof T];

type AllRoutes = ValueOf<typeof allRoutes>

interface UserRoles {
  admin: {
    landingPage: AllRoutes;
  };
}

const userRoles: UserRoles = {
  admin: {
    landingPage: allRoutes.dashboard,
  },
};


const getAppRedirectPath = (isPreAuth: AppRouteProps['isPreAuth']): AllRoutes => {
    if(isPreAuth){
      return allRoutes.dashboard
    }
  return allRoutes.signIn
}

const AppRoute = ({
  Component,
  path,
  authorizedRoles,
  exact = false,
  isPreAuth = false,
}: AppRouteProps): JSX.Element => {
  const { isLoggedIn } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const userRole = useSelector(
    (state: RootState) => state.accountReducer.accountType
  );

  const dispatch = useDispatch()

  const isAuthorized = authorizedRoles?.includes(userRole) ?? isPreAuth
  const history = useHistory()

  useEffect(() => { 
    if(!isPreAuth)
      dispatch(authenticate())


    if(!isLoggedIn && !isPreAuth){
      history.push('/signin')
      return;
    }

    if(isLoggedIn && isPreAuth)
      history.push('/dashboard')

  }, [isLoggedIn, history, isPreAuth, dispatch])

  return (
      <Route
        path={path}
        exact
        render={(props) => {
          if (isAuthorized) {
            return <Component {...props} />;
          } else {
            return <AuthError/>; /* add an error page */
          }
        }}
      />
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

  return (
    <ThemeProvider>
      <Router basename="/">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div className="App">
            <Switch>
              <AppRoute path="/signin" Component={SignInView} isPreAuth={true} />
              <AppRoute path="/signup" Component={SignUpView} isPreAuth={true} />
              <AppRoute
                path="/dashboard"
                Component={DashboardView}
                authorizedRoles={["admin", 'user']}
              ></AppRoute>
              <Redirect exact to="/signin" />
            </Switch>
          </div>
        </ErrorBoundary>
      </Router>
    </ThemeProvider>
  );
}

export default App;