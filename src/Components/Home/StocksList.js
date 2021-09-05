import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { getUserStocks } from "../../resources/stockUtilities";
import LoadingIcon from "../Shared/LoadingIcon";
import StocksWrapper from "./StocksWrapper";
import { formatDateData } from "../../resources/stockUtilities";
import { UserContext } from "../Context/UserProvider";
import UtilitiesRow from "./UtilitiesRow";
import IncludeArchived from "../Home/IncludeArchived";

const StocksList = () => {
  const {
    currentUser,
    setCurrentUserStocksAction,
    currentUserStocks,
  } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [filteredStocks, setFilteredStocks] = useState(currentUserStocks);
  const [query, setQuery] = useState(null);
  const [showArchived, setShowArchived] = useState(false);
  const [sortType, setSortType] = useState("Newest Payouts");
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
      // setSortType(null);
      updateUserStocks();
    } else {
      handleSearchFilter(query);
    }
  }, [query]);

  const updateUserStocks = async () => {
    let stocks = await getUserStocks(currentUser.id);

    setCurrentUserStocksAction(stocks);
    setFilteredStocks(stocks);

    setLoading(false);
  };
  // sort the filteredStocks array
  const handleSort = (arr, sort, archived) => {
    //handle the archived toggle
    if (!archived) {
      arr = arr.filter((s) => {
        return s.isSold ? null : s;
      });
    }
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
    }
    // NEWEST PAYOUTS
    else if (sort === "Newest Payouts") {
      let payoutsArr = arr.map((s) => {
        if (s.payouts && s.payouts.length) {
          return {
            ...s,
            lastPayout: new Date(
              formatDateData(s.payouts[0].payDate)
            ).getTime(),
          };
        } else {
          return {
            ...s,
            payouts: [],
            lastPayout: 0,
          };
        }
      });
      return payoutsArr.sort((a, b) => (a.lastPayout < b.lastPayout ? 1 : -1));
    }
    // OLDEST PAYOUTS
    else if (sort === "Oldest Payouts") {
      let payoutsArr = arr.map((s) => {
        if (s.payouts && s.payouts.length) {
          return {
            ...s,
            lastPayout: new Date(
              formatDateData(s.payouts[0].payDate)
            ).getTime(),
          };
        } else {
          return {
            ...s,
            payouts: [],
            lastPayout: 0,
          };
        }
      });
      return payoutsArr.sort((a, b) => (a.lastPayout > b.lastPayout ? 1 : -1));
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
    return total;
  };
  // get the last payout date

  // handle the query and set filtered results
  const handleSearchFilter = (query) => {
    if (query.length) {
      setFilteredStocks(
        currentUserStocks.filter(
          (stock) =>
            stock.name.toLowerCase().includes(query.toLowerCase()) ||
            stock.ticker.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  return (
    <Container>
      <HeaderWrapper>
        <h1>Your Holdings:</h1>
        <span>
          (
          {query
            ? handleSort(filteredStocks, sortType, showArchived).length
            : handleSort(currentUserStocks, sortType, showArchived).length}
          )
        </span>
      </HeaderWrapper>
      {loading ? (
        <LoadingIcon big={true} height={"6rem"} />
      ) : (
        <StockContainer>
          <UtilitiesRow>
            <SearchBarWrapper>
              <p>Search:</p>
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
            </SearchBarWrapper>
            <SortWrapper>
              <SubWrapper>
                <p>Sort by:</p>
                <SortBy
                  onChange={(e) => {
                    setSortType(e.target.value);
                  }}
                >
                  <option value={"Newest Payouts"}>Newest Payouts</option>
                  <option value={"Oldest Payouts"}>Oldest Payouts</option>
                  <option value={"Most Dividends"}>Most Dividends</option>
                  <option value={"Least Dividends"}>Least Dividends</option>
                  <option value={"Most Payouts"}>Most Payouts</option>
                  <option value={"Newest"}>Newest</option>
                  <option value={"Oldest"}>Oldest</option>
                </SortBy>
              </SubWrapper>
              <IncludeArchived
                showArchived={showArchived}
                setShowArchived={setShowArchived}
              />
            </SortWrapper>
          </UtilitiesRow>
          {currentUserStocks.length ? (
            <StocksWrapper
              stocks={
                query
                  ? handleSort(filteredStocks, sortType, showArchived)
                  : handleSort(currentUserStocks, sortType, showArchived)
              }
            />
          ) : (
            "Add some stocks!"
          )}
          {currentUserStocks.length > 6 ? (
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

export default StocksList;

// styles
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${device.tabletS} {
    padding-top: 8rem;
  }
`;
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  width: 100%;
  /* border: 1px solid blue; */

  h1 {
    font-size: 2rem;
    width: fit-content;
    color: #7249d1;
    /* border: 1px solid blue; */
  }

  span {
    font-size: 1.3rem;
    margin-left: 1rem;
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
const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1rem;
  /* border: 1px solid red; */

  @media ${device.tabletS} {
    margin-top: 0;
    width: 50%;
    align-items: center;
  }

  p {
    font-weight: 700;
  }
`;
const SearchBar = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.4rem;
  max-width: 250px;
  padding: 0.3rem;
  border-radius: 3px;
  background-color: #fff;
  border: 2px solid #7249d1;

  img {
    width: 1.4rem;
    margin-right: 1rem;
  }
  input {
    width: 160px;
    height: 100%;
    font-size: 18px;
    font-weight: 700;
    font-family: "Exo", sans-serif;
    border: none;
    outline: none;
    /* border: 2px solid red; */

    ::placeholder {
      font-weight: 300;
    }
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
  width: 100%;
  min-width: 250px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* border: 1px solid red; */

  p {
    font-weight: 700;
  }

  @media ${device.mobileL} {
    justify-content: space-around;
  }

  @media ${device.tabletS} {
    width: 50%;
  }
`;
const SubWrapper = styled.div``;
const SortBy = styled.select`
  position: relative;
  width: 8rem;
  height: 2.2rem;
  border-radius: 8px;
  padding: 0.2rem;
  border: 2px solid #7249d1;
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
