import React, {useState, useEffect} from "react";
import { Card, Row, Col } from "react-bootstrap";
import "../styles/ResponsiveCard.css"
import * as SearchApi from "../network/search_api";
import StockChart from "./HourlyVariantChart";



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

const SummaryCard = ({highPrice, lowPrice, openPrice, prevClose, ipoDate, industry, webURL, ticker, changeInPrice, isStockMarkterOpen, stockVariant, peers, setAutoValue, setSearchValue, handleSearch}:SummaryProps) => {


    
    return ( 
        <>
         <Row xs={1} md={2} xl={2} className="justify-content-center">
            <Col className="order-md-1 order-1">
                <Card style={{ height: '100%', backgroundColor: "transparent",borderColor: "transparent" }}>
                    <Card.Body className="responsive-margin-card">
                        <Card.Text style={{margin: "0px"}}>
                            <div style={{ display: 'inline-block', marginRight: '10px', fontWeight: "bold" }}>High Price:</div> 
                            <div style={{ display: 'inline-block'}}>{highPrice}</div>
                        </Card.Text>
                        <Card.Text style={{margin: "0px"}}>
                            <div style={{ display: 'inline-block', marginRight: '10px', fontWeight: "bold" }}>Low Price:</div> 
                            <div style={{ display: 'inline-block'}}>{lowPrice}</div>
                        </Card.Text>
                        <Card.Text style={{margin: "0px"}}>
                            <div style={{ display: 'inline-block', marginRight: '10px', fontWeight: "bold" }}>Open Price:</div> 
                            <div style={{ display: 'inline-block'}}>{openPrice}</div>
                        </Card.Text>
                        <Card.Text style={{margin: "0px"}}>
                            <div style={{ display: 'inline-block', marginRight: '10px', fontWeight: "bold" }}>Prev. Close:</div> 
                            <div style={{ display: 'inline-block'}}>{prevClose}</div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Body>
                        <Card.Title  style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                            About the company
                        </Card.Title>
                        <Card.Text>
                            <div style={{ display: 'inline-block', marginRight: '10px', fontWeight: "bold", fontSize: "14px" }}>IPO Start Date:</div>
                            <div style={{ display: "inline-block", fontSize: "14px"}}>{ipoDate}</div>
                        </Card.Text>
                        <Card.Text>
                            <div style={{ display: 'inline-block', marginRight: '10px', fontWeight: "bold", fontSize: "14px" }}>Industry:</div>
                            <div style={{ display: "inline-block", fontSize: "14px"}}>{industry}</div>
                        </Card.Text>
                        <Card.Text>
                            <div style={{ display: 'inline-block', marginRight: '10px', fontWeight: "bold", fontSize: "14px" }}>WebPage:</div>
                            <div style={{ display: "inline-block", fontSize: "14px"}}>
                                <a href={webURL} target="_blank" rel="noopener noreferrer">{webURL}</a>
                            </div>
                        </Card.Text>
                        <Card.Text>
                            <div style={{ marginRight: '10px', fontWeight: "bold", fontSize: "14px" }}>Company peers:</div>
                            <div>
                                <div> 
                                {peers.map((peerName, index) => (
                                    <a key={index} href="#" onClick={() => 
                                    { setAutoValue(peerName); handleSearch(); setSearchValue(peerName);
                                      sessionStorage.setItem("searchValue", peerName); sessionStorage.setItem("autoValue", peerName)}}
                                    style={{ marginRight: "5px", fontSize: "14px" }}>
                                        {peerName}
                                    </a>
                                ))}
                                </div>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>            
            </Col>

            <Col className="order-md-2 order-2">
                <Card style={{ height: '100%', backgroundColor: "transparent",borderColor: "transparent" }}>
                        <Card.Body>
                                    <StockChart stockVariant={stockVariant} ticker={ticker} changeInPrice={changeInPrice}/>                           
                        </Card.Body>
                    </Card>
            </Col>
        </Row>
        </>
     );
}
 
export default SummaryCard;
