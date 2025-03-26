import { Container } from 'react-bootstrap';
import styles from "./styles/NotesPage.module.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import { useEffect, useState } from 'react';
import SearchPageView from './components/SearchView';
import FooterBar from './components/FooterBar';
import WatchListView from './components/WatchListView';
import PortfolioView from './components/PortfolioView';

function App() {
  const [focusedButton, setFocusedButton] = useState("search");

  return (
    <BrowserRouter>
      <div>
        <NavBar 
          loggedInUser={null}
          onSearchClicked={()=>{}}
          onWatchListClicked={()=>{}}
          onPortfolioClicked={()=>{}}
          onLoginClicked={()=> {}}
          onSignUpClicked={()=> {}}
          onLogoutSuccessful={()=> {}}
          focusedButton = {focusedButton}
          setFocusedButton = {setFocusedButton}
        />
        <Container className={styles.notesPage}>
          <>
          <Routes>
            <Route path="/" element={<SearchPageView/>} />
            <Route path="/#" element={<SearchPageView />} />
            <Route path="/watchlist" element={<WatchListView focusedButton = {focusedButton} setFocusedButton = {setFocusedButton}/>} />
            <Route path="/portfolio" element={<PortfolioView focusedButton = {focusedButton} setFocusedButton = {setFocusedButton}/>} />
          </Routes>
          </>
        </Container>
        <FooterBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
