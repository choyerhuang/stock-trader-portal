// NavBar.tsx
// 🔒 Cleaned version for academic integrity

import { Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import NavBarButton from "./NavBarbutton";
import styles from "../styles/Navbar.module.css";
import { useNavigate } from "react-router-dom";

interface NavBarProps {
    onSearchClicked: () => void,
    onWatchListClicked: () => void,
    onPortfolioClicked: () => void,
    loggedInUser: User | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogoutSuccessful: () => void,
    focusedButton: string,
    setFocusedButton: (buttonName: string) => void;
}

const NavBar = ({ focusedButton, setFocusedButton }: NavBarProps) => {

    const navigate = useNavigate();

    // 🔒 Simplified navigation handlers
    const onSearchClicked = () => navigate('/');
    const onWatchListClicked = () => navigate('/watchlist');
    const onPortfolioClicked = () => navigate('/portfolio');

    return (
        <Navbar variant="dark" expand="lg" sticky="top" className={styles.navbar}>
            <Container fluid className="mx-1">
                <Navbar.Brand>
                    Stock Search
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default NavBar;
