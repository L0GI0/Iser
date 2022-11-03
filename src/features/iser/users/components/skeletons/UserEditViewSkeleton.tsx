import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import styled from 'styled-components';

// ----------------------------------------------------------------------

const UserEditSectionSkeleton = styled(Skeleton)(({theme}) => ({
  borderRadius: theme.borders.borderRadius.xxl,
}))

// ----------------------------------------------------------------------

const UserEditViewSkeleton = () => {
  return (
    <Stack spacing={3}>
      <Skeleton variant="rectangular" animation="wave" width={'100%'} height={141} sx={{borderRadius: 10}}/>
      <UserEditSectionSkeleton variant="rectangular" width={'100%'} height={422}/>
      <UserEditSectionSkeleton variant="rectangular" width={'100%'} height={284}/>
      <UserEditSectionSkeleton variant="rectangular" width={'100%'} height={169}/>
      <UserEditSectionSkeleton variant="rectangular" width={'100%'} height={209}/>
    </Stack>
  );
}

export default UserEditViewSkeleton;