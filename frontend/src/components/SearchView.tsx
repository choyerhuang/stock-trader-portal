import { useState, ChangeEvent } from "react";
import { Container, Row, Col, Form, InputGroup, Card, Spinner } from 'react-bootstrap';
import styles from "../styles/SearchPage.module.css";
import stylesUtils from "../styles/utils.module.css";
import { BsSearch } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

// Placeholder suggestion type
interface AutoCompleteProps {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

const SearchPageView = () => {
  const [searchValue, setSearchValue] = useState("");
  const [autoValue, setAutoValue] = useState("");
  const [suggestions, setSuggestions] = useState<AutoCompleteProps[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [searchSuccessState, setSearchSuccessState] = useState(false);
  const [searchErrorState, setSearchErrorState] = useState(false);

  const handleSearch = () => {
    setShowSuggestions(false);
    setSearchErrorState(false);
    setSearchSuccessState(false);

    if (autoValue === "") {
      setSearchErrorState(true);
      return;
    }

    setSearchValue(autoValue);

    // 🔧 Simulate search success
    setSearchSuccessState(true);

    // 🔒 API logic removed
    // SearchApi.SearchStock(autoValue, "abstract", true)...
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAutoValue(value);

    if (value.length > 0) {
      setShowSuggestions(true);
      setIsLoadingSuggestions(true);

      // 🔒 Simulated fake suggestions
      setTimeout(() => {
        setSuggestions([
          { symbol: value.toUpperCase(), displaySymbol: value.toUpperCase(), description: "Demo Company", type: "Equity" }
        ]);
        setIsLoadingSuggestions(false);
      }, 500);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const cleanState = () => {
    setSearchValue("");
    setAutoValue("");
    setSearchSuccessState(false);
    setSearchErrorState(false);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 className={`d-block text-center ${styles.searchTitle}`}>STOCK SEARCH</h2>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col xs lg="6">
          <div className={styles.customFormContainer}>
            <Form className="d-flex" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
              <InputGroup className={styles.customForm}>
                <Form.Control
                  type="text"
                  placeholder="Enter stock ticker symbol"
                  value={autoValue}
                  onChange={handleInputChange}
                  className={`mr-1 ${styles.customInput}`}
                  aria-label="Search"
                />
                <InputGroup.Text className={styles.customSearchIcon}>
                  <BsSearch onClick={handleSearch} />
                  <RxCross2 className={styles.customCross} onClick={cleanState} />
                </InputGroup.Text>
              </InputGroup>
            </Form>

            {showSuggestions && (
              <ul className={styles.listBoxContainer}>
                {isLoadingSuggestions ? (
                  <div className="text-center text-muted p-3">
                    <Spinner animation="border" />
                  </div>
                ) : (
                  suggestions.map((s, i) => (
                    <li key={i} className={styles.listBoxItem}
                      onClick={() => {
                        setAutoValue(s.symbol);
                        setShowSuggestions(false);
                      }}>
                      {s.displaySymbol} | {s.description}
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        </Col>
      </Row>

      {searchErrorState && (
        <Card className={styles.errorCard}>
          <div className={stylesUtils.flexCenter}>
            <div>No data found. Please enter a valid Ticker.</div>
            <div style={{ position: "absolute", right: "20px" }}>
              <RxCross2 style={{ cursor: 'pointer' }} onClick={cleanState} />
            </div>
          </div>
        </Card>
      )}

      {searchSuccessState && (
        <Card className="mt-3 p-3 text-center text-muted">[SummaryCard Component Placeholder]</Card>
      )}
    </Container>
  );
};

export default SearchPageView;
