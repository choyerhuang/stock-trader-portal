import { Card, Button } from "react-bootstrap";
import { useState } from "react";
import styles from "../styles/Portfolio.module.css"
import { RxCross2 } from "react-icons/rx";
import TradeDialog from "./TradeDialog";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";


interface PortfolioInfoProps {
    ticker: string,
    Name: string,
    currentPrice: number,
    prevStockAmount: number,
    prevAverageCost: number,
    prevTotalCost: number,
}

interface PortfolioProps {
    budgetInfo: number,
    portfolio: PortfolioInfoProps,
    onClicked: (portfolio: PortfolioInfoProps) => void,
    onDeleteClicked: (portfolio: PortfolioInfoProps) => void,
    className?: string
    deletePortfolio: (ticker: string)=> void,
    setBudgetInfo: React.Dispatch<React.SetStateAction<number>>,
    setTradeSuccessTicker: React.Dispatch<React.SetStateAction<string>>,
    setShowBuySuccess: React.Dispatch<React.SetStateAction<boolean>>,
    setShowSellSuccess: React.Dispatch<React.SetStateAction<boolean>>,
}

const Portfolio = ({ budgetInfo, portfolio, deletePortfolio ,onClicked, onDeleteClicked, setBudgetInfo, setTradeSuccessTicker, setShowBuySuccess, setShowSellSuccess }: PortfolioProps) => {

    const [ showTradeDialog, setShowTradeDialog ] = useState(false);
    const [ tradeDialogType, setTradeDialogType ] = useState("Buy");
    const [ showSellButton, setShowSellButton ] = useState(false);

    return (
        <>
        <Card 
            onClick = {()=> onClicked(portfolio)}
            className={`${styles.noteCard} ${styles.portfolio}`}
            >
            <Card.Header  style={{ display: 'flex', flexWrap: 'nowrap', whiteSpace: 'nowrap'}}>
                <div style={{marginRight: "10px", fontSize: "20px", fontWeight: "bold"}}>{`${portfolio.ticker}`}</div><div style={{marginTop: "5px"}} className="text-muted">{portfolio.Name}</div>
            </Card.Header>
            <Card.Body className={styles.cardBody} >
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Card.Text style={{ flex: "1 1 auto", minWidth: "50%", display: 'flex', flexWrap: 'nowrap', whiteSpace: 'nowrap', margin: "0px" }} className={`${styles.cardText}`}>
                        <div style={{ flex: 1, minWidth: "250px"}}>
                            <span style={{ fontSize: "20px", fontWeight: "bold" }} >Quantity:</span>
                            <span style={{ display: 'block', wordWrap: 'break-word', fontSize: "20px", fontWeight: "bold" }}>Avg. Cost / Share:</span>
                            <span style={{ display: 'block', wordWrap: 'break-word', fontSize: "20px", fontWeight: "bold" }}>Total Cost:</span>
                        </div>
                        <div style={{ flex: 1 }}>
                            <span className={styles.portfolioNumber}>{portfolio.prevStockAmount.toFixed(2)}</span>
                            <span className={styles.portfolioNumber} style={{ display: 'block', wordWrap: 'break-word'}}>{portfolio.prevAverageCost.toFixed(2)}</span>
                            <span className={styles.portfolioNumber} style={{ display: 'block', wordWrap: 'break-word'}}>{portfolio.prevTotalCost.toFixed(2)}</span>
                        </div>
                    </Card.Text>
                    <Card.Text style={{ flex: "1 1 auto", minWidth: "50%", display: 'flex', flexWrap: 'nowrap', whiteSpace: 'nowrap' }} className={`${styles.cardText}`}>
                        <div style={{ flex: 1, minWidth: "250px" }}>
                            <span style={{ fontSize: "20px", fontWeight: "bold"}}>Change:</span>
                            <span style={{ display: 'block', wordWrap: 'break-word', fontSize: "20px", fontWeight: "bold" }}>Current Price:</span>
                            <span style={{ display: 'block', wordWrap: 'break-word', fontSize: "20px", fontWeight: "bold" }}>Market Value:</span>
                        </div>
                        <div style={{ flex: 1 }}>
                            <span className={styles.portfolioNumber} style={{color: (portfolio.currentPrice * portfolio.prevStockAmount - portfolio.prevTotalCost) > 0 ? 'green' : 'red'}}>{(portfolio.currentPrice * portfolio.prevStockAmount - portfolio.prevTotalCost) < 0 ? <TiArrowSortedDown />: <TiArrowSortedUp/>} {(portfolio.currentPrice * portfolio.prevStockAmount - portfolio.prevTotalCost).toFixed(2)}</span>
                            <span className={styles.portfolioNumber} style={{color: (portfolio.currentPrice * portfolio.prevStockAmount - portfolio.prevTotalCost) > 0 ? 'green' : 'red', display: 'block', wordWrap: 'break-word'}}>{portfolio.currentPrice.toFixed(2)}</span>
                            <span className={styles.portfolioNumber} style={{color: (portfolio.currentPrice * portfolio.prevStockAmount - portfolio.prevTotalCost) > 0 ? 'green' : 'red', display: 'block', wordWrap: 'break-word'}}>{(portfolio.currentPrice * portfolio.prevStockAmount).toFixed(2)}</span>
                        </div>
                    </Card.Text>                                       
                </div>    
                         
            </Card.Body>
            <Card.Footer style={{ display: 'flex', flexWrap: 'nowrap', whiteSpace: 'nowrap'}}> 
                <Button onClick={()=> {setTradeDialogType("Buy"); setShowTradeDialog(true)}} variant="primary" style={{ backgroundColor: 'rgba(43,110,253,255)', border: 'none', marginRight: "10px" }}>Buy</Button>
                <Button onClick={()=> {setTradeDialogType("Sell"); setShowTradeDialog(true)}} variant="primary" style={{ backgroundColor: 'rgba(220,52,69,255)', border: 'none' }}>Sell</Button>
            </Card.Footer>   
        </Card>

        { showTradeDialog &&
            <TradeDialog 
            setBudgetInfo={setBudgetInfo} deletePortfolio={deletePortfolio} budgetInfo={budgetInfo} type={tradeDialogType} 
            onDismiss={()=> {setShowTradeDialog(false)}} portfolio={portfolio} setTradeSuccessTicker = {setTradeSuccessTicker}
            setShowBuySuccess = {setShowBuySuccess} setShowSellSuccess = {setShowSellSuccess} setShowSellButton={setShowSellButton}/>
        }
        </>
    )
}

export default Portfolio;