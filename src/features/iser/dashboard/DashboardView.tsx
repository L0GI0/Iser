import TotalVisits from './analytics/TotalVisits';
import YearlySales from './analytics/YearlySales';
import LabeledCard from 'common/components/Card/LabeledCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


// ----------------------------------------------------------------------

const DashboardView = () => {

  return (
    <Container maxWidth={false}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TotalVisits/>
        </Grid>
        <Grid item xs={12}>
          <LabeledCard title="Yearly sales">
            <YearlySales/>
          </LabeledCard>
        </Grid>

      </Grid>
    </Container>
  );
};

export default DashboardView;
