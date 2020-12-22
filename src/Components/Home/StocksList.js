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
  const [searchIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608665469/Dividend%20Tracker/Icons/Stocklist/search-svgrepo-com_gfadnk.svg"
  );

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
            <img src={searchIcon} alt="search" />
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 220px;
  height: 3rem;
  padding: 0 0.3rem;
  margin: 0.5rem 0;
  border-radius: 3px;
  border: 2px solid #7249d1;

  img {
    width: 1.8rem;
    margin-right: 1rem;
  }
  input {
    width: 100%;
    height: 100%;
    font-size: 18px;
    border: none;
    outline: none;
    /* border: 2px solid red; */
  }
`;
