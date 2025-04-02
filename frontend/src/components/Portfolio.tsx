// Portfolio.tsx
// 🚫 Business logic removed to comply with academic integrity

import { Card, Button } from "react-bootstrap";
import { useState } from "react";
import styles from "../styles/Portfolio.module.css";
import { RxCross2 } from "react-icons/rx";
import TradeDialog from "./TradeDialog";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";

interface PortfolioInfoProps {
    ticker: string;
    Name: string;
    currentPrice: number;
    prevStockAmount: number;
    prevAverageCost: number;
    prevTotalCost: number;
}

interface PortfolioProps {
    budgetInfo: number;
    portfolio: PortfolioInfoProps;
    onClicked: (portfolio: PortfolioInfoProps) => void;
    onDeleteClicked: (portfolio: PortfolioInfoProps) => void;
    className?: string;
    deletePortfolio: (ticker: string) => void;
    setBudgetInfo: React.Dispatch<React.SetStateAction<number>>;
    setTradeSuccessTicker: React.Dispatch<React.SetStateAction<string>>;
    setShowBuySuccess: React.Dispatch<React.SetStateAction<boolean>>;
    setShowSellSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const Portfolio = ({
    budgetInfo,
    portfolio,
    deletePortfolio,
    onClicked,
    onDeleteClicked,
    setBudgetInfo,
    setTradeSuccessTicker,
    setShowBuySuccess,
    setShowSellSuccess,
}: PortfolioProps) => {
    const [showTradeDialog, setShowTradeDialog] = useState(false);
    const [tradeDialogType, setTradeDialogType] = useState("Buy");
    const [showSellButton, setShowSellButton] = useState(false);

    return (
        <>
            <Card onClick={() => onClicked(portfolio)} className={`${styles.noteCard} ${styles.portfolio}`}>
                <Card.Header>
                    {/* Ticker and Name display removed */}
                </Card.Header>

                <Card.Body className={styles.cardBody}>
                    {/* Portfolio metric table removed */}
                </Card.Body>

                <Card.Footer>
                    <Button
                        onClick={() => {
                            setTradeDialogType("Buy");
                            setShowTradeDialog(true);
                        }}
                        variant="primary"
                    >
                        Buy
                    </Button>
                    <Button
                        onClick={() => {
                            setTradeDialogType("Sell");
                            setShowTradeDialog(true);
                        }}
                        variant="primary"
                    >
                        Sell
                    </Button>
                </Card.Footer>
            </Card>

            {showTradeDialog && (
                <TradeDialog
                    setBudgetInfo={setBudgetInfo}
                    deletePortfolio={deletePortfolio}
                    budgetInfo={budgetInfo}
                    type={tradeDialogType}
                    onDismiss={() => setShowTradeDialog(false)}
                    portfolio={portfolio}
                    setTradeSuccessTicker={setTradeSuccessTicker}
                    setShowBuySuccess={setShowBuySuccess}
                    setShowSellSuccess={setShowSellSuccess}
                    setShowSellButton={setShowSellButton}
                />
            )}
        </>
    );
};

export default Portfolio;
