import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from '@mui/material';
import MenuPopover from 'common/components/MenuPopover';
import Iconify from 'common/components/Iconify';
import styled from 'styled-components'
import account from '_mocks/account';
import React from 'react';
import { TFunction, useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { logOut } from 'features/account/store/accountSlice' 

// ----------------------------------------------------------------------

interface MenuOptions {
  label: string,
  icon: string,
  linkTo: string
}

const getMenuOptions = (t: TFunction<'dashboard'>): MenuOptions[] => {
  return [
    {
      label: t('account_popover.menu_options.home_option'),
      icon: 'eva:home-fill',
      linkTo: '/',
    },
    {
      label: t('account_popover.menu_options.profile_option'),
      icon: 'eva:person-fill',
      linkTo: '/iser/profile',
    },
    {
      label: t('account_popover.menu_options.settings_option'),
      icon: 'eva:settings-2-fill',
      linkTo: '/iser/settings',
    },
  ];
}

interface AvatarIconButtonProps {
  open: boolean
}

const AvatarIconButton = styled(IconButton)<AvatarIconButtonProps>(({ theme, open }) => ({
  p: 0,
  ...(open && {
    '&:before': {
      zIndex: 1,
      content: "''",
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      position: 'absolute',
      bgcolor: alpha(theme.palette.grey[900], 0.8)
    },
  }),  
}))

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);

  const [open, setOpen] = useState<EventTarget & HTMLButtonElement | null>(null);

  const { t } = useTranslation('dashboard');
  const dispatch = useDispatch();

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <AvatarIconButton
        ref={anchorRef}
        onClick={handleOpen}
        open
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </AvatarIconButton>

      <MenuPopover
        open={Boolean(open)}       
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {account.firstName} {account.lastName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {getMenuOptions(t).map((option) => (
            <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
              <Iconify sx={{ mx: 1 }} icon={option.icon} />
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={() => { handleClose(); dispatch(logOut()) }} sx={{ m: 1 }}>
          {t('account_popover.log_out_button')}
        </MenuItem>
      </MenuPopover>
    </>
  );
}
