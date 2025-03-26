import { Button } from "react-bootstrap";
import  styles  from "../styles/Navbar.module.css";
import React, { useState, useEffect } from 'react';

interface NavBarButtonProps {
    onSearchClicked: () => void,
    onWatchListClicked: () => void,
    onPortfolioClicked: () => void,
    focusedButton: string,
    setFocusedButton: (buttonName: string) => void;
}

const NavBarButton = ({ onSearchClicked, onWatchListClicked, onPortfolioClicked, focusedButton,
    setFocusedButton}: NavBarButtonProps) => {

    
    useEffect(() => {

        const savedFocusedButton = sessionStorage.getItem("focusedButton");
        if (savedFocusedButton !== null && savedFocusedButton !== "") {
            setFocusedButton(savedFocusedButton);
        }
    },[]);

    const handleButtonClick = (buttonName: string) => {
        setFocusedButton(buttonName);
        sessionStorage.setItem("focusedButton", buttonName);
    };

    function updateButton(buttonName: string){
        setFocusedButton(buttonName);
    }

    return (
        <>
            <Button 
            onClick={() => {handleButtonClick('search'); onSearchClicked()}} 
            className={`${focusedButton === 'search' ? styles.NavbarButtonfocus : styles.NavbarButton} 
            ml-auto`}>
                Search
            </Button>
            <Button 
            onClick={() => {handleButtonClick('watchList'); onWatchListClicked()}}
            className={`${focusedButton === 'watchList' ? styles.NavbarButtonfocus : styles.NavbarButton} 
            ml-auto`}>
                Watchlist
            </Button>
            <Button 
            onClick={() => {handleButtonClick('portfolio'); onPortfolioClicked()}} 
            className={`${focusedButton === 'portfolio' ? styles.NavbarButtonfocus : styles.NavbarButton} ml-auto`}>
                Portfolio
            </Button>
        </>
    )
};

export default NavBarButton;