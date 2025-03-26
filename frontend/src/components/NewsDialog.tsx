import { Button, Card, Modal } from "react-bootstrap";
import { News } from "../models/news";
import { useForm } from "react-hook-form";
import { BsTwitterX } from "react-icons/bs";
import { FaSquareFacebook } from "react-icons/fa6";

interface NewsDialogProps {
    newsData: News,
    onDismiss: () => void,
}

const NewsDialog = ({newsData, onDismiss}: NewsDialogProps) => {

    function formatTimestamp(timestamp: number): string {
        const months: string[] = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
    
        const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
    
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
    
        const formattedDate = `${month} ${day}, ${year}`;
    
        return formattedDate;
    }

    // from tutorial code
    function shareOnTwitter(text: string, url: string) {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        window.open(twitterUrl, '_blank');
    }
    // from tutorial code
    function shareOnFacebook(url: string) {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(facebookUrl, '_blank');
    }



    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <div>{newsData.source}</div>
                    <div className="text-muted" style={{fontSize: "16px"}}>{formatTimestamp(newsData.datetime)}</div>         
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div style={{fontWeight: "bold"}}>{newsData.headline}</div>
                <div className="text-muted">{newsData.summary}</div>
                <div style={{fontSize: "16px", color: "gray"}} >For more details click <a href={newsData.url} target="_blank">here</a></div>
                <p></p>
                <p></p>
                <Card>
                    <p style={{fontWeight: "bold", margin: "15px"}} className="text-muted">Share</p>
                    <div>
                        <BsTwitterX size={32} style={{margin: "18px", marginTop:"0px", display:"inline-block"}} onClick={()=>{shareOnTwitter(newsData.headline, newsData.url)}}/>
                        <FaSquareFacebook size={40} color="blue" style={{margin: "18px", marginTop:"0px", display:"inline-block"}} onClick={()=>{shareOnFacebook(newsData.url)}}/>
                    </div>
                </Card>
            </Modal.Body>
        </Modal>
    );
}

export default NewsDialog;