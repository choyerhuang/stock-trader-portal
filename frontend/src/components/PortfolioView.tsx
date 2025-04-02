// PortfolioView.tsx (Cleaned version)
// 🚫 Core logic removed for academic integrity

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import styles from "../styles/Portfolio.module.css";
import { RxCross2 } from "react-icons/rx";
import stylesUtils from "../styles/utils.module.css";
import * as TradeApi from "../network/trade_api";
import * as SearchApi from "../network/search_api";
import { Portfolio as PortfolioModel } from '../models/Portfolio';
import { useNavigate } from 'react-router-dom';
import Portfolio from './Portfolio';

interface PortfolioInfoProps {
    ticker: string;
    Name: string;
    currentPrice: number;
    prevStockAmount: number;
    prevAverageCost: number;
    prevTotalCost: number;
}

interface WatchListProps {
    focusedButton: string;
    setFocusedButton: (buttonName: string) => void;
}

const PortfolioView = ({ focusedButton, setFocusedButton }: WatchListProps) => {
    const navigate = useNavigate();
    const [noDataFound, setNoDataFound] = useState(false);
    const [portfolioInfo, setPortfolioInfo] = useState<PortfolioInfoProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [budgetInfo, setBudgetInfo] = useState(0);
    const [tradeSuccessTicker, setTradeSuccessTicker] = useState("");
    const [showBuySuccess, setShowBuySuccess] = useState(false);
    const [showSellSuccess, setShowSellSuccess] = useState(false);

    // 🚫 Logic removed
    async function searchPortfolioInfo(portfolios: PortfolioModel[]) {
        // original logic removed
    }

    async function deletePortfolio(ticker: string) {
        // original logic removed
    }

    useEffect(() => {
        async function fetchData() {
            // original fetch logic removed
        }

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <Container>
                <Row>
                    <Col>
                        <h2 className={`d-block text-align-left ${styles.portfolioTitle}`}>My Portfolio</h2>
                    </Col>
                </Row>
                <div className={`${stylesUtils.flexCenter}`}>
                    <Spinner style={{ color: "black", fontSize: "36px", width: "60px", height: "60px" }} animation='border' />
                </div>
            </Container>
        );
    }

    const favoritesGrid = (
        <Row xs={1} md={1} xl={1} className={`g-4 ${styles.notesGrid}`}>
            {portfolioInfo.map(item => (
                <Col key={item.ticker}>
                    <Portfolio
                        onClicked={() => {}}
                        setBudgetInfo={setBudgetInfo}
                        deletePortfolio={deletePortfolio}
                        setTradeSuccessTicker={setTradeSuccessTicker}
                        setShowBuySuccess={setShowBuySuccess}
                        setShowSellSuccess={setShowSellSuccess}
                        onDeleteClicked={() => {}}
                        portfolio={item}
                        budgetInfo={budgetInfo}
                    />
                </Col>
            ))}
        </Row>
    );

    return (
        <Container>
            {showBuySuccess && (
                <Card className={`${styles.noDataCard}`}>
                    <div className={`${stylesUtils.flexCenter}`}>
                        <div>{tradeSuccessTicker} bought successfully.</div>
                        <div style={{ position: "absolute", right: "20px" }}>
                            <RxCross2 style={{ cursor: 'pointer' }} onClick={() => setShowBuySuccess(false)} />
                        </div>
                    </div>
                </Card>
            )}
            {showSellSuccess && (
                <Card className={`${styles.noDataCard}`}>
                    <div className={`${stylesUtils.flexCenter}`}>
                        <div>{tradeSuccessTicker} sold successfully.</div>
                        <div style={{ position: "absolute", right: "20px" }}>
                            <RxCross2 style={{ cursor: 'pointer' }} onClick={() => setShowSellSuccess(false)} />
                        </div>
                    </div>
                </Card>
            )}
            <Row>
                <Col>
                    <h2 className={`d-block text-align-left ${styles.portfolioTitle}`}>My Portfolio</h2>
                    <h2 className={`d-block text-align-left`} style={{ marginBottom: "60px" }}>
                        Money in Wallet: ${budgetInfo.toFixed(2)}
                    </h2>
                </Col>
            </Row>
            {noDataFound ? (
                <Card className={`${styles.noDataCard}`}>
                    <div className={`${stylesUtils.flexCenter}`}>
                        <div>Currently you don't have any stock.</div>
                        <div style={{ position: "absolute", right: "20px" }}>
                            <RxCross2 style={{ cursor: 'pointer' }} onClick={() => setNoDataFound(false)} />
                        </div>
                    </div>
                </Card>
            ) : (
                favoritesGrid
            )}
        </Container>
    );
};

export default PortfolioView;
