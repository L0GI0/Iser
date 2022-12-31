import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Link, Typography, Avatar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import ACCOUNT from '_mocks/account';
import { RootState } from "rootStore/rootReducer";
import Label from "common/components/Label";

// ----------------------------------------------------------------------

const AccountStyle = styled('div')<SidebarAccountProps>(({ theme, isCollapse }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 1.5),
  margin: theme.spacing(1, 1.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
  ...(isCollapse && {
    backgroundColor: 'transparent'
  })
}));

const AccountDetails = styled(Box)<SidebarAccountProps>(({ theme, isCollapse }) => ({
  marginLeft: theme.spacing(2),
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.shorter,
  }),
  ...(isCollapse && {
    marginLeft: 0,
    width: 0,
  }),
}));

// ----------------------------------------------------------------------

interface SidebarAccountProps {
  isCollapse: boolean
}

const SidebarAccount: React.FC<SidebarAccountProps> = ({ isCollapse }) => {
  
  const profile = useSelector((state: RootState) => state.accountReducer.profile)
  const user = useSelector((state: RootState) => state.accountReducer.user) 
  
  return (
    <Link underline="none" component={RouterLink} to="/iser/profile">
      <AccountStyle isCollapse={isCollapse}>
        <Avatar src={ACCOUNT.photoURL} alt="photoURL" />
        <AccountDetails isCollapse={isCollapse}>
          <Typography variant="subtitle2" sx={{ color: 'text.primary' }} noWrap>
            {profile.firstName} {profile.lastName}
          </Typography>
          {!isCollapse && 
            <Label skinVariant="outlined" color={(user.userType === 'admin' && 'warning') || 'info'}>
              <Typography variant='label'>
                { user.userType }
              </Typography>
            </Label>
          }
        </AccountDetails>
      </AccountStyle>
    </Link>
  );
}

export default SidebarAccount;
