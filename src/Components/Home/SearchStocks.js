import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { addStock } from "../../resources/stockUtilities";
import {
  selectCurrentUser,
  selectCurrentUserStocks,
} from "../../redux/user/user-selectors";
import { setCurrentUserStocks } from "../../redux/user/user-actions";

const SearchStocks = ({
  allstocks,
  selectCurrentUser,
  setCurrentUserStocks,
  selectCurrentUserStocks,
}) => {
  const [query, setQuery] = useState("");
  const [tickersArr, setTickersArr] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [alreadyAdded, setAlreadyAdded] = useState(null);
  const [alreadyAddedIcon] = useState("");
  const [addToListIcon] = useState("");

  useEffect(() => {
    if (!tickersArr) {
      buildTickersArr(selectCurrentUserStocks);
    }
    // set the focus on the input on render
    document.querySelector("#search_input").focus();
    filterResults(query);
    alreadyAddedCheck(query);
  }, [query, tickersArr]);

  const filterResults = (query) => {
    let temp = allstocks.filter((stock) => {
      return stock.ticker.toLowerCase() === query.toLowerCase() ? stock : null;
    });
    setFilteredResults(temp);
  };

  const handleAddStock = async (user, stock) => {
    let success = await addStock(user, stock);
    if (success.message === undefined) {
      setCurrentUserStocks(selectCurrentUserStocks.concat(stock));
    } else {
      console.log(success.message);
    }
  };

  const buildTickersArr = (arr) => {
    setTickersArr(
      arr.map((stockObj) => {
        return stockObj.ticker;
      })
    );
  };

  const alreadyAddedCheck = (query) => {
    if (tickersArr) {
      setAlreadyAdded(
        !!tickersArr.some((ticker) => query.toUpperCase() === ticker)
      );
    }
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
              <ResultRow
                key={ind}
                onClick={() => handleAddStock(selectCurrentUser.id, stock)}
              >
                <Col>
                  <label>Ticker</label>
                  <p>{stock.ticker}</p>
                </Col>
                <Col>
                  <label>Company</label>
                  <p>{stock.name}</p>
                </Col>
                {alreadyAdded ? (
                  <AddedIcon src={alreadyAddedIcon} alt="added already" />
                ) : (
                  <AddIcon src={addToListIcon} alt="add to list" />
                )}
              </ResultRow>
            ))}
          </ResultsWrapper>
        ) : null}
      </Results>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  selectCurrentUser: selectCurrentUser,
  selectCurrentUserStocks: selectCurrentUserStocks,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUserStocks: (stocks) => dispatch(setCurrentUserStocks(stocks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchStocks);

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
const AddedIcon = styled.img`
  width: 10px;
`;
const AddIcon = styled.img`
  width: 10px;
`;
