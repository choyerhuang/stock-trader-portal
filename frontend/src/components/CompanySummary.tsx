import React, { useState, useEffect } from "react";
import * as SearchApi from "../network/search_api";
import { Card, Button, Row, Col, Spinner } from "react-bootstrap";
import stylesUtils from "../styles/utils.module.css";
import styles from "../styles/Portfolio.module.css";
import styleRespons from "../styles/CompanySearch.module.css";
import ScrollableTabs from "./ScrollableTabs";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import {ChartDataProps} from "../models/chart";
import { InsiderDataProps } from "../models/Insider";
import { Recommendation } from "../models/recommendation";
import { Earnings } from "../models/earnings";
import { useLocation } from 'react-router-dom';
import { Favorite as FavoriteModel } from '../models/favorites';
import * as FavoriteApi from "../network/favorites_api";
import * as TradeApi from "../network/trade_api";
import TradeDialog from "./TradeDialog";

interface CompanySummaryProps {
    stick: string,
    setAutoValue: React.Dispatch<React.SetStateAction<string>>;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    setSearchSuccessState: React.Dispatch<React.SetStateAction<boolean>>;
    handleSearch: () => void;
    autoValue: string,
 }

 interface SummaryProps {
    highPrice: number,
    lowPrice: number,
    openPrice: number,
    prevClose: number,
    ipoDate: string,
    industry: string,
    webURL: string,
    ticker: string,
    changeInPrice: number,
    stockVariant: [number, number][];
    peers: string[];
    isStockMarkterOpen: boolean,
    setAutoValue: React.Dispatch<React.SetStateAction<string>>,
    setSearchValue: React.Dispatch<React.SetStateAction<string>>,
    handleSearch: () => void,
}

interface PriceVariantData {
    t: number;
    c: number;
}

interface PortfolioInfoProps {
    ticker: string,
    Name: string,
    currentPrice: number,
    prevStockAmount: number,
    prevAverageCost: number,
    prevTotalCost: number,
}

 function isValidEarnings(data: any): data is Earnings {
    return typeof data.actual === 'number' &&
           typeof data.estimate === 'number' &&
           typeof data.period === 'string' &&
           typeof data.quarter === 'number' &&
           typeof data.surprise === 'number' &&
           typeof data.surprisePercent === 'number' &&
           typeof data.symbol === 'string' &&
           typeof data.year === 'number';
}

