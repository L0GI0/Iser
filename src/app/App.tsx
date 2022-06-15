import React, { useEffect } from "react";
import ThemeProvider from 'common/theme'
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  Outlet
} from "react-router-dom";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

import { RootState } from "rootStore/rootReducer";
import SignInView from "features/account/SignIn/SignInView";
import SignUpView from "features/account/SignUp/SignUpView";
import DashboardView from "features/iser/dashboard/DashboardView";
import UsersView from 'features/iser/users/UsersView';
import useSnackbarNotifier from "features/notifiers/useSnackbarNotifier";
import { useDispatch } from 'react-redux' 
import { authenticate } from 'features/account/store/accountSlice' 
import DashboardLayout from 'features/iser/dashboard'
import AuthError from 'features/account/components/AuthError'
import AppError from "features/account/components/AppError";
import { useTranslation } from 'react-i18next';
import { namespaces } from "i18n";
import PageLoadingWrapper from "common/components/PageLoadingWrapper";
import "./App.css";

// ----------------------------------------------------------------------

interface AppRouteProps {
  authorizedRoles?: string[];
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


const PrivateRoute = ({
  authorizedRoles,
}: AppRouteProps): JSX.Element => {
  const { isLoggedIn } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const userRole = useSelector(
    (state: RootState) => state.accountReducer.accountType
  );

  const dispatch = useDispatch()

  const isAuthorized = authorizedRoles?.includes(userRole) || !authorizedRoles 
  const navigate = useNavigate()



  useEffect(() => { 
    if(!isLoggedIn){
      navigate('/app/signin')
      return;
    }

  }, [isLoggedIn, navigate, dispatch])

  useEffect(() => {
    dispatch(authenticate())
  })

  return (
    isAuthorized ? <Outlet /> : <Navigate to='/unath' />
  )
};

const PreAuthRoute = () => {
  const { isLoggedIn } = useSelector(
    (state: RootState) => state.accountReducer
  );

  return (
    isLoggedIn ? <Navigate to='/dashboard/app'/> : <Outlet/>
  )
}

const ErrorFallback: React.FC<FallbackProps> = ({ resetErrorBoundary }) => {
  useEffect(() => {
    resetErrorBoundary();
  }, [resetErrorBoundary]);

  return <Navigate to="/error" />;
};


function App() {

  useSnackbarNotifier();
  const { ready: areTranslationsLoaded } = useTranslation(namespaces);

  return (
    // split into preauth and app parts
    <ThemeProvider>
      <PageLoadingWrapper loading={!areTranslationsLoaded}> 
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Router basename="/">
            <div className="App">
                <Routes>
                  <Route path="/app" element={<PreAuthRoute/>}>
                    <Route path="/app/signin" element={<SignInView/>} />
                    <Route path="/app/signup" element={<SignUpView/>} />
                  </Route>              
                  <Route
                    path="/dashboard"
                    element={<PrivateRoute />}
                  >
                    <Route path="/dashboard/" element={<DashboardLayout/>}>
                      <Route path='/dashboard/app' element={<DashboardView/>}/>
                      <Route path="/dashboard/users" element={<UsersView/>}/>
                    </Route>
                  </Route>
                  <Route path="/unath" element={<AuthError/>}/>
                  <Route path="/error" element={<AppError/>}/>
                  <Route path="/" element={<Navigate to={"/app/signin"}/>}/>
                </Routes>
              </div>
          </Router>
        </ErrorBoundary>
      </PageLoadingWrapper>
    </ThemeProvider>
  );
}

export default App;