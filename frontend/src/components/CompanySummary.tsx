// CompanySummary.tsx
// 🔒 Logic-heavy component cleaned to preserve academic integrity
// This file demonstrates stateful React with trading features, charts, and API integrations

import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

import stylesUtils from "../styles/utils.module.css";
import styles from "../styles/Portfolio.module.css";
import styleRespons from "../styles/CompanySearch.module.css";

import ScrollableTabs from "./ScrollableTabs";
import TradeDialog from "./TradeDialog";
import { ChartDataProps } from "../models/chart";
import { InsiderDataProps } from "../models/Insider";
import { Recommendation } from "../models/recommendation";
import { Earnings } from "../models/earnings";

interface CompanySummaryProps {
  stick: string;
  setAutoValue: React.Dispatch<React.SetStateAction<string>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setSearchSuccessState: React.Dispatch<React.SetStateAction<boolean>>;
  handleSearch: () => void;
  autoValue: string;
}

const CompanySummary = ({
  stick,
  setAutoValue,
  setSearchValue,
  setSearchSuccessState,
  autoValue,
  handleSearch,
}: CompanySummaryProps) => {
  const sticker = stick.toUpperCase();
  const { state } = useLocation();

  // 🔒 States kept, logic removed
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [logoURL, setLogoURL] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [changeInPrice, setChangeInPrice] = useState(0);
  const [priceChangePercent, setPriceChangePercent] = useState(0);
  const [isMarketOpen, setIsMarketOpen] = useState(false);
  const [chartData, setChartData] = useState<ChartDataProps | null>(null);
  const [insiderData, setInsiderData] = useState<InsiderDataProps | null>(null);
  const [recommendationData, setRecommendationData] = useState<Recommendation[]>([]);
  const [earnings, setEarnings] = useState<Earnings[]>([]);
  const [isStarClicked, setIsStarClicked] = useState(false);

  // 🔒 Main API logic and useEffects removed — contact me for more

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleStarClick = () => {
    // 🔒 Watchlist toggle logic omitted
    setIsStarClicked(prev => !prev);
  };

  if (isLoading) {
    return (
      <div className={stylesUtils.flexCenter}>
        <Spinner
          style={{ color: "black", fontSize: "36px", width: "60px", height: "60px" }}
          animation="border"
        />
      </div>
    );
  }

  return (
    <>
      <Row className={`flex-nowrap g-4 ${styles.SummaryTop}`}>
        <Col>
          <Card style={{ backgroundColor: "transparent", borderColor: "transparent" }}>
            <Card.Body className="d-flex flex-column align-items-center justify-content-start">
              <Card.Title className={styleRespons.ticker}>
                {sticker}
                {isStarClicked ? (
                  <FaStar
                    onClick={handleStarClick}
                    style={{
                      color: "rgba(251,221,1,255)",
                      cursor: "pointer",
                      marginLeft: "5px",
                    }}
                  />
                ) : (
                  <CiStar
                    onClick={handleStarClick}
                    style={{
                      cursor: "pointer",
                      marginLeft: "5px",
                    }}
                  />
                )}
              </Card.Title>
              <Card.Subtitle className={`mb-2 text-muted ${styleRespons.subticker}`}>{name}</Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card style={{ backgroundColor: "transparent", borderColor: "transparent" }}>
            <Card.Body className="d-flex flex-column align-items-center justify-content-start">
              <Card.Text>
                <img src={logoURL} alt={`${name} logo`} className={styleRespons.logo} />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card style={{ backgroundColor: "transparent", borderColor: "transparent" }}>
            <Card.Body className="d-flex flex-column align-items-center justify-content-start">
              <div className={styleRespons.currentPrice} style={{ color: changeInPrice > 0 ? 'green' : 'red' }}>
                {currentPrice.toFixed(2)}
              </div>
              <div className={styleRespons.changeInPrice} style={{ color: changeInPrice > 0 ? 'green' : 'red' }}>
                {changeInPrice < 0 ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
                {changeInPrice.toFixed(2)} ({priceChangePercent.toFixed(2)}%)
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* 🔒 Technical tab content cleaned */}
      <div style={{ position: "relative", top: "-30px" }}>
        <ScrollableTabs
          companyName={name}
          highPrice={0}
          lowPrice={0}
          openPrice={0}
          prevClose={0}
          ipoDate=""
          industry=""
          webURL=""
          ticker={sticker}
          isStockMarketOpen={isMarketOpen}
          chartData={chartData}
          earningData={earnings}
          stockVariant={[]}
          peers={[]}
          changeInPrice={changeInPrice}
          insiderData={insiderData}
          recommendationData={recommendationData}
          setAutoValue={setAutoValue}
          setSearchValue={setSearchValue}
          handleSearch={handleSearch}
        />
      </div>
    </>
  );
};

export default CompanySummary;
