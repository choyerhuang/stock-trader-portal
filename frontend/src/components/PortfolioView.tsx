import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import styles from "../styles/Portfolio.module.css"
import { RxCross2 } from "react-icons/rx";
import stylesUtils from "../styles/utils.module.css"
import * as TradeApi from "../network/trade_api";
import * as SearchApi from "../network/search_api";
import { Portfolio as PortfolioModel } from '../models/Portfolio';
import { useNavigate } from 'react-router-dom';
import Portfolio from './Portfolio';

interface PortfolioInfoProps {
    ticker: string,
    Name: string,
    currentPrice: number,
    prevStockAmount: number,
    prevAverageCost: number,
    prevTotalCost: number,
}

interface WatchListProps {
    focusedButton: string,
    setFocusedButton: (buttonName: string) => void;
}

const PortfolioView = ({focusedButton, setFocusedButton}: WatchListProps) => {

    const navigate = useNavigate();
    const [ noDataFound, setNoDataFound ] = useState(false);
    const [ portfolioInfo, setPortfolioInfo ] = useState<PortfolioInfoProps[]>([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ budgetInfo, setBudgetInfo ] = useState(25000);
    const [ tradeSuccessTicker, setTradeSuccessTicker ] = useState("");
    const [ showBuySuccess, setShowBuySuccess ] = useState(false);
    const [ showSellSuccess, setShowSellSuccess ] = useState(false);

    
    async function searchPortfolioInfo (portfolios: PortfolioModel[]) {
        const PortfolioInfo: PortfolioInfoProps[] = [];
        
        for (let item of portfolios || []) {
            const responseAbstract = await SearchApi.SearchStock(item.companyStick || "" , "abstract", true);
            const responsePrice = await SearchApi.SearchStock(item.companyStick || "", "price", true);
            
            if (!Object.keys(responseAbstract).length) {
                console.log("Response Abstract is empty");
            } else {
                if (!Object.keys(responsePrice).length) {
                    console.log("Response Price is empty");
                } else {
                    PortfolioInfo.push({
                        ticker: item.companyStick || "",
                        Name: responseAbstract.name || "",
                        currentPrice: responsePrice.c || 0,
                        prevStockAmount: item.stockAmount || 0,
                        prevAverageCost: item.averageCost || 0,
                        prevTotalCost: item.totalCost || 0,
                    });  
                }    
            }
        }
        setPortfolioInfo(PortfolioInfo);
    } 

    // function buyStock(){

    // }

    // const handleClick = (item: FavoriteInfoProps ) => {
    //     sessionStorage.setItem("focusedButton", "search");
    //     setFocusedButton("search");
    //     navigate("/", {state: { ticker: item.ticker, triggerRouteSearch: true}})
    // }

    // async function deleteFavorite(favorite: FavoriteInfoProps){
    //     try {
    //         await FavoriteApi.deleteFavorite(favorite.ticker);
    //         setFavoriteInfo(favoriteInfo.filter(existingNote=> existingNote.ticker !== favorite.ticker))
    //         if (favoriteInfo.length === 0) {setNoDataFound(true);}
    //     } catch (error) {
    //         console.error("Delete favorite Error: " + error);
    //     }
    // }

    async function deletePortfolio(ticker: string){
        try {
            setPortfolioInfo(portfolioInfo.filter(existingNote=> existingNote.ticker !== ticker))
            const port = portfolioInfo.filter(existingNote=> existingNote.ticker !== ticker);
            if (port.length === 0) {
                setNoDataFound(true);}
        } catch (error) {
            console.error("Delete favorite Error: " + error);
        }
    }    
    
    useEffect(()=> {
        async function getPortfolios(): Promise<PortfolioModel[]> {
            try {
                const trades = await TradeApi.fetchPortfolio();
                if(!Object.keys(trades).length) {
                    setNoDataFound(true);                   
                } else {
                    setNoDataFound(false);
                    return trades;
                }
            } catch (error) {
                console.log("Get Favorites Failed, Error: " + error)
            }
            return [];
        }

        async function getBudget() {
            try {
                const budget = await TradeApi.fetchBudget();
                if(!Object.keys(budget).length) {
                    console.log("Budget Response is empty.");
                } else {
                    return budget;
                }                
            } catch (error) {
                console.log(error);
            }
        }

        const fetchData = async() => {
            const portfolio = await getPortfolios();
            const budget = await getBudget();
            await setBudgetInfo(budget[0].budget);
            await searchPortfolioInfo(portfolio);
            setIsLoading(false)
        }
        
        fetchData();

    }, [])
    if (isLoading) {
        return (
            <>
            <Container>
                <Row>
                    <Col>
                        <h2 className={`d-block text-align-left ${styles.portfolioTitle}`}>My Portfolio</h2>
                    </Col>
                </Row>
                <div className={`${stylesUtils.flexCenter}`} >  
                    <Spinner style={{color: "black", fontSize: "36px", width: "60px", height: "60px"}} animation='border' />
                </div>   
            </Container>        
            </>
        );

    }

    const favoritesGrid =
    <Row xs={1} md={1} xl={1} className={`g-4 ${styles.notesGrid}`}>
        {portfolioInfo.map(item => (
            <Col key={item.ticker}>
                <Portfolio onClicked={()=>{}}
                setBudgetInfo={setBudgetInfo}
                deletePortfolio={deletePortfolio}
                setTradeSuccessTicker = {setTradeSuccessTicker}
                setShowBuySuccess = {setShowBuySuccess}
                setShowSellSuccess = {setShowSellSuccess}
                onDeleteClicked={()=>{}} 
                portfolio={item}
                budgetInfo={budgetInfo}/>
            </Col>
        ))}
    </Row>

    return (
        <>
        <Container>
            { showBuySuccess &&
                 <Card className={`${styles.noDataCard}`} style={{height: "50px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#cae3da" }}>
                    <div className={`${stylesUtils.flexCenter}`}>
                        <div>
                            {tradeSuccessTicker} bought successfully.                 
                        </div>
                        <div style={{position: "absolute", right:"20px"}}>
                            <RxCross2 style={{ cursor: 'pointer' }} onClick={()=>setShowBuySuccess(false)}/>
                        </div>
                    </div>           
                </Card>
            }
            { showSellSuccess &&
                 <Card className={`${styles.noDataCard}`} style={{height: "50px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f6d1d5" }}>
                    <div className={`${stylesUtils.flexCenter}`}>
                        <div>
                            {tradeSuccessTicker} sold successfully.                 
                        </div>
                        <div style={{position: "absolute", right:"20px"}}>
                            <RxCross2 style={{ cursor: 'pointer' }} onClick={()=>setShowSellSuccess(false)}/>
                        </div>
                    </div>           
                </Card>
            }
            <Row>
                <Col>
                    <h2 className={`d-block text-align-left ${styles.portfolioTitle}`}>My Portfolio</h2>
                    <h2 className={`d-block text-align-left`} style={{marginBottom:"60px"}}>Money in Wallet:  ${Number(budgetInfo.toFixed(2))}</h2>    
                </Col>
            </Row>
            { noDataFound 
                ? <Card className={`${styles.noDataCard}`} style={{height: "50px", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "-50px" }}>
                    <div className={`${stylesUtils.flexCenter}`}>
                        <div>
                            Currently you don't have any stock.                 
                        </div>
                        <div style={{position: "absolute", right:"20px"}}>
                            <RxCross2 style={{ cursor: 'pointer' }} onClick={()=>setNoDataFound(false)}/>
                        </div>
                    </div>           
                </Card>
                : favoritesGrid
            }

        </Container>      
        </>
    );
    
}


export default PortfolioView;