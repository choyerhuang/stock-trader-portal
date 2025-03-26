import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import styles from "../styles/WatchList.module.css";
import { RxCross2 } from "react-icons/rx";
import stylesUtils from "../styles/utils.module.css"
import * as FavoriteApi from "../network/favorites_api";
import * as SearchApi from "../network/search_api";
import { Favorite as FavoriteModel } from '../models/favorites';
import Favorite from './Favorite';
import { useNavigate } from 'react-router-dom';
import NavBarButton from './NavBarbutton';

interface FavoriteInfoProps {
    ticker: string,
    Name: string,
    currentPrice: number,
    priceChange: number,
    priceChangePercent: number,
}

interface WatchListProps {
    focusedButton: string,
    setFocusedButton: (buttonName: string) => void;
}

const WatchListView = ({focusedButton, setFocusedButton}: WatchListProps) => {

    const navigate = useNavigate();
    const [ noDataFound, setNoDataFound ] = useState(false);
    const [ favoriteInfo, setFavoriteInfo ] = useState<FavoriteInfoProps[]>([]);
    const [ isLoading, setIsLoading ] = useState(true);
    
    async function searchFavoriteInfo (favorites: FavoriteModel[]) {
        const FavoritesInfo: FavoriteInfoProps[] = [];
        
        for (let item of favorites || []) {
            const responseAbstract = await SearchApi.SearchStock(item.companyStick || "" , "abstract", true);
            const responsePrice = await SearchApi.SearchStock(item.companyStick || "", "price", true);
            if (!Object.keys(responseAbstract).length) {
                console.log("Response Abstract is empty");
            } else {
                if (!Object.keys(responsePrice).length) {
                    console.log("Response Price is empty");
                } else {
                    FavoritesInfo.push({
                        ticker: item.companyStick || "",
                        Name: responseAbstract.name || "",
                        currentPrice: responsePrice.c || 0,
                        priceChange: responsePrice.d || 0,
                        priceChangePercent: responsePrice.dp || 0,
                    });  
                }    
            }
        }
        setFavoriteInfo(FavoritesInfo);
    } 

    const handleClick = (item: FavoriteInfoProps ) => {
        sessionStorage.setItem("focusedButton", "search");
        setFocusedButton("search");
        navigate("/", {state: { ticker: item.ticker, triggerRouteSearch: true}})
    }

    async function deleteFavorite(favorite: FavoriteInfoProps){
        try {
            await FavoriteApi.deleteFavorite(favorite.ticker);
            const newFavor = favoriteInfo.filter(existingNote=> existingNote.ticker !== favorite.ticker)
            setFavoriteInfo(newFavor);
        
            if (newFavor.length === 0) {setNoDataFound(true);}
        } catch (error) {
            console.error("Delete favorite Error: " + error);
        }
    }
    
    useEffect(()=> {
        async function getFavorites(): Promise<FavoriteModel[]> {
            try {
                const favorites = await FavoriteApi.fetchFavorites();

                if(!Object.keys(favorites).length) {
                    setNoDataFound(true);                   
                } else {
                    setNoDataFound(false);
                    return favorites;
                }
            } catch (error) {
                console.log("Get Favorites Failed, Error: " + error)
            }
            return [];
        }

        const fetchData = async() => {
            const favorite = await getFavorites();
            await searchFavoriteInfo(favorite);
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
                        <h2 className={`d-block text-align-left ${styles.watchListTitle}`}>My Watchlist</h2>
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
        {favoriteInfo.map(item => (
            <Col key={item.ticker}>
                <Favorite onClicked={handleClick}
                onDeleteClicked={deleteFavorite} 
                favorite={item}/>
            </Col>
        ))}
    </Row>

    return (
        <>
        <Container>
            <Row>
                <Col>
                    <h2 className={`d-block text-align-left ${styles.watchListTitle}`}>My Watchlist</h2>
                </Col>
            </Row>
            { noDataFound 
                ? <Card className={`${styles.noDataCard}`}>
                    <div className={`${stylesUtils.flexCenter}`}>
                        <div className={`${styles.noDataText}`}>
                            Currently you don't have any stock in your watchlist.                   
                        </div>
                        <div style={{position: "absolute", right:"20px"}}>
                            <RxCross2 style={{ cursor: 'pointer' }}/>
                        </div>
                    </div>           
                </Card>
                : favoritesGrid
            }

        </Container>      
        </>
    );
    
}


export default WatchListView;