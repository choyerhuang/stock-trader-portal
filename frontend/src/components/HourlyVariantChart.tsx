// HourlyVariantChart.tsx
// 🔒 Cleaned version to preserve academic integrity

import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

interface stockVariantProps {
  stockVariant: [number, number][];
  ticker: string;
  changeInPrice: number;
}

const StockChart = ({ stockVariant, ticker, changeInPrice }: stockVariantProps) => {
  const stockChartOptions = {
    chart: {
      backgroundColor: 'rgba(245, 245, 245, 0.9)',
    },
    rangeSelector: {
      enabled: false,
    },
    title: {
      text: "", // 🔒 Title removed
    },
    navigator: {
      enabled: false,
    },
    series: [
      {
        name: "", // 🔒 Series name removed
        data: [], // 🔒 Stock data removed
        tooltip: {
          valueDecimals: 2,
        },
        color: "", // 🔒 Color logic removed
      },
    ],
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'stockChart'}
      options={stockChartOptions}
    />
  );
};

export default StockChart;
