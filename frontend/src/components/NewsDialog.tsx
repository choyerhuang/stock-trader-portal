// NewsDialog.tsx
// 🚫 Main logic stripped for academic integrity

import { Button, Card, Modal } from "react-bootstrap";
import { News } from "../models/news";
import { BsTwitterX } from "react-icons/bs";
import { FaSquareFacebook } from "react-icons/fa6";

interface NewsDialogProps {
    newsData: News,
    onDismiss: () => void,
}

const NewsDialog = ({ newsData, onDismiss }: NewsDialogProps) => {

    function formatTimestamp(timestamp: number): string {
        // Formatting removed
        return "";
    }

    function shareOnTwitter(text: string, url: string) {
        // Sharing logic removed
    }

    function shareOnFacebook(url: string) {
        // Sharing logic removed
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <div>{newsData.source}</div>
                    <div className="text-muted" style={{ fontSize: "16px" }}>
                        {formatTimestamp(newsData.datetime)}
                    </div>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div style={{ fontWeight: "bold" }}>{newsData.headline}</div>
                <div className="text-muted">{newsData.summary}</div>
                <div style={{ fontSize: "16px", color: "gray" }}>
                    For more details click <a href={newsData.url} target="_blank" rel="noreferrer">here</a>
                </div>
                <p></p>
                <Card>
                    <p style={{ fontWeight: "bold", margin: "15px" }} className="text-muted">Share</p>
                    <div>
                        <BsTwitterX
                            size={32}
                            style={{ margin: "18px", marginTop: "0px", display: "inline-block" }}
                            onClick={() => { /* Removed */ }}
                        />
                        <FaSquareFacebook
                            size={40}
                            color="blue"
                            style={{ margin: "18px", marginTop: "0px", display: "inline-block" }}
                            onClick={() => { /* Removed */ }}
                        />
                    </div>
                </Card>
            </Modal.Body>
        </Modal>
    );
}

export default NewsDialog;
