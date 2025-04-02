import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import styles from "../styles/WatchList.module.css";
import { RxCross2 } from "react-icons/rx";
import stylesUtils from "../styles/utils.module.css";
import Favorite from './Favorite';

interface FavoriteInfoProps {
  ticker: string;
  Name: string;
  currentPrice: number;
  priceChange: number;
  priceChangePercent: number;
}

interface WatchListProps {
  focusedButton: string;
  setFocusedButton: (buttonName: string) => void;
}

const WatchListView = ({ focusedButton, setFocusedButton }: WatchListProps) => {
  const [noDataFound, setNoDataFound] = useState(false);
  const [favoriteInfo, setFavoriteInfo] = useState<FavoriteInfoProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = (item: FavoriteInfoProps) => {
    // 🔒 Navigation logic removed
  };

  const deleteFavorite = (favorite: FavoriteInfoProps) => {
    // 🔒 Deletion logic removed
  };

  useEffect(() => {
    const fetchData = async () => {
      // 🔒 API calls and state updates removed
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Container>
        <Row>
          <Col>
            <h2 className={`d-block text-align-left ${styles.watchListTitle}`}>
              My Watchlist
            </h2>
          </Col>
        </Row>
        <div className={`${stylesUtils.flexCenter}`}>
          <Spinner
            style={{ color: 'black', fontSize: '36px', width: '60px', height: '60px' }}
            animation="border"
          />
        </div>
      </Container>
    );
  }

  const favoritesGrid = (
    <Row xs={1} md={1} xl={1} className={`g-4 ${styles.notesGrid}`}>
      {favoriteInfo.map((item) => (
        <Col key={item.ticker}>
          <Favorite
            onClicked={handleClick}
            onDeleteClicked={deleteFavorite}
            favorite={item}
          />
        </Col>
      ))}
    </Row>
  );

  return (
    <Container>
      <Row>
        <Col>
          <h2 className={`d-block text-align-left ${styles.watchListTitle}`}>
            My Watchlist
          </h2>
        </Col>
      </Row>
      {noDataFound ? (
        <Card className={`${styles.noDataCard}`}>
          <div className={`${stylesUtils.flexCenter}`}>
            <div className={`${styles.noDataText}`}>
              Currently you don't have any stock in your watchlist.
            </div>
            <div style={{ position: 'absolute', right: '20px' }}>
              <RxCross2 style={{ cursor: 'pointer' }} />
            </div>
          </div>
        </Card>
      ) : (
        favoritesGrid
      )}
    </Container>
  );
};

export default WatchListView;