const CompanySummary = ({stick, setAutoValue, setSearchValue, setSearchSuccessState, autoValue, handleSearch}:CompanySummaryProps) => {
    const sticker = stick.toUpperCase();
    const { state } = useLocation();
    const { ticker, triggerRouteSearch } = state || {};
    const [isLoading, setIsLoading] = useState(true);
    const [logoURL, setLogoURL] = useState("");
    const [name, setName] = useState("");
    const [changeInPrice, setChangeInPrice] = useState(0);
    const [currentPrice, setCurrentPrice] = useState(0);
    const [priceChangePercent, setPriceChangePercent] = useState(0);
    const [exchange, setExchange] = useState("");
    const [priceTime, setPriceTime] = useState("");
    const [closedTime, setClosedTime] = useState("");
    const [isMarketOpen, setIsMarketOpen] = useState(false);
    const [summaryPageInfo, setSummaryPageInfo] = useState({
        highPrice: 0,
        lowPrice: 0,
        openPrice: 0,
        prevClose: 0,
        ipoDate: "",
        industry: "",
        webURL: "",
        ticker: sticker,
    })
    const[stockVariant, setStockVariant] = useState([]);
    const [peers, setPeers] = useState([]);
    const [chartData, setChartData] = useState<ChartDataProps | null>(null);
    const [insiderData, setInsiderData] = useState<InsiderDataProps | null> (null);
    const [recommendationData, setRecommendationData] = useState<Recommendation[]>([]);
    const [earnings, setEarnings] = useState<Earnings[]>([]);
    const [isStarClicked, setIsStarClicked] = useState(true);
    const [ budgetInfo, setBudgetInfo ] = useState(25000);
    const [ tradeSuccessTicker, setTradeSuccessTicker ] = useState("");
    const [ showBuySuccess, setShowBuySuccess ] = useState(false);
    const [ showSellSuccess, setShowSellSuccess ] = useState(false);    
    const [portfolio, setPortfolio] = useState({
        ticker: sticker, 
        Name: "",
        currentPrice: 0,
        prevStockAmount: 0,
        prevAverageCost: 0,
        prevTotalCost: 0
      });
    const [ showSellButton, setShowSellButton ] = useState(false);
    const [ showTradeDialog, setShowTradeDialog ] = useState(false);
    const [ tradeDialogType, setTradeDialogType ] = useState("Buy");
    const [ showAddWatchList, setShowAddWatchList ] = useState(false);




    function formatTimestamp(timestamp: number) { 
        const date = new Date(timestamp * 1000); 
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    useEffect(()=> {
        let intervalId: NodeJS.Timeout;
        
        async function searchStock(sticker: string){
            
            try {
                const summaryStock = await SearchApi.SearchStock(sticker, "abstract", true);

                if(!Object.keys(Response).length) {
                    console.log("Response is empty.");
                } else {
                    setLogoURL(summaryStock.logo);
                    setName(summaryStock.name);
                    setExchange(summaryStock.exchange);
                    setSummaryPageInfo( prevState => ({
                        ...prevState,
                        ipoDate: summaryStock.ipo,
                        industry: summaryStock.finnhubIndustry,
                        webURL: summaryStock.weburl,
                    })
                    )
                    setPortfolio(prevState=>({
                        ...prevState,
                        Name: summaryStock.name
                    }))
                }
            } catch (error) {
                console.log(error);
            }
        }

        


            async function priceVariant() {
                try {
                    const priceVariantData = await SearchApi.SearchStock(sticker, "hourlyVariant", isMarketOpen);
                    const priceVariantDataResults = priceVariantData.results;
                    if(!Object.keys(priceVariantData).length) {
                        console.log("Response is empty.");
                    } else {
                        setStockVariant(priceVariantDataResults.map((obj: PriceVariantData) => [obj.t, obj.c]));                  
                    }
                } catch (error) {
                    console.log(error);
                }
            }

        
            async function fetchCompanyPeers() {
                try {
                    const response = await SearchApi.SearchStock(sticker, "peers", isMarketOpen);
                    setPeers(response);
                } catch (error) {
                    console.log(error);
                }
            };
    


        async function searchPrice(sticker: string) {
            try {
                const currentPrice2 = await SearchApi.SearchStock(sticker, "price", true);
                if(!Object.keys(currentPrice2).length) {
                    console.log("Response is empty.");
                } else {
                    setChangeInPrice(currentPrice2.d);
                    setCurrentPrice(currentPrice2.c);
                    setPriceChangePercent(currentPrice2.dp);
                    setSummaryPageInfo(prevState => ({
                        ...prevState,
                        highPrice: currentPrice2.h,
                        lowPrice: currentPrice2.l,
                        openPrice: currentPrice2.o,
                        prevClose: currentPrice2.pc,
                    }))
                    setPortfolio(prevState=>({
                        ...prevState,
                        currentPrice: currentPrice2.c
                    }))

                    const currentTimeInSeconds = Math.floor(Date.now() / 1000);

                    if((currentTimeInSeconds - currentPrice2.t) <= 300) {
                        setIsMarketOpen(true);
                    } else {
                        setIsMarketOpen(false);
                        const timestampInMillis: number = currentPrice2.t;
                        const date = new Date(timestampInMillis*1000);
                        const dateString = date.toISOString().slice(0, 10); 
                        setClosedTime(dateString + " 13:00:00")
                    }

                    setPriceTime(formatTimestamp(currentTimeInSeconds));
                }

            } catch (error) {
                console.log(error);
            }
        }

        async function searchChartData() {
            try {
                const chartData = await SearchApi.SearchStock(sticker, "polygon", isMarketOpen);
                if(!Object.keys(chartData).length) {
                    console.log("Response is empty.");
                } else {
                    setChartData(chartData);
                } 
            } catch (error) {
                console.log("Search Chart Data"+ error);
            }
        }

        async function searchInsider() {
            try {
                const insiderData = await SearchApi.SearchStock(sticker, "insider", isMarketOpen);
                if(!Object.keys(insiderData).length) {
                    console.log("Response is empty.");
                } else {
                    setInsiderData(insiderData);
                    
                }                 
            } catch (error) {
                console.log("Insider "+error);
            }
        }

        async function searchRecommendation() {
            try {
                const recommendationData = await SearchApi.SearchStock(sticker, "recommendation", isMarketOpen);
                if(!Object.keys(recommendationData).length) {
                    console.log("Response is empty.");
                } else {
                    setRecommendationData(recommendationData);
                    
                } 
            } catch (error) {
                console.log("Recommendation: "+error);
            }
        }


        async function searchEarnings(){
            try {
                const rawEarningsData = await SearchApi.SearchStock(sticker, "earnings", isMarketOpen);
                const earningsData = isValidEarning(rawEarningsData);
                if(!Object.keys(earningsData).length) {
                    console.log("Earning Response is empty.");
                } else {
                    setEarnings(earningsData);                  
                }              
            } catch (error) {
                console.log("Earnings: "+error);
            }
        }

        function isValidEarning(rawEarningsData: Earnings[]){
            const earningsData: Earnings[] = [];

            for (let i=0; i<rawEarningsData.length; i++){
                if ( isValidEarnings(rawEarningsData[i]) ){
                    earningsData.push(rawEarningsData[i]);
                }
            }
            return earningsData;
        }

        const fetchData = async() => {
            await Promise.all(
                [searchStock(sticker),
                 searchPrice(sticker),
                 searchChartData(),
                 searchInsider(),
                 searchRecommendation(),
                 searchEarnings(),
                 priceVariant(),
                 fetchCompanyPeers()])     
            setIsLoading(false);
        }
        

        fetchData();

        if (isMarketOpen) {
            intervalId = setInterval(() => searchPrice(sticker), 15000);      
        }
        return () => {
            if (intervalId) clearInterval(intervalId);
          };
        
    }, [isMarketOpen, sticker]);
        
    useEffect(()=> {
        async function getPortfolios() {
            try {
                const trades = await TradeApi.fetchPortfolio();
                if(!Object.keys(trades).length) {
                    setShowSellButton(false);                  
                } else {
                    const hasTicker = trades.filter(item => item.companyStick === sticker);
                    if (hasTicker.length > 0) {
                        setShowSellButton(true);
                        setPortfolio(prevState=>({
                            ...prevState,
                            ticker: hasTicker[0].companyStick|| "",
                            prevStockAmount: hasTicker[0].stockAmount || 0,
                            prevAverageCost: hasTicker[0].averageCost || 0,
                            prevTotalCost: hasTicker[0].totalCost || 0,
                        }))
                    } else {
                        setShowSellButton(false);
                    }
                }
            } catch (error) {
                console.log("Get Trade Failed, Error: " + error)
            }
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
            await getPortfolios();
            const budget = await getBudget();
            await setBudgetInfo(budget[0].budget);
        }
        
        fetchData();
    }, [])

    useEffect(()=> {
        async function getFavorites(): Promise<FavoriteModel[]> {
            try {
                const favorites = await FavoriteApi.fetchFavorites();

                if(!Object.keys(favorites).length) {
                    setIsStarClicked(false);
                } else {
                    const hasTicker = favorites.some(item => item.companyStick === sticker);
                    if (hasTicker) {
                        setIsStarClicked(true);
                    } else {
                        setIsStarClicked(false);
                    }
                }
            } catch (error) {
                console.log("Get Favorites Failed, Error: " + error)
            }
            return [];
        }

        const fetchData = async() => {
            const favorite = await getFavorites();
        }

        fetchData();
    }, [])    
    
    async function deletePortfolio(ticker: string){
        try {
            setShowSellButton(false);
        } catch (error) {
            console.error("Delete favorite Error: " + error);
        }
    }   
    

    const handleStarClick = () => {
        setIsStarClicked((prevIsStarClicked) => !prevIsStarClicked);
        if(isStarClicked){
            FavoriteApi.deleteFavorite(sticker.toUpperCase());
        } else {
            FavoriteApi.addFavorite(sticker.toUpperCase());
            setShowAddWatchList(true);
        }
    };

    if (isLoading) {
        return (
        <div className={`${stylesUtils.flexCenter}`} >  
            <Spinner style={{color: "black", fontSize: "36px", width: "60px", height: "60px"}} animation='border' />
        </div>  
        );
    } 
    
    return (
    <>
        { showAddWatchList &&
                 <Card className={`${styles.noDataCard}`} style={{height: "50px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#cae3da" }}>
                    <div className={`${stylesUtils.flexCenter}`}>
                        <div>
                            {sticker} added to Watchlist.                 
                        </div>
                        <div style={{position: "absolute", right:"20px"}}>
                            <RxCross2 style={{ cursor: 'pointer' }} onClick={()=>{setShowAddWatchList(false)}}/>
                        </div>
                    </div>           
                </Card>
            }
    { showBuySuccess &&
                 <Card className={`${styles.noDataCard}`} style={{height: "50px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#cae3da" }}>
                    <div className={`${stylesUtils.flexCenter}`}>
                        <div>
                            {tradeSuccessTicker} bought successfully.                 
                        </div>
                        <div style={{position: "absolute", right:"20px"}}>
                            <RxCross2 style={{ cursor: 'pointer' }} onClick={()=>{setShowBuySuccess(false)}}/>
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
                            <RxCross2 style={{ cursor: 'pointer' }} onClick={()=> {setShowSellSuccess(false)}}/>
                        </div>
                    </div>           
                </Card>
            }
    <Row className={`flex-nowrap g-4 ${styles.SummaryTop}`} style={{display: "flex", margin: "0px", position: "relative", top: "-25px"}}>
        <Col style={{ flex: '1' }}>
            <Card style={{ height: '100%', backgroundColor: "transparent",borderColor: "transparent" }}>
            <Card.Body className="d-flex flex-column align-items-center justify-content-start">
                <Card.Title className={`${styleRespons.ticker}`}style={{ whiteSpace: "nowrap"}}>{sticker.toUpperCase()} 
                {isStarClicked 
                ? <FaStar onClick={handleStarClick} 
                style={{ color: "rgba(251,221,1,255)", 
                 cursor: 'pointer', marginLeft:"5px", marginBottom:"13px" }}/>
                : <CiStar onClick={handleStarClick} 
                style={{ cursor: 'pointer', marginLeft:"5px", marginBottom:"13px"}} />}
                 </Card.Title>
                <Card.Subtitle className={`mb-2 text-muted ${styleRespons.subticker}`}>{name}</Card.Subtitle>
                <Card.Text className={`text-muted text-center ${styleRespons.exchange}`}>{exchange}</Card.Text>          
                <Card.Text>
                <Button 
                variant="primary" 
                className={`${styleRespons.buySellButtons}`}
                style={{ backgroundColor: 'green', border: 'none'}}
                onClick={()=> {
                    setTradeDialogType("Buy");
                    setShowTradeDialog(true);       
                }}>Buy</Button>
                { showSellButton &&
                    <Button variant="primary"
                    className={`${styleRespons.buySellButtons}`}
                    style={{ backgroundColor: 'red', border: 'none' }}
                    onClick={()=> {
                        setTradeDialogType("Sell");
                        setShowTradeDialog(true);       
                    }}>Sell</Button>}
                </Card.Text>
                <Card.Text>
                </Card.Text>
            </Card.Body>
            </Card>
        </Col>
        <Col style={{ flex: '1' }}>
            <Card style={{ height: '100%', backgroundColor: "transparent",borderColor: "transparent" }}>
            <Card.Body className="d-flex flex-column align-items-center justify-content-start">
                <Card.Text>
                <img 
                src={logoURL} alt={`${name} logo`} 
                className={styleRespons.logo}
                style={{ 
 
                }}  />
                </Card.Text>
            </Card.Body>
            </Card>
         </Col>
         <Col style={{ flex: '1' }}>   
            <Card style={{ height: '100%', backgroundColor: "transparent",borderColor: "transparent" }}>
            <Card.Body className="d-flex flex-column align-items-center justify-content-start">
                <Card.Text>
                <div 
                className={`text-center ${styleRespons.currentPrice}`}
                style={{ color: changeInPrice > 0 ? 'green' : 'red' }}>                
                        {currentPrice.toFixed(2)}
                </div>
                <div 
                className={`text-center ${styleRespons.changeInPrice}`}
                style={{ color: changeInPrice > 0 ? 'green' : 'red', whiteSpace: "nowrap" }}>
                    {changeInPrice < 0 ? <TiArrowSortedDown />: <TiArrowSortedUp/>}
                    {changeInPrice.toFixed(2)} 
                    ({priceChangePercent.toFixed(2)}%)
                </div>
                </Card.Text>
                <Card.Text 
                className={`text-muted text-center ${styleRespons.priceTime}`}
                style={{ whiteSpace: "nowrap" }}>
                    {priceTime}
                </Card.Text>
            </Card.Body>
            </Card>
        </Col>
    </Row>
    <div style={{ display: "flex", justifyContent: "center", position:"relative", top: "-40px"}}>
        <small  style={{color: isMarketOpen? "green" : "red", whiteSpace: "nowrap",
                fontWeight: "700"}}>{isMarketOpen ? 'Market is Open' : 'Market Closed on ' + closedTime}</small>
    </div>
    <div style={{position: "relative", top:"-30px"}}>
        <ScrollableTabs
        companyName={name}
        highPrice={summaryPageInfo.highPrice} lowPrice={summaryPageInfo.lowPrice}
        openPrice={summaryPageInfo.openPrice} prevClose={summaryPageInfo.prevClose}
        ipoDate={summaryPageInfo.ipoDate} industry={summaryPageInfo.industry} changeInPrice={changeInPrice} insiderData = {insiderData}
        webURL={summaryPageInfo.webURL} ticker={summaryPageInfo.ticker} isStockMarketOpen={isMarketOpen} chartData = {chartData} earningData={earnings}
        stockVariant={stockVariant} peers={peers}
        recommendationData={recommendationData} setAutoValue={setAutoValue} setSearchValue={setSearchValue} handleSearch={handleSearch} />
    </div>
    { showTradeDialog &&
            <TradeDialog 
            setBudgetInfo={setBudgetInfo} deletePortfolio={deletePortfolio} budgetInfo={budgetInfo} type={tradeDialogType} 
            onDismiss={()=> {setShowTradeDialog(false)}} portfolio={portfolio} setTradeSuccessTicker = {setTradeSuccessTicker}
            setShowBuySuccess = {setShowBuySuccess} setShowSellSuccess = {setShowSellSuccess} setShowSellButton={setShowSellButton}/>
        }
    </>
    );


};

export default CompanySummary;