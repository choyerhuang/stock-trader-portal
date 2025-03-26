import { useEffect, useState, ChangeEvent } from "react";
import { Container, Row, Col, Form, InputGroup, Card, Spinner} from 'react-bootstrap';
import styles from "../styles/SearchPage.module.css";
import stylesUtils from "../styles/utils.module.css"
import { useLocation } from 'react-router-dom';
import CompanySummary from "./CompanySummary";
import * as SearchApi from "../network/search_api";
import { useNavigate } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

interface AutoCompleteProps {
    description: string,
    displaySymbol: string,
    symbol: string,
    type: string,
}

const SearchPageView = ()  => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [searchErrorState, setSearchErrorState] = useState(false);
    const { state } = useLocation();
    const { ticker, triggerRouteSearch } = state || {};
    const [searchErrorMessage, setSearchErrorMessage] = useState(0);
    const [searchSuccessState, setSearchSuccessState] = useState(false);
    const [suggestions, setSuggestions] = useState<AutoCompleteProps[]>([]);
    const [autoValue, setAutoValue] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);


    const changeTriggerRouteSearch = () => {
        navigate('/', { replace: true, state: { ...state, triggerRouteSearch: false } });
      };

    useEffect(() => {
        console.log(triggerRouteSearch);
        if (triggerRouteSearch) {
            console.log("im here")
            console.log(ticker);
            setAutoValue(ticker);
            setSearchValue(ticker);  

        }
      }, [triggerRouteSearch, ticker]);

      useEffect(() => {
        if (autoValue&&triggerRouteSearch) {
          handleSearch();
          changeTriggerRouteSearch();  
        }
      }, [autoValue]);     

    useEffect(() => {
        
        const storedSuccessState = Boolean(sessionStorage.getItem("successState"));
        const storedSearchValue = sessionStorage.getItem("searchValue");
        const storedAutoValue = sessionStorage.getItem("autoValue");

        if (storedAutoValue !== null && !triggerRouteSearch) {
            setAutoValue(storedAutoValue);
        }
        if (storedSearchValue !== null && !triggerRouteSearch) {
            setSearchValue(storedSearchValue);
        }                
      }, []);

    async function searchStock(ticker: string){
        
        try {
            const Response = await SearchApi.SearchStock(ticker, "abstract", true);
            console.log(Response);
            if(!Object.keys(Response).length) {
                setSearchErrorMessage(0);
                setSearchErrorState(true);
            } else {
                setSearchSuccessState(true);
                sessionStorage.setItem("successState", "true");
                
            }

        } catch (error) {
            console.log(error);
        }
    }



    const handleSearch = () => {  
        setShowSuggestions(false);
        setSearchErrorState(false);
        sessionStorage.setItem("errorState", "false");
        setSearchSuccessState(false);
        sessionStorage.setItem("successState", "false");
        if (autoValue === "") {
            setSearchErrorMessage(1);
            sessionStorage.setItem("errorMessage", "1");
            setSearchErrorState(true);
            sessionStorage.setItem("errorMessage", "true");
        }
        const updatedValue = autoValue;
        setSearchValue(updatedValue);
        searchStock(autoValue);
        sessionStorage.setItem("autoValue", autoValue);
        sessionStorage.setItem("searchValue", updatedValue);
    }

    const cleanState = () => {
        setSearchValue("");
        setAutoValue("");
        setSearchErrorState(false);
        setSearchSuccessState(false);
        setSuggestions([]);
        sessionStorage.removeItem("autoValue");
        sessionStorage.removeItem("searchValue");
        sessionStorage.removeItem("errorState");
        sessionStorage.removeItem("successState");
    }

    const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAutoValue(value);
        sessionStorage.setItem("autoValue", value);
      
        if (value.length > 0) { 
            setShowSuggestions(true);
            setIsLoadingSuggestions(true);
            const fetchedSuggestions = await SearchApi.SearchStock(value, "autocomplete", true);
            setSuggestions(fetchedSuggestions.result);
            setIsLoadingSuggestions(false);
          
        } else {
          setShowSuggestions(false);
          setIsLoadingSuggestions(false);
        }
      };

      

    useEffect(() => {
        if (!showSuggestions && autoValue.length!==0) {
          handleSearch();
        }
      }, [autoValue, showSuggestions]);  

    return (
        <>
        <Container>
            <Row>
                <Col>
                    <h2 className={`d-block text-center ${styles.searchTitle}`}>STOCK SEARCH</h2>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                
                <Col xs lg="6">
                <div className={styles.customFormContainer}>
                    <Form className={`d-flex`} onSubmit={handleSearch}>
                        <InputGroup className={styles.customForm}>                          
                            <Form.Control
                                type="text"
                                placeholder="Enter stock ticker symbol" 
                                value={autoValue}
                                onChange={handleInputChange}                             
                                className={`mr-1 ${styles.customInput}`}
                                aria-label="Search"
                                autoFocus ={false}
                            />                        
                            <InputGroup.Text style={{ cursor: "pointer"}} className={styles.customSearchIcon}>
                                <BsSearch style={{ backgroundColor: "transparent", border:"none", cursor: "pointer"}}  onClick={ handleSearch}/>
                                <RxCross2 style={{ backgroundColor: "transparent", border:"none", cursor: "pointer"}} className={styles.customCross} onClick={cleanState}/>
                            </InputGroup.Text>
                        </InputGroup>
                            
                    </Form> 

                    {showSuggestions && (
                        <div>
                            <ul className={styles.listBoxContainer}>
                                {isLoadingSuggestions ? (
                                    <div 
                                    style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100px", color:"gray"}}>
                                        <Spinner />
                                    </div> // Ideally replace this with a Spinner component
                                ) : (
                                    suggestions.map((suggestion, index) => (
                                        <li
                                            key={index}
                                            className={styles.listBoxItem}
                                            onClick={() => {
                                                setAutoValue(suggestion.symbol); 
                                                sessionStorage.setItem("autoValue", suggestion.symbol);
                                                setShowSuggestions(false);

                                            }}
                                        >
                                            {suggestion.displaySymbol} | {suggestion.description}
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    )}
                </div>             
                </Col>           
            </Row>

            {searchErrorState &&
                <Card className={`${styles.errorCard}`} style={{height: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div className={`${stylesUtils.flexCenter}`}>
                        <div>
                            { searchErrorMessage === 0
                              ?  "No data found. Please enter a valid Ticker."
                              :  "Please enter a valid ticker."
                            }
                            
                        </div>
                        <div style={{position: "absolute", right:"20px"}}>
                            <RxCross2 style={{ cursor: 'pointer' }} onClick={cleanState}/>
                        </div>
                    </div>           
                </Card>
            }

            {searchSuccessState &&
                <CompanySummary autoValue= {autoValue} stick={searchValue} setSearchSuccessState={setSearchSuccessState} setAutoValue={setAutoValue} setSearchValue={setSearchValue} handleSearch={handleSearch}/>   
            }

        </Container>        
        </>
    )
};

export default SearchPageView;
