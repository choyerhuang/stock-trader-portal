// App.tsx
// Main React app container with routing and layout
// 🔒 Internal logic removed to comply with academic integrity policies

import { Container } from 'react-bootstrap';
import styles from "./styles/NotesPage.module.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import SearchPageView from './components/SearchView';
import FooterBar from './components/FooterBar';
import WatchListView from './components/WatchListView';
import PortfolioView from './components/PortfolioView';

// 🔒 Hook-based logic removed (e.g., useState for active buttons)
function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar 
          // 🔒 All interactive props stripped for demo
          loggedInUser={null}
          onSearchClicked={() => {}}
          onWatchListClicked={() => {}}
          onPortfolioClicked={() => {}}
          onLoginClicked={() => {}}
          onSignUpClicked={() => {}}
          onLogoutSuccessful={() => {}}
          focusedButton={"search"}
          setFocusedButton={() => {}}
        />
        
        <Container className={styles.notesPage}>
          <Routes>
            <Route path="/" element={<SearchPageView />} />
            <Route path="/#" element={<SearchPageView />} />
            <Route path="/watchlist" element={<WatchListView focusedButton={"watchlist"} setFocusedButton={() => {}} />} />
            <Route path="/portfolio" element={<PortfolioView focusedButton={"portfolio"} setFocusedButton={() => {}} />} />
          </Routes>
        </Container>

        <FooterBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
