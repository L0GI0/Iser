import { useRef, useState } from 'react';
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton } from '@mui/material';
import MenuPopover from 'common/components/MenuPopover';
import styled from 'styled-components';
import { useTranslation } from "react-i18next";

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

const LanguageMenuPopover = styled(MenuPopover)(({ theme }) => ({
  marginTop: 1.5,
  marginLeft: 0.75,
  width: 180,
  '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
}))

// ----------------------------------------------------------------------

 export type Languages = 'en-GB' | 'pl' | 'de' | 'fr';

 export interface Language {
  value: Languages,
  label: string,
  icon: string,
}

export const languages:  Record<Languages, Omit<Language, 'value'>>  = {
  "en-GB": {
    label: 'English',
    icon: '/static/icons/lng_flag_en.svg',
  },
  "pl": {
    label: 'Polski',
    icon: '/static/icons/lng_flag_pl.svg',
  },
  "de": {
    label: 'Deutsch',
    icon: '/static/icons/lng_flag_de.svg',
  },
  "fr": {
    label: 'Français',
    icon: '/static/icons/lng_flag_fr.svg',
  }
}

export const LANGS: Language[] = [
  {
    value: 'en-GB',
    ...languages['en-GB']
  },
  {
    value: 'pl',
    label: 'Polski',
    icon: '/static/icons/lng_flag_pl.svg',
  },
  {
    value: 'de',
    label: 'Deutsch',
    icon: '/static/icons/lng_flag_de.svg',
  },
  {
    value: 'fr',
    label: 'Français',
    icon: '/static/icons/lng_flag_fr.svg',
  },
];

const getSelectedLanguage = (currentLanguage: string) => {
    const selectedLanguage = LANGS.find((language) => {
      return language.value === currentLanguage
    })
    return selectedLanguage || LANGS[0];
}

export default function LanguagePopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeLanguage = (targetLanguage: string) => {
    handleClose();
    i18n.changeLanguage(targetLanguage)
  }

  const { i18n } = useTranslation();

  return (
    <>
      <LanguageOptionIcon
        ref={anchorRef}
        onClick={handleOpen}
        open
      >
        <img src={getSelectedLanguage(i18n.language).icon} alt={getSelectedLanguage(i18n.language).label} />
      </LanguageOptionIcon>

      <LanguageMenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option) => (
            <MenuItem key={option.value} selected={option.value === i18n.language} onClick={() => changeLanguage(option.value)}>
              <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />
              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </LanguageMenuPopover>
    </>
  );
}
