import { useSelector } from "react-redux";
import {
  Navigate,
  Outlet
} from "react-router-dom";
import { RootState } from "rootStore/rootReducer";

// ----------------------------------------------------------------------

const PreAuthRoute = () => {
  const { isLoggedIn } = useSelector(
    (state: RootState) => state.accountReducer
  );

  return (
    isLoggedIn ? <Navigate to='/iser/dashboard'/> : <Outlet/>
  )
}

export default PreAuthRoute;