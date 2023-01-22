import TotalVisits from './analytics/TotalVisits';
import YearlySales from './analytics/YearlySales';
import LabeledCard from 'common/components/Card/LabeledCard';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const DashboardView = () => {

  const { t } = useTranslation('analytics');

  return (
    <Container maxWidth={false} sx={{height: '100vh'}}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TotalVisits/>
        </Grid>
        <Grid item xs={12}>
          <LabeledCard title={t('chart_yearly_sales.label_yearly_sales')}>
            <YearlySales/>
          </LabeledCard>
        </Grid>

      </Grid>
    </Container>
  );
};

export default DashboardView;
