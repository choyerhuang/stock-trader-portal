import { Button, Modal } from "react-bootstrap";
import { News } from "../models/news";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import * as TradeApi from "../network/trade_api"


interface PortfolioInfoProps {
    ticker: string,
    Name: string,
    currentPrice: number,
    prevStockAmount: number,
    prevAverageCost: number,
    prevTotalCost: number,
}

interface NewsDialogProps {
    budgetInfo: number,
    portfolio: PortfolioInfoProps,
    onDismiss: () => void,
    type: string,
    deletePortfolio: (ticker: string) => void,
    setBudgetInfo: React.Dispatch<React.SetStateAction<number>>,
    setTradeSuccessTicker: React.Dispatch<React.SetStateAction<string>>,
    setShowSellButton: React.Dispatch<React.SetStateAction<boolean>>,
    setShowBuySuccess: React.Dispatch<React.SetStateAction<boolean>>,
    setShowSellSuccess: React.Dispatch<React.SetStateAction<boolean>>,
}

const TradeDialog = ({ budgetInfo, portfolio, deletePortfolio, onDismiss, type, setBudgetInfo, setTradeSuccessTicker, setShowBuySuccess, setShowSellSuccess, setShowSellButton }: NewsDialogProps) => {
    const [inputValue, setInputValue] = useState("0");
    const [showNotEnoughMessage, setShowNotEnoughMessage ] = useState(false);
    


    function triggerTrade() {
        if (Number(inputValue) > 0) {
            if (type==="Buy"){
                const buySellProps = {
                    companyStick: portfolio.ticker,
                    stockPrice: portfolio.currentPrice,
                    amount: Number(inputValue),
                    prevAmount: portfolio.prevStockAmount,
                    prevCost: portfolio.prevTotalCost,
                }
                const response = TradeApi.buyStock(buySellProps);
                setBudgetInfo(budgetInfo-Number(inputValue) * portfolio.currentPrice);
                portfolio.prevStockAmount += Number(inputValue);
                portfolio.prevTotalCost += Number(inputValue) * portfolio.currentPrice;
                portfolio.prevAverageCost = portfolio.prevTotalCost / portfolio.prevStockAmount;
                setTradeSuccessTicker(portfolio.ticker);
                setShowBuySuccess(true);
                setShowSellButton(true);
            } else {
                const buySellProps = {
                    companyStick: portfolio.ticker,
                    stockPrice: portfolio.currentPrice,
                    amount: Number(inputValue),
                    prevAmount: portfolio.prevStockAmount,
                    prevCost: portfolio.prevTotalCost,
                }
                
                const response = TradeApi.sellStock(buySellProps);
                setBudgetInfo(budgetInfo+Number(inputValue) * portfolio.currentPrice);
                portfolio.prevStockAmount -= Number(inputValue);
                portfolio.prevTotalCost -= Number(inputValue) * portfolio.currentPrice;
                portfolio.prevAverageCost = portfolio.prevTotalCost / portfolio.prevStockAmount;
                if(portfolio.prevStockAmount == 0) {
                    deletePortfolio(portfolio.ticker);
                }
                setTradeSuccessTicker(portfolio.ticker);
                setShowSellSuccess(true);

            }
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Allow only input that is empty (to clear the field) or numeric
        if (e.target.value === "" || /^[0-9]+$/.test(e.target.value)) {
          setInputValue(e.target.value);
          if (type === "Buy") {
            const quant = Number(e.target.value);
            const cost = Number(quant * portfolio.currentPrice)
            if (cost > budgetInfo) {
                setShowNotEnoughMessage(true);
                
            } else {
                setShowNotEnoughMessage(false);
            }
          } else {
            const quant = Number(e.target.value);
            if (quant > portfolio.prevStockAmount) {
                setShowNotEnoughMessage(true);
            } else {
                setShowNotEnoughMessage(false);
            }
          }
        }
      };



    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <div>{portfolio.ticker}</div>         
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div>Current Price: {portfolio.currentPrice}</div>
                <div>Money in Wallet: ${Number(budgetInfo.toFixed(2))}</div>
                <div style={{display: "flex" ,whiteSpace: "nowrap"}}> Quantity:&nbsp; &nbsp;  
                <form>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Enter your quantity"
                    />
                </form>
                </div>
                {showNotEnoughMessage &&
                    (type === "Buy"
                    ? <div style={{color: "red"}}>Not enough money in wallet!</div> 
                    : <div style={{color: "red"}}>You cannot sell the stocks that you don't have!</div> )
                }
                
            </Modal.Body>
            <Modal.Footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <div style={{ textAlign: 'left' }}>Total:&nbsp;&nbsp; {Number((Number(inputValue)*portfolio.currentPrice).toFixed(2))} </div>
                <Button type="submit"
                form="addEditNoteForm"
                style={{backgroundColor: "green"}}
                disabled={showNotEnoughMessage||inputValue==="0"||inputValue===""}
                onClick={() => {
                    triggerTrade();
                    onDismiss(); 
                  }}
                >
                    {type}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default TradeDialog;