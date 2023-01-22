import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import Avatar from 'common/components/Avatar';
import Iconify from 'common/components/Iconify';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const TotalVisitsLinearProgresss = styled(LinearProgress)(({theme}) => ({
  height: 10,
  '&&.MuiLinearProgress-colorPrimary': { backgroundColor: theme.palette.primary.main },
  '& .MuiLinearProgress-bar': {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: theme.palette.warning.main
  }
}));

// ----------------------------------------------------------------------

const TotalVisits = () => {

  const { t } = useTranslation('analytics');

  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 6.5, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant='body2'>{t('chart_total_visits.label_total_visits')}</Typography>
            <Typography variant='h6'>42.5k</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: 'success.main' } }}>
            <Typography variant='subtitle2' sx={{ color: 'success.main' }}>
              +18.4%
            </Typography>
            <Iconify icon='mdi:chevron-up'/>
          </Box>
        </Box>
        <Box sx={{ mb: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 2.5, display: 'flex', alignItems: 'center' }}>
              <Avatar
                skin='main'
                color='warning'
                variant='rounded'
                sx={{ mr: 1.5, height: 24, width: 24, borderRadius: '6px' }}
              >
                <Iconify icon='mdi:cellphone' sx={{width: '20px'}}/>
              </Avatar>
              <Typography variant='body2'>
                {t('chart_total_visits.label_mobile')}
              </Typography>
            </Box>
            <Typography variant='h6'>23.5%</Typography>
            <Typography variant='caption' sx={{ color: 'text.disabled' }}>
              2,890
            </Typography>
          </Box>
          <Divider flexItem sx={{ m: 0 }} orientation='vertical'>
            <Avatar
              skin='main'
              color='secondary'
              sx={{ height: 24, width: 24, fontSize: '0.6875rem', color: 'text.secondary' }}
            >
              VS
            </Avatar>
          </Divider>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
            <Box sx={{ mb: 2.5, display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ mr: 1.5 }} variant='body2'>
                {t('chart_total_visits.label_desktop')}
              </Typography>
              <Avatar skin='dark' variant='rounded' sx={{ height: 24, width: 24, borderRadius: '6px' }}>
                <Iconify icon='mdi:monitor' sx={{width: '16px'}} />
              </Avatar>
            </Box>
            <Typography variant='h6'>76.5%</Typography>
            <Typography variant='caption' sx={{ color: 'text.disabled' }}>
              22,465
            </Typography>
          </Box>
        </Box>
        <TotalVisitsLinearProgresss
          value={24}
          variant='determinate'
        />
      </CardContent>
    </Card>
  )
}

export default TotalVisits
