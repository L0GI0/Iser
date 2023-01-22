import UsersTable from './components/UsersTable';
import Container from '@mui/material/Container';

// ----------------------------------------------------------------------

const UsersView = () => {

  return (
    <Container maxWidth={false} sx={{height: '100vh'}}>
      <UsersTable/>
    </Container>
  )
}

UsersView.whyDidYouRender = true;

export default UsersView;