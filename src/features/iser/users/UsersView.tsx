import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsers } from 'features/iser/store/iserSlice'
import UsersTable from './components/UsersTable';

// ----------------------------------------------------------------------

const UsersView = () => {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchUsers());
  })

  return (
    <>
      <UsersTable/>
    </>
  )
}

export default UsersView