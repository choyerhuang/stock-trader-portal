import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

interface stockVariantProps {
    stockVariant: [number, number][];
    ticker: string,
    changeInPrice: number,
}

const StockChart = ({stockVariant, ticker, changeInPrice}: stockVariantProps) => {

    function getColor(changeInPrice: number) {
        return changeInPrice > 0 ? "green" : "red";
    }

    const color = getColor(changeInPrice);

    const title = ticker + " Stock Price";  
    const stockChartOptions = {
        chart: {
            backgroundColor: 'rgba(245, 245, 245, 0.9)'
        },
        rangeSelector: {
            enabled: false
        },
        title: {
        text: title
        },
        navigator: {
        enabled: false
        },
  
        series: [{
        name: title,
        data: stockVariant,
        tooltip: {
            valueDecimals: 2
        },
        color: color
        }]
    };
    return (
        <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'} options={stockChartOptions} />
    );
};

export default StockChart;