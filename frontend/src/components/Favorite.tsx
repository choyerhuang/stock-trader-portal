// Favorite.tsx
// 🔒 Cleaned version to preserve academic integrity

import { Card } from "react-bootstrap";
import styles from "../styles/WatchList.module.css";
import { RxCross2 } from "react-icons/rx";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";

interface FavoriteInfoProps {
  ticker: string;
  Name: string;
  currentPrice: number;
  priceChange: number;
  priceChangePercent: number;
}

interface FavoriteProps {
  favorite: FavoriteInfoProps;
  onClicked: (favorite: FavoriteInfoProps) => void;
  onDeleteClicked: (favorite: FavoriteInfoProps) => void;
  className?: string;
}

const Favorite = ({ favorite, onClicked, onDeleteClicked }: FavoriteProps) => {
  return (
    <Card className={`${styles.noteCard} ${styles.favorite}`} onClick={() => onClicked(favorite)}>
      <Card.Body className={styles.cardBody}>
        <Card.Title>
          {/* Delete icon with event suppression */}
          <RxCross2
            className="text-muted"
            onClick={(e) => {
              // 🔒 Delete logic removed
              e.stopPropagation();
            }}
          />
        </Card.Title>
        <div style={{ display: 'flex', flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
          <Card.Text style={{ flex: 1 }} className={styles.cardText}>
            <span style={{ fontSize: "30px" }}>
              {/* 🔒 Ticker removed */}
            </span>
            <span style={{ display: 'block', fontSize: "18px" }}>
              {/* 🔒 Name removed */}
            </span>
          </Card.Text>
          <Card.Text style={{ flex: 1 }} className={styles.cardText}>
            <span style={{ fontSize: "30px" }}>
              {/* 🔒 Price info removed */}
            </span>
            <span style={{ display: 'block', fontSize: "18px" }}>
              {/* 🔒 Price change icon and percent removed */}
              <TiArrowSortedUp />
            </span>
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Favorite;
