import React from 'react';
import '../styles/insights.module.css';
import styleResponse from "../styles/responsiveDesign.module.css";
import { InsiderDataProps } from '../models/Insider';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Recommendation } from '../models/recommendation';
import { Earnings } from '../models/earnings';

interface InsightsCardProps {
    companyName: string,
    insiderData: InsiderDataProps | null,
    recommendationData: Recommendation[],
    earningData: Earnings[],
}

interface CustomTooltipOptions extends Highcharts.TooltipOptions {
    crosshairs?: boolean;
}

interface handleEarningProps {
    categories: string[],
    actualData: number[],
    estimateData: number[],
}

function handleEarningData(earningData: Earnings[]) {
    const categories: string[] = [];
    const actualData: number[] = [];
    const estimateData: number[] = [];
    for (let i=0; i< earningData.length; i++){
        categories.push(`${earningData[i].period}<br>Surprise: ${earningData[i].surprise}`);
        actualData.push(earningData[i].actual);
        estimateData.push(earningData[i].estimate);
    }
    return {categories: categories, actualData: actualData, estimateData: estimateData};
}


const InsightsCard = ({companyName, insiderData, recommendationData, earningData}: InsightsCardProps) => {

    const period : string[] = recommendationData.map(item => item.period?.slice(0, 7) as string);
    const strongBuy: number[] = recommendationData.map(item => item.strongBuy ?? 0 );
    const buy: number[] = recommendationData.map(item => item.buy ?? 0 );
    const hold: number[] = recommendationData.map(item => item.hold ?? 0);
    const sell: number[] = recommendationData.map(item => item.sell ?? 0);
    const strongSell: number[] = recommendationData.map(item => item.strongSell ?? 0);

    const handleEarning: handleEarningProps = handleEarningData(earningData);

    const options: Highcharts.Options = {
        chart: {
            type: 'column',
            backgroundColor: 'rgba(245, 245, 245, 0.9)'
        },
        title: {
            text: 'Recommendation Trends',
            align: 'center',
            style: {
                whiteSpace: 'nowrap',
                fontSize: "18px"
            }
        },
        xAxis: {
            categories: period
        },
        yAxis: {
            min: 0,
            title: {
                text: '#Analysis'
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                }
            }
        },
        colors: ['#1a6334', '#34ae51', '#b07e29', '#f38482'], 
        series: [{
            type: 'column', 
            name: 'Strong Buy',
            data: strongBuy
        }, {
            type: 'column', 
            name: 'Buy',
            data: buy
        }, {
            type: 'column', 
            name: 'Hold',
            data: hold
        }, {
            type: 'column', 
            name: 'Sell',
            data: sell
        },{
            type: 'column', 
            name: 'Strong Sell',
            data: strongSell
        }]
    };

    const epsOptions: Highcharts.Options = {
        chart: {
            type: 'spline',
            backgroundColor: 'rgba(245, 245, 245, 0.9)'
        },
        title: {
            text: 'Historical EPS Surprises'
        },
        xAxis: {
            categories: handleEarning.categories,
        },
        yAxis: {
            title: {
                text: 'Quarterly EPS'
            },
            labels: {
                format: '{value}'
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        } as CustomTooltipOptions,
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: [{
            type: 'spline',
            name: 'Actual',
            marker: {
                symbol: 'circle'
            },
            data: handleEarning.actualData,
    
        }, {
            type: 'spline',
            name: 'Estimate',
            marker: {
                symbol: 'diamond'
            },
            data: handleEarning.estimateData
        }, ]
    };
    return (
    <>
        <div 
        className={styleResponse.table}>
            <div className="table-container">
            <table>
                <thead>
                <tr>
                    <th>{companyName}</th>
                    <th>MSPR</th>
                    <th>Change</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td style={{fontWeight: "bold"}}>Total</td>
                    <td>{insiderData ? Number(insiderData.totalMSPR.toFixed(2)) : null}</td>
                    <td>{insiderData ? Number(insiderData.totalChange.toFixed(2)) : null}</td>
                </tr>
                <tr>
                    <td style={{fontWeight: "bold"}}>Positive</td>
                    <td>{insiderData ? Number(insiderData.positiveMSPR.toFixed(2)) : null}</td>
                    <td>{insiderData ? Number(insiderData.positiveChange.toFixed(2)) : null}</td>
                </tr>
                <tr>
                    <td style={{fontWeight: "bold"}}>Negative</td>
                    <td>{insiderData ? Number(insiderData.negativeMSPR.toFixed(2)) : null}</td>
                    <td>{insiderData ? Number(insiderData.negativeChange.toFixed(2)) : null}</td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", margin: "0 auto", marginTop: "20px" }}>
            <div 
            className={styleResponse.insightHighCharts}>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
            <div 
            className={styleResponse.insightHighCharts}>
                <HighchartsReact options={epsOptions} highcharts={Highcharts} />
            </div>
        </div>
    </>
  );
};

export default InsightsCard;