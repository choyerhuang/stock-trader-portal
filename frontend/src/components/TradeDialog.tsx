import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";

interface PortfolioInfoProps {
  ticker: string;
  Name: string;
  currentPrice: number;
  prevStockAmount: number;
  prevAverageCost: number;
  prevTotalCost: number;
}

interface TradeDialogProps {
  budgetInfo: number;
  portfolio: PortfolioInfoProps;
  onDismiss: () => void;
  type: string; // "Buy" or "Sell"
  deletePortfolio: (ticker: string) => void;
  setBudgetInfo: React.Dispatch<React.SetStateAction<number>>;
  setTradeSuccessTicker: React.Dispatch<React.SetStateAction<string>>;
  setShowSellButton: React.Dispatch<React.SetStateAction<boolean>>;
  setShowBuySuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSellSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const TradeDialog = ({
  budgetInfo,
  portfolio,
  onDismiss,
  type,
}: TradeDialogProps) => {
  const [inputValue, setInputValue] = useState("0");
  const [showWarning, setShowWarning] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]+$/.test(value)) {
      setInputValue(value);
      // 🛑 Validation logic removed
    }
  };

  const handleTrade = () => {
    // 🔒 Trade execution logic intentionally removed
    // Example: API calls, portfolio math, success handling

    onDismiss(); // Close modal
  };

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{portfolio.ticker}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>Current Price: {portfolio.currentPrice}</div>
        <div>Money in Wallet: ${Number(budgetInfo.toFixed(2))}</div>
        <div style={{ display: "flex", whiteSpace: "nowrap" }}>
          Quantity:&nbsp;&nbsp;
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter your quantity"
          />
        </div>
        {showWarning && (
          <div style={{ color: "red" }}>
            {type === "Buy"
              ? "Not enough money in wallet!"
              : "You cannot sell stocks you don't own!"}
          </div>
        )}
      </Modal.Body>

      <Modal.Footer style={{ justifyContent: "space-between" }}>
        <div>
          Total:&nbsp;&nbsp;
          {Number((Number(inputValue) * portfolio.currentPrice).toFixed(2))}
        </div>
        <Button
          disabled={showWarning || inputValue === "0" || inputValue === ""}
          style={{ backgroundColor: "green" }}
          onClick={handleTrade}
        >
          {type}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TradeDialog;
