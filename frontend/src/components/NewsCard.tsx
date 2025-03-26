import { useEffect, useState } from "react";
import {Card, CardBody, Col, Row} from "react-bootstrap";
import styles from "../styles/NewsCard.module.css"
import * as SearchApi from "../network/search_api";
import NewsDialog from "./NewsDialog";

interface NewsCardProps {
    ticker: string;
}

interface NewsProps {
    category: string,
    datetime: number,
    headline: string,
    id: number,
    image: string,
    related: string,
    source: string,
    summary: string,
    url: string,
}

const NewsCard = ( {ticker}: NewsCardProps) => {

    const initialNews = {
        category: "",
        datetime: 0,
        headline: "",
        id: 0,
        image: "",
        related: "",
        source: "",
        summary: "",
        url: "",
    }

    const [newsData, setNewsData] = useState<NewsProps[]>([]);
    const [newsDialogData, setNewsDialogData] = useState<NewsProps>(initialNews);
    const [showNewsDialog, setShowNewsDialog] = useState(false);
    
    useEffect(()=> {
        async function getNews() {
            try {
                const rawNewsData = await SearchApi.SearchStock(ticker, "news", false);
                const newsData = isValidNews(rawNewsData);
                setNewsData(newsData);
            } catch (error) {
                console.log(error);
            }
        }

        getNews();


    }, [])

    function isValidNews(rawNewsData: NewsProps[]): NewsProps[]{
        let count = 0;
        const newsData: NewsProps[] = [];

        for (let i=0; i<rawNewsData.length; i++) {
            if (rawNewsData[i].headline === "" || rawNewsData[i].image ==="" || rawNewsData[i].summary === "" || rawNewsData[i].url === "") {
                continue;
            }
            newsData.push(rawNewsData[i]);

            count ++;
            if(count >= 20) {
                break;
            }
        }
        return newsData;
    }

    return (
        <>
            <Row xs={1} md={2} xl={2} className={`${styles.newsGrid}`}>
                {newsData.map(news => (
                    <Col key={news.id}>
                        <Card className={`${styles.NewsCard} ${styles.news}`} onClick={() => {setShowNewsDialog(true); setNewsDialogData(news)}}>
                            <Card.Body 
                            className = {styles.newsCardBody}
                            >
                                <img 
                                src={news.image} 
                                alt="News" 
                                className={styles.newsImage}
                                />
                                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', height: '80px' }}>
                                <Card.Text className={`${styles.cardBody}`} style={{maxHeight: "80px"}}>
                                    {news.headline}
                                </Card.Text>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row> 
            { showNewsDialog &&
                <NewsDialog onDismiss={()=> {setShowNewsDialog(false)}} newsData={newsDialogData}/>
            }
            
         
        </>
    );
}

export default NewsCard;

