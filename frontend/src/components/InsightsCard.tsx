// InsightsCard.tsx
// 🔒 Cleaned version to preserve academic integrity

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

const InsightsCard = ({ companyName, insiderData, recommendationData, earningData }: InsightsCardProps) => {

    // 🔒 Cleaned: Removed chart computation logic

    const options: Highcharts.Options = {
        chart: { type: 'column', backgroundColor: 'rgba(245, 245, 245, 0.9)' },
        title: { text: 'Recommendation Trends', align: 'center', style: { whiteSpace: 'nowrap', fontSize: "18px" } },
        xAxis: { categories: [] }, // 🔒 removed dynamic content
        yAxis: { min: 0, title: { text: '#Analysis' } },
        tooltip: { shared: true },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: { enabled: true }
            }
        },
        series: [] // 🔒 Removed actual series data
    };

    const epsOptions: Highcharts.Options = {
        chart: { type: 'spline', backgroundColor: 'rgba(245, 245, 245, 0.9)' },
        title: { text: 'Historical EPS Surprises' },
        xAxis: { categories: [] }, // 🔒 removed
        yAxis: { title: { text: 'Quarterly EPS' } },
        tooltip: { crosshairs: true, shared: true },
        series: [] // 🔒 Removed series logic
    };

    return (
        <>
            <div className={styleResponse.table}>
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
                                <td style={{ fontWeight: "bold" }}>Total</td>
                                <td>{insiderData ? insiderData.totalMSPR : null}</td>
                                <td>{insiderData ? insiderData.totalChange : null}</td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: "bold" }}>Positive</td>
                                <td>{insiderData ? insiderData.positiveMSPR : null}</td>
                                <td>{insiderData ? insiderData.positiveChange : null}</td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: "bold" }}>Negative</td>
                                <td>{insiderData ? insiderData.negativeMSPR : null}</td>
                                <td>{insiderData ? insiderData.negativeChange : null}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", margin: "0 auto", marginTop: "20px" }}>
                <div className={styleResponse.insightHighCharts}>
                    <HighchartsReact highcharts={Highcharts} options={options} />
                </div>
                <div className={styleResponse.insightHighCharts}>
                    <HighchartsReact options={epsOptions} highcharts={Highcharts} />
                </div>
            </div>
        </>
    );
};

export default InsightsCard;
