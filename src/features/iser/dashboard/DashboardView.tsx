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

  return (<>
    <Typography variant="h2">Admin Dashboard  </Typography>
      <StyledDiv><LinearProgress value={60} valueBuffer={90} variant="determinate"/></StyledDiv>

  </>);
};

export default DashboardView;
