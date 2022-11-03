import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'rootStore/rootReducer'
import { authenticate } from 'features/account/store/accountSlice'; 
import {
  Navigate,
  useNavigate,
  Outlet
} from "react-router-dom";

// ----------------------------------------------------------------------

interface AppRouteProps {
  authorizedUserTypes?: string[];
}

const PrivateRoute = ({
  authorizedUserTypes,
}: AppRouteProps): JSX.Element => {
  const { isLoggedIn } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const { userType } = useSelector(
    (state: RootState) => state.accountReducer.user
  );

  const dispatch = useDispatch()

  const isAuthorized = authorizedUserTypes?.includes(userType) || !authorizedUserTypes 
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

export default PrivateRoute;