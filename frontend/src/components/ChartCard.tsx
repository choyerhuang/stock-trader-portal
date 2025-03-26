import React, { useEffect } from 'react';
import Highcharts from 'highcharts/highstock';
import VBP from 'highcharts/indicators/volume-by-price';
import SMA from 'highcharts/indicators/indicators';
import moreIndicators from 'highcharts/indicators/indicators-all';
import { ChartDataProps } from '../models/chart';

interface ChartCardProps {
    chartData: ChartDataProps | null,
    ticker: string,
}


const ChartCard = ({chartData, ticker}: ChartCardProps) => {
    SMA(Highcharts);
    VBP(Highcharts);
    moreIndicators(Highcharts);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const ohlc: number[][] = chartData?.priceList.map(pd => [
            pd[0],
            pd[1],
            pd[2],
            pd[3],
            pd[4],
          ]) ?? [];
        const volume: number[][] = chartData?.volumeList.map(pd => [
            pd[0],
            pd[1],
          ]) ?? [];
        const groupingUnits: [string, number[]][] = [
          ['week', [1]], 
          ['month', [1, 2, 3, 4, 6]],
        ];
        
        if (ohlc.length && volume.length) {
          Highcharts.stockChart('container', {
            chart: {
                backgroundColor: 'rgba(245, 245, 245, 0.9)' 
            },
            rangeSelector: { selected: 2 },
            title: { text: `${ticker} Historical`},
            subtitle: { text: 'With SMA and Volume by Price technical indicators' },
            yAxis: [
              {
                startOnTick: false,
                endOnTick: false,
                labels: { align: 'right', x: -3 },
                title: { text: 'OHLC' },
                height: '60%',
                lineWidth: 2,
                resize: { enabled: true },
              },
              {
                labels: { align: 'right', x: -3 },
                title: { text: 'Volume' },
                top: '65%',
                height: '35%',
                offset: 0,
                lineWidth: 2,
              },
            ],
            tooltip: { split: true },
            plotOptions: { series: { dataGrouping: { units: groupingUnits } } },
            series: [
              { type: 'candlestick', name: 'AAPL', id: 'aapl', zIndex: 2, data: ohlc },
              { type: 'column', name: 'Volume', id: 'volume', data: volume, yAxis: 1 },
              { type: 'vbp', linkedTo: 'aapl', params: { volumeSeriesID: 'volume' }, dataLabels: { enabled: false }, zoneLines: { enabled: false } },
              { type: 'sma', linkedTo: 'aapl', zIndex: 1, marker: { enabled: false } },
            ],
          });
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };
    
    fetchData();
  }, []);

  return <div style={{marginTop: "10px"}} id="container"></div>;
};

export default ChartCard;