import { useRef, useState } from 'react';
// material
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton } from '@mui/material';
// components
import MenuPopover from 'common/components/MenuPopover';
import styled from 'styled-components';


// ----------------------------------------------------------------------

interface LanguageOptionIconProps {
  open: boolean,
}

const LanguageOptionIcon = styled(IconButton)<LanguageOptionIconProps>(({ theme, open }) => ({
  padding: theme.spacing(0),
  width: 44,
  height: 44,
  ...(open && {
    bgcolor: alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
  }) 
}));

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: '/static/icons/lng_flag_en.svg',
  },
  {
    value: 'pl',
    label: 'Polish',
    icon: '/static/icons/lng_flag_pl.svg',
  },
  {
    value: 'de',
    label: 'German',
    icon: '/static/icons/lng_flag_de.svg',
  },
  {
    value: 'fr',
    label: 'French',
    icon: '/static/icons/lng_flag_fr.svg',
  },
];

export default function LanguagePopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <LanguageOptionIcon
        ref={anchorRef}
        onClick={handleOpen}
        open
      >
        <img src={LANGS[0].icon} alt={LANGS[0].label} />
      </LanguageOptionIcon>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 180,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option) => (
            <MenuItem key={option.value} selected={option.value === LANGS[0].value} onClick={() => handleClose()}>
              <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />

              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </MenuPopover>
    </>
  );
}
