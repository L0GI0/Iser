import { useDispatch, useSelector } from 'react-redux' 
import { logOut, authenticate } from 'features/account/store/accountSlice' 
import RoundButton from "common/components/RoundButton";
import { RootState } from "rootStore/rootReducer";
import LinearProgress from "@mui/material/LinearProgress";
import styled from 'styled-components'
import { Typography } from "@mui/material"

// ----------------------------------------------------------------------

const StyledDiv = styled.div`
  width: 100px;
`

// ----------------------------------------------------------------------

const DashboardView = () => {

  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.accountReducer.users)

  const getUsers = () => {
    dispatch(authenticate())
  }

  return (<>
    <Typography variant="h2">Admin Dashboard  </Typography>
      <RoundButton text="auth" onClick={getUsers}/>
      <StyledDiv><LinearProgress value={60} valueBuffer={90} variant="determinate"/></StyledDiv>
      <ul>
        { users && users.map((user: any) => {
          return <li>{user.name}</li> 
        })}
      </ul>

  </>);
};

export default DashboardView;
