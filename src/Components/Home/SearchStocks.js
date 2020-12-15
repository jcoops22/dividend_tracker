import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { updateStocks } from "../../resources/stockUtilities";

const SearchStocks = ({ allstocks }) => {
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    filterResults(query);
    updateStocks();
    // console.log(filteredResults);
  }, [query]);

  const filterResults = (val) => {
    let temp = allstocks.filter((stock) => {
      return stock["ACT Symbol"].toLowerCase().includes(val.toLowerCase()) ||
        stock["Company Name"].toLowerCase().includes(val.toLowerCase())
        ? stock
        : null;
    });
    setFilteredResults(temp);
  };

  return (
    <Container>
      <Input
        type="text"
        placeholder="Enter Symbol or Company Name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Results>
        <h3>Results:</h3>
        {query && !query.includes(" ") ? (
          <ResultsWrapper>
            {filteredResults.map((stock, ind) => (
              <ResultRow key={ind}>
                <Col>
                  <label>Ticker</label>
                  <p>{stock["ACT Symbol"]}</p>
                </Col>
                <Col>
                  <label>Company</label>
                  <p>{stock["Company Name"]}</p>
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 0 1rem;

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
