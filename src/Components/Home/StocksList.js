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

const StocksList = ({
  selectCurrentUser,
  setCurrentUserStocks,
  selectCurrentUserStocks,
}) => {
  const [loading, setLoading] = useState(true);
  const [filteredStocks, setFilteredStocks] = useState(selectCurrentUserStocks);
  const [query, setQuery] = useState(null);
  const [sortType, setSortType] = useState(null);
  const [scrollUpIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608673604/Dividend%20Tracker/Icons/Stocklist/up-arrow-svgrepo-com_ghr6pj.svg"
  );
  const [searchIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608665469/Dividend%20Tracker/Icons/Stocklist/search-svgrepo-com_gfadnk.svg"
  );

  useEffect(() => {
    // handle searching
    if (!query) {
      setLoading(true);
      setSortType(null);
      updateUserStocks();
    } else {
      handleSearchFilter(query);
    }
  }, [setCurrentUserStocks, query]);

  const updateUserStocks = async () => {
    let stocks = await getUserStocks(selectCurrentUser.id);
    setCurrentUserStocks(stocks);
    setFilteredStocks(stocks);

    setLoading(false);
  };
  // sort the filteredStocks array
  const handleSort = (arr, sort) => {
    // NEWEST
    if (sort === "Newest") {
      return arr.sort((a, b) => (a.added < b.added ? 1 : -1));
    }
    // OLDEST
    else if (sort === "Oldest") {
      return arr.sort((a, b) => (a.added > b.added ? 1 : -1));
    }
    // MOST DIVIDENDS
    else if (sort === "Most Dividends") {
      let amountsArr = arr.map((s) => {
        if (s.payouts) {
          return { ...s, total: getTotal(s.payouts) };
        } else {
          return { ...s, total: 0 };
        }
      });
      return amountsArr.sort((a, b) => (a.total < b.total ? 1 : -1));
    }
    // LEAST DIVIDENDS
    else if (sort === "Least Dividends") {
      let amountsArr = arr.map((s) => {
        if (s.payouts) {
          return { ...s, total: getTotal(s.payouts) };
        } else {
          return { ...s, total: 0 };
        }
      });
      return amountsArr.sort((a, b) => (a.total > b.total ? 1 : -1));
    }
    // MOST PAYOUTS
    else if (sort === "Most Payouts") {
      let payoutsArr = arr.map((s) => {
        if (s.payouts) {
          return { ...s };
        } else {
          return { ...s, payouts: [] };
        }
      });
      return payoutsArr.sort((a, b) =>
        a.payouts.length < b.payouts.length ? 1 : -1
      );
    } else {
      return arr;
    }
  };
  // generate total for dividend sorts
  const getTotal = (divsArr) => {
    let total = 0;
    divsArr.forEach((payout) => {
      let amount = parseFloat(payout.amount);
      total += amount;
    });
    console.log(total);
    return total;
  };

  // handle the query and set filtered results
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
      <h1>
        Your Stocks:{" "}
        <span>
          ({query ? filteredStocks.length : selectCurrentUserStocks.length})
        </span>
      </h1>
      {loading ? (
        <LoadingIcon big={true} height={"6rem"} />
      ) : (
        <StockContainer>
          <UtilitiesRow>
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
            <SortWrapper>
              <p>Sort by:</p>
              <SortBy
                onChange={(e) => {
                  setSortType(e.target.value);
                  handleSort(e.target.value);
                }}
              >
                <option default value={null}>
                  None
                </option>
                <option value={"Most Dividends"}>Most Dividends</option>
                <option value={"Least Dividends"}>Least Dividends</option>
                <option value={"Most Payouts"}>Most Payouts</option>
                <option value={"Newest"}>Newest</option>
                <option value={"Oldest"}>Oldest</option>
              </SortBy>
            </SortWrapper>
          </UtilitiesRow>
          {selectCurrentUserStocks.length ? (
            <StocksWrapper
              stocks={
                query
                  ? handleSort(filteredStocks, sortType)
                  : handleSort(selectCurrentUserStocks, sortType)
              }
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

  h1 {
    margin-bottom: 0.8rem;

    span {
      font-size: 1.3rem;
    }
  }
`;
const StockContainer = styled.div`
  width: 100%;
  max-width: 1024px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 0.3rem;
  /* border: 1px solid red; */
`;
const UtilitiesRow = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: center;

  @media ${device.tabletS} {
    flex-direction: row;
  }
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
const SortWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */

  p {
    margin-left: 1rem;
  }
`;
const SortBy = styled.select`
  position: relative;
  width: 8rem;
  height: 2rem;
  margin-left: 1rem;
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
