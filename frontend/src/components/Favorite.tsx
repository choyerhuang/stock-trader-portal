import { Card } from "react-bootstrap";
import styles from "../styles/WatchList.module.css"
import { RxCross2 } from "react-icons/rx";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";


interface FavoriteInfoProps {
    ticker: string,
    Name: string,
    currentPrice: number,
    priceChange: number,
    priceChangePercent: number,
}

interface FavoriteProps {
    favorite: FavoriteInfoProps,
    onClicked: (Favorite: FavoriteInfoProps) => void,
    onDeleteClicked: (Favorite: FavoriteInfoProps) => void,
    className?: string
}

const Favorite = ({ favorite, onClicked, onDeleteClicked }: FavoriteProps) => {


    return (
        <Card 
            className={`${styles.noteCard} ${styles.favorite}`}
            onClick = {()=> onClicked(favorite)}>
            <Card.Body className={styles.cardBody} >
                    <Card.Title >
                        <RxCross2 className="text-muted"
                        onClick={(e) => {
                            onDeleteClicked(favorite);
                            e.stopPropagation();
                        }}
                        />
                    </Card.Title>
                <div style={{ display: 'flex', flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
                    <Card.Text style={{ flex: 1 }} className={`${styles.cardText}`}>
                        <span style={{ fontSize: "30px" }}>{favorite.ticker.toUpperCase()}</span>
                        <span style={{ display: 'block', wordWrap: 'break-word', fontSize: "18px" }}>{favorite.Name}</span>
                    </Card.Text>
                    <Card.Text style={{ flex: 1 }} className={styles.cardText}>
                        <span style={{ fontSize: "30px", color: favorite.priceChange > 0 ? "green" : "red" }}>{favorite.currentPrice}</span>
                        <span 
                        style={{ display: 'block', wordWrap: 'break-word', fontSize: "18px", color: favorite.priceChange > 0 ? "green" : "red" }}>
                            {favorite.priceChange > 0 ? <TiArrowSortedDown /> : <TiArrowSortedUp/>}
                            {Number(favorite.priceChange.toFixed(2))}
                            {` (${Number(favorite.priceChangePercent.toFixed(2))}%)`}
                        </span>
                     </Card.Text>
                </div>             
            </Card.Body>     
        </Card>
    )
}

export default Favorite;