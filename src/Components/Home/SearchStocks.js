import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { addStock } from "../../resources/stockUtilities";

const SearchStocks = ({ allstocks }) => {
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [user] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    document.querySelector("#search_input").focus();
    filterResults(query);
  }, [query]);

  const filterResults = (query) => {
    let temp = allstocks.filter((stock, ind, arr) => {
      return stock.ticker.toLowerCase() === query.toLowerCase() ? stock : null;
    });
    setFilteredResults(temp);
  };

  return (
    <Container>
      <Input
        autoComplete="off"
        id="search_input"
        type="text"
        placeholder="Enter Symbol or Company Name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Results>
        <h3>Results:</h3>
        {query && query !== " " ? (
          <ResultsWrapper>
            {filteredResults.slice(0, 100).map((stock, ind) => (
              <ResultRow key={ind} onClick={() => addStock(user.id, stock)}>
                <Col>
                  <label>Ticker</label>
                  <p>{stock.ticker}</p>
                </Col>
                <Col>
                  <label>Company</label>
                  <p>{stock.name}</p>
                </Col>
              </ResultRow>
            ))}
          </ResultsWrapper>
        ) : null}
      </Results>
    </Container>
  );
};

export default SearchStocks;

// styles
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid #333;
`;
const Input = styled.input`
  width: 70%;
`;
const Results = styled.div`
  width: 90%;
  max-height: 300px;
`;
const ResultsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: scroll;
`;
const ResultRow = styled.div`
  &:hover {
    background-color: #999;
  }
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 0 1rem;
  cursor: pointer;

  label {
    text-align: right;
    padding-right: 1rem;
  }
  /* border: 1px solid red; */
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
`;
