import React, { useEffect } from "react";
import ThemeProvider from 'common/theme';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

import SignInView from "features/account/SignIn/SignInView";
import SignUpView from "features/account/SignUp/SignUpView";
import AnalyticsView from "features/iser/dashboard/AnalyticsView";
import UsersView from 'features/iser/users/UsersView';
import SettingsView from "features/account/settings/SettingsView";
import ProfileView from 'features/iser/profile/ProfileView';
import IserLayout from 'features/iser/layout/IserLayout'
import AuthError from 'features/account/components/AuthError'
import AppError from "features/account/components/AppError";
import PageLoadingWrapper from "common/components/PageLoadingWrapper";
import { useTranslation } from 'react-i18next';
import { namespaces } from "i18n";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import UserProfileView from "features/iser/users/UserProfileView";
import UserEditView from "features/iser/users/UserEditView";
import UserNotFound from 'features/iser/users/components/UserNotFound';
import PreAuthRoute from "common/components/router/authRoutes/PreAuthRoute";
import PrivateRoute from "common/components/router/authRoutes/PrivateRoute";
import UsersRoute from 'common/components/router/notifierRoutes/UsersRoute';
import { CollapseDrawerProvider } from 'features/iser/layout/CollapseDrawerContext';
import "./App.css";

// ----------------------------------------------------------------------

const ErrorFallback: React.FC<FallbackProps> = ({ resetErrorBoundary }) => {
  useEffect(() => {
    resetErrorBoundary();
  }, [resetErrorBoundary]);

  return <Navigate to="/error" />;
};

function App() {


  const { ready: areTranslationsLoaded } = useTranslation(namespaces);
  return (
  <ThemeProvider>
    <LocalizationProvider dateAdapter={AdapterDateFns} >
      <PageLoadingWrapper loading={!areTranslationsLoaded}>
      <CollapseDrawerProvider>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Router basename="/">
                <Routes>
                  <Route path="/app" element={<PreAuthRoute/>}>
                    <Route path="/app/signin" element={<SignInView/>} />
                    <Route path="/app/signup" element={<SignUpView/>} />
                  </Route>              
                    <Route path="/iser/" element={<IserLayout/>}>
                      <Route path="/iser/" element={<PrivateRoute/>}>
                        <Route path='/iser/analytics' element={<AnalyticsView/>}/>
                        <Route path="/iser/profile" element={<ProfileView/>}/>
                        <Route path="/iser/settings" element={<SettingsView/>}/>
                        <Route path="/iser/users" element={<UsersRoute/>}>
                          <Route path="/iser/users" element={<UsersView/>}/>
                          <Route path="/iser/users/:id" element={<UserProfileView/>}/>
                          <Route path="/iser/users/not_found" element={<UserNotFound/>}/>
                          <Route path="/iser/users" element={<PrivateRoute authorizedUserTypes={['admin']}/>}>
                            <Route path="/iser/users/edit/:id" element={<UserEditView/>}/>
                          </Route>
                        </Route>
                      </Route>
                    </Route>
                  <Route path="/unath" element={<AuthError/>}/>
                  <Route path="/error" element={<AppError/>}/>
                  <Route path="/" element={<Navigate to={"/app/signin"}/>}/>
                </Routes>
          </Router>
        </ErrorBoundary>
        </CollapseDrawerProvider>
      </PageLoadingWrapper>
    </LocalizationProvider>
  </ThemeProvider>
  );
}

App.whyDidYouRender = true;

export default App;