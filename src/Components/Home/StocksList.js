import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { getUserStocks } from "../../resources/stockUtilities";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import LoadingIcon from "../Shared/LoadingIcon";
import StocksWrapper from "./StocksWrapper";
import {
  selectCurrentUser,
  selectCurrentUserStocks,
} from "../../redux/user/user-selectors";
import { setCurrentUserStocks } from "../../redux/user/user-actions";
import { getSuggestedQuery } from "@testing-library/react";

const StocksList = ({
  selectCurrentUser,
  setCurrentUserStocks,
  selectCurrentUserStocks,
}) => {
  const [loading, setLoading] = useState(true);
  const [filteredStocks, setFilteredStocks] = useState(selectCurrentUserStocks);
  const [query, setQuery] = useState(null);

  useEffect(() => {
    // handle searching
    if (!query) {
      setLoading(true);
      updateUserStocks();
      setFilteredStocks(selectCurrentUserStocks);
    } else {
      handleSearchFilter(query);
    }
  }, [setCurrentUserStocks, query]);

  const updateUserStocks = async () => {
    let stocks = await getUserStocks(selectCurrentUser.id);
    setCurrentUserStocks(stocks);
    setLoading(false);
    console.log(stocks);
  };

  const handleSearchFilter = (query) => {
    if (query.length) {
      console.log(" in the IF");
      setFilteredStocks(
        selectCurrentUserStocks.filter(
          (stock) =>
            stock.name.toLowerCase().includes(query.toLowerCase()) ||
            stock.ticker.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  return (
    <Container>
      <h1>Your Stocks:</h1>
      {loading ? (
        <LoadingIcon big={true} height={"6rem"} />
      ) : (
        <StockContainer>
          <SearchBar>
            <input
              type="text"
              placeholder="search your stocks"
              onChange={(e) => setQuery(e.target.value)}
            />
          </SearchBar>
          {selectCurrentUserStocks.length ? (
            <StocksWrapper stocks={filteredStocks} />
          ) : (
            "Add some stocks!"
          )}
        </StockContainer>
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(StocksList);

// styles
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: blue; */
`;
const StockContainer = styled.div`
  width: 100%;
  max-width: 1024px;
  display: flex;
  align-items: center;
  flex-direction: column;
  /* border: 1px solid red; */
`;
const SearchBar = styled.div`
  width: 80px;
  height: 3rem;

  input {
    width: 100%;
    border: 2px solid red;
  }
`;
