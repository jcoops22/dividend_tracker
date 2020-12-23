import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { getUserStocks } from "../../resources/stockUtilities";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import LoadingIcon from "../Shared/LoadingIcon";
import StocksWrapper from "./StocksWrapper";
import { selectReload } from "../../redux/stocks/stocks-selectors";
import {
  selectCurrentUser,
  selectCurrentUserStocks,
} from "../../redux/user/user-selectors";
import { setCurrentUserStocks } from "../../redux/user/user-actions";

const StocksList = ({
  selectCurrentUser,
  setCurrentUserStocks,
  selectCurrentUserStocks,
  selectReload,
}) => {
  const [loading, setLoading] = useState(true);
  const [filteredStocks, setFilteredStocks] = useState(selectCurrentUserStocks);
  const [query, setQuery] = useState(null);
  const [scrollUpIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608673604/Dividend%20Tracker/Icons/Stocklist/up-arrow-svgrepo-com_ghr6pj.svg"
  );
  const [searchIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608665469/Dividend%20Tracker/Icons/Stocklist/search-svgrepo-com_gfadnk.svg"
  );

  useEffect(() => {
    console.log("we reloaded");
    // handle searching
    if (!query) {
      setLoading(true);
      updateUserStocks();
    } else {
      handleSearchFilter(query);
    }
  }, [setCurrentUserStocks, query, selectReload]);

  const updateUserStocks = async () => {
    let stocks = await getUserStocks(selectCurrentUser.id);
    setCurrentUserStocks(stocks);
    setFilteredStocks(stocks);
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
              autoFocus
              type="text"
              placeholder="search your stocks"
              onChange={(e) => setQuery(e.target.value)}
            />
            {query ? (
              <span onClick={() => setQuery(null)}> &#10005; </span>
            ) : null}
          </SearchBar>
          {selectCurrentUserStocks.length ? (
            <StocksWrapper
              stocks={query ? filteredStocks : selectCurrentUserStocks}
            />
          ) : (
            "Add some stocks!"
          )}
          {selectCurrentUserStocks.length > 6 ? (
            <ScrollUp>
              <img
                src={scrollUpIcon}
                alt="scroll up"
                onClick={() => window.scrollTo(0, 0)}
              />
            </ScrollUp>
          ) : null}
        </StockContainer>
      )}
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  selectCurrentUser: selectCurrentUser,
  selectCurrentUserStocks: selectCurrentUserStocks,
  selectReload: selectReload,
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
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
    width: 200px;
    height: 100%;
    font-size: 18px;
    border: none;
    outline: none;
    /* border: 2px solid red; */
  }

  span {
    position: absolute;
    left: calc(100% - 1.5rem);
    width: 2rem;
    color: #ff3501;
    opacity: 0.7;
    cursor: pointer;
    /* border: 1px solid red; */
  }
`;

const ScrollUp = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  /* border: 1px solid red; */

  img {
    width: 3rem;
    opacity: 0;
    cursor: pointer;
    animation: fade_scrollIcon_in 0.5s forwards;
  }

  @keyframes fade_scrollIcon_in {
    to {
      opacity: 1;
    }
  }
`;
