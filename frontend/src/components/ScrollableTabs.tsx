import React from "react";
import { Tabs, Tab } from "react-tabs-scrollable";
import "react-tabs-scrollable/dist/rts.css";
import "./mui-tabs.css";
import SummaryCard from "./SummaryCard";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import NewsCard from "./NewsCard";
import ChartCard from "./ChartCard";
import { ChartDataProps } from "../models/chart";
import InsightsCard from "./InsightsCard";
import { InsiderDataProps } from "../models/Insider";
import { Recommendation } from "../models/recommendation";
import { Earnings } from "../models/earnings";

interface SummaryProps {
    companyName: string,
    highPrice: number,
    lowPrice: number,
    openPrice: number,
    prevClose: number,
    ipoDate: string,
    industry: string,
    webURL: string,
    changeInPrice: number,
    ticker: string,
    isStockMarketOpen: boolean,
    chartData: ChartDataProps | null,
    earningData: Earnings[],
    stockVariant: [number, number][],
    peers: string[],
    insiderData : InsiderDataProps | null,
    recommendationData: Recommendation[],
    setAutoValue: React.Dispatch<React.SetStateAction<string>>,
    setSearchValue: React.Dispatch<React.SetStateAction<string>>,
    handleSearch: () => void,
}


const ScrollableTabs  = ({companyName, highPrice, lowPrice, openPrice, prevClose, ipoDate, industry, changeInPrice, webURL, ticker, isStockMarketOpen, chartData, earningData, insiderData, recommendationData, stockVariant, peers, setAutoValue, setSearchValue, handleSearch}: SummaryProps) => {
  const [activeTab, setActiveTab] = React.useState(0);

  const onTabClick = (index: number) => {
    setActiveTab(index);
  };

  // Create an array of content for the tabs
  const tabContent = ["Summary", "Top News", "Charts", "Insights"];

  return (
    <>
    <div 
    style={{fontFamily:"sans-serif", textAlign: "center"}}
    >
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Tabs
      activeTab={activeTab} 
      onTabClick={(e, index) => onTabClick(index)} 
      hideNavBtnsOnMobile={false}
      navBtnClassName="justify-content-md-center"
      leftBtnIcon={<FiChevronLeft size={"1.5em"} />}
      rightBtnIcon={<FiChevronRight size={"1.5em"} />}
      >
        
        {tabContent.map((content, index) => (
        <Tab 
          key={index} 
          className={`text-center`}>
            <div 
            style={{fontSize:"18px", width: "12.3vw", minWidth: "150px", color: activeTab === index ? 'black' : 'gray'}}>
                {content}
            </div>
            
          </Tab>
        ))}
      </Tabs>
      </div>

      {activeTab === 0 &&
        <SummaryCard highPrice={highPrice} lowPrice={lowPrice} openPrice={openPrice}
        prevClose={prevClose} ipoDate={ipoDate} industry={industry} webURL={webURL}     
        stockVariant={stockVariant} peers={peers}
        ticker={ticker} changeInPrice={changeInPrice} isStockMarkterOpen={isStockMarketOpen} setAutoValue={setAutoValue} setSearchValue={setSearchValue} handleSearch={handleSearch}/>
      }

      {activeTab === 1 &&
        <NewsCard ticker={ticker}/>
      }

      {activeTab === 2 &&
        <ChartCard chartData={chartData} ticker={ticker}/>
      } 

      {activeTab === 3 &&
      
        <InsightsCard companyName={companyName} insiderData={insiderData} recommendationData={recommendationData} earningData={earningData}/>
      } 
      </div>  
    </>
  );
};

export default ScrollableTabs ;