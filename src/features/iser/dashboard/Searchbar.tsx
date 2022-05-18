import { useState } from 'react';
import { alpha } from '@mui/material/styles';
import styled, { css } from 'styled-components'
import { Input, Slide, Button, IconButton, InputAdornment, ClickAwayListener } from '@mui/material';
import Iconify from 'common/components/Iconify';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

const SearchIconDimensions = css`
  height: 20px;
  width: 20px;
`

interface SearchIconProps {
  disabled?: boolean;
}

const SearchFillIcon = styled(Iconify).attrs({ icon: 'eva:search-fill' })<SearchIconProps>`
  ${SearchIconDimensions}
  ${({ disabled, theme }) => disabled && 'color: ' + theme.palette.text.disabled }
`

// ----------------------------------------------------------------------

export default function Searchbar() {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { t } = useTranslation('dashboard');

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!isOpen && (
          <IconButton onClick={handleOpen}>
            <SearchFillIcon/>
          </IconButton>
        )}

        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchbarStyle>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder={t('search_bar.input_placeholder')}
              startAdornment={
                <InputAdornment position="start">
                  <SearchFillIcon disabled/>
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
            />
            <Button variant="contained" onClick={handleClose}>
              {t('search_bar.button_search')}
            </Button>
          </SearchbarStyle>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
