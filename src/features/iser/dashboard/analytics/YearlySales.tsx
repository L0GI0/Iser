import merge from 'lodash/merge';
import IserApexChart, { BaseOptionChart } from 'common/components/chart/IserApexChart';

// ----------------------------------------------------------------------

const CHART_DATA = [
  { name: '2021', data: [10, 41, 35, 240, 280, 320, 69, 91, 148, 231, 243, 530]  },
  { name: '2022', data: [42, 23, 35, 53, 65, 86, 69, 11, 130, 120, 222, 410] }];

const YearlySales = () => {
  const chartOptions = merge(BaseOptionChart(), {
    yaxis: {
      title: {
        text: "£ (Pounds)"
      }
    }
  });

  return <IserApexChart type="line" series={CHART_DATA} options={chartOptions} height={364}/>;
}

export default YearlySales;
