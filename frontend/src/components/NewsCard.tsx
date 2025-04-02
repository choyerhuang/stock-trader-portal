// NewsCard.tsx
// 🚫 Internal logic removed for academic integrity

import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import styles from "../styles/NewsCard.module.css";
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

const NewsCard = ({ ticker }: NewsCardProps) => {

    const [newsData, setNewsData] = useState<NewsProps[]>([]);
    const [newsDialogData, setNewsDialogData] = useState<NewsProps | null>(null);
    const [showNewsDialog, setShowNewsDialog] = useState(false);

    useEffect(() => {
        // Logic to fetch news removed
    }, []);

    return (
        <>
            <Row xs={1} md={2} xl={2} className={`${styles.newsGrid}`}>
                {newsData.map(news => (
                    <Col key={news.id}>
                        <Card className={`${styles.NewsCard} ${styles.news}`} onClick={() => {}}>
                            <Card.Body className={styles.newsCardBody}>
                                <img
                                    src={news.image}
                                    alt="News"
                                    className={styles.newsImage}
                                />
                                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', height: '80px' }}>
                                    <Card.Text className={`${styles.cardBody}`} style={{ maxHeight: "80px" }}>
                                        {news.headline}
                                    </Card.Text>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {showNewsDialog && newsDialogData && (
                <NewsDialog onDismiss={() => {}} newsData={newsDialogData} />
            )}
        </>
    );
}

export default NewsCard;
