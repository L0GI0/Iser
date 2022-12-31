
import { Box, Button, Typography, Stack } from '@mui/material';
import Iconify from "common/components/Iconify";
import { TFunction } from 'react-i18next';

// ----------------------------------------------------------------------

interface SidebarFooterProps {
  t: TFunction<'dashboard'>
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({t}) => {

  return (<Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
    <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
      <Box
        component="img"
        src="/static/illustrations/illustration_logio_av.png"
        sx={{ width: 100, position: 'absolute', top: -50 }}
      />
      <Box sx={{ textAlign: 'center' }}>
        <Typography gutterBottom variant="h6">
          {t('contact_section.text_contact_me')}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Michal Pabjan
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          048 721 546 994
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
      <Button sx={{ margin: 0 }}startIcon={<Iconify icon={'akar-icons:github-fill'} />} href="https://github.com/L0GI0" target="_blank" variant="contained">
        Github
      </Button>
      <Button startIcon={<Iconify icon={'akar-icons:linkedin-box-fill'}/>}href="" target="_blank" variant="contained">
        Linkedin
      </Button>
      </Box>
    </Stack>
  </Box>)
}

export default SidebarFooter;
