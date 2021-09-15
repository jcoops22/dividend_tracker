import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  addStock,
  deleteStock,
  getTickerImg,
} from "../../resources/stockUtilities";
import TransformIcon from "../Shared/TransformIcon";
import AddMissing from "./AddMissing";
import { UserContext } from "../Context/UserProvider";
import { StocksContext } from "../Context/StocksProvider";

const SearchStocks = () => {
  const [loading, setLoading] = useState(false);
  const {
    currentUser,
    currentUserStocks,
    setCurrentUserStocksAction,
  } = useContext(UserContext);
  const { stocks } = useContext(StocksContext);
  const [query, setQuery] = useState("");
  const [tickersArr, setTickersArr] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [alreadyAdded, setAlreadyAdded] = useState(null);
  const [showAddMissing, setShowAddMissing] = useState(false);
  const [alreadyAddedIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608509562/Dividend%20Tracker/Icons/SearchResults/check-svgrepo-com_1_g7pyz8.svg"
  );
  const [addToListIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608506065/Dividend%20Tracker/Icons/SearchResults/add-svgrepo-com_gihegx.svg"
  );
  const [littleLoader] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608614181/Dividend%20Tracker/Icons/SearchResults/loading-loader-svgrepo-com_urrwap.svg"
  );

  useEffect(() => {
    // console.log(!!query && filteredResults.length === 0);
    if (!tickersArr) {
      buildTickersArr(currentUserStocks);
    }
    // set the focus on the input on render
    document.querySelector("#search_input").focus();
    filterResults(query);
    alreadyAddedCheck(query);
  }, [query, tickersArr]);

  // filter the query through the array of stocks
  const filterResults = (query) => {
    let temp = stocks.filter((stock) => {
      return stock.ticker.toLowerCase() === query.toLowerCase() ? stock : null;
    });
    setFilteredResults(temp);
  };
  // make ticker array to compare whats been added already
  const buildTickersArr = (arr) => {
    setTickersArr(
      arr.map((stockObj) => {
        return stockObj.ticker;
      })
    );
  };
  // adding stock function
  const handleAddStock = async (user, stock) => {
    setLoading(true);
    let timeStampedStock = {
      ...stock,
      added: new Date().getTime(),
      imgUrl: await getTickerImg(stock.ticker),
    };
    let success = await addStock(user, timeStampedStock);
    if (success.message === undefined) {
      console.log(success);
      setCurrentUserStocksAction(currentUserStocks.concat(timeStampedStock));
      window.localStorage.setItem(
        "currentUser",
        JSON.stringify({
          ...currentUser,
          stocks: currentUserStocks.concat(timeStampedStock),
        })
      );
      setAlreadyAdded(!alreadyAdded);
      let arr = tickersArr;
      arr.push(query.toUpperCase());
      setTickersArr(arr);
      setLoading(false);
    } else {
      setLoading(false);
      console.log(success.message);
    }
  };
  // determine the icons for whats been added
  const alreadyAddedCheck = (query) => {
    if (tickersArr) {
      setAlreadyAdded(
        !!tickersArr.some((ticker) => query.toUpperCase() === ticker)
      );
    }
  };
  // handle unchecking the match aka deleting
  const handleDelete = async (user, stock) => {
    setLoading(true);
    let success = await deleteStock(user, stock);
    if (success.message === undefined) {
      console.log("success");
      setCurrentUserStocksAction(
        currentUserStocks.filter((stocks) => stocks.ticker !== stock.ticker)
      );
      setAlreadyAdded(!alreadyAdded);
      setTickersArr(
        tickersArr.filter((ticker) => query.toUpperCase() !== ticker)
      );
      setLoading(false);
    } else {
      setLoading(false);
      console.log(success.message);
    }
  };

  return (
    <Container id={"searchResults"} onClick={(e) => e.stopPropagation()}>
      <h5>Search:</h5>
      <InputWrapper>
        <Input
          autoComplete="off"
          id="search_input"
          type="text"
          placeholder="Enter Symbol/Ticker value"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={query.length ? { textTransform: "uppercase" } : null}
        />
        {query.length ? (
          <span onClick={() => setQuery("")}>&#10005; </span>
        ) : null}
      </InputWrapper>
      <Results>
        <h4>Results:</h4>
        {query && query !== " " ? (
          <ResultsWrapper>
            {filteredResults.slice(0, 100).map((stock, ind) => (
              <ResultRow key={ind}>
                <Col width={"30%"}>
                  <label>Ticker</label>
                  <p>{stock.ticker}</p>
                </Col>
                <Col width={"70%"}>
                  <label>Company</label>
                  <Row>
                    <p>{stock.name}</p>
                  </Row>
                </Col>
                {loading ? (
                  <AlreadyAddedLoader>
                    <img src={littleLoader} alt="little loader" />
                  </AlreadyAddedLoader>
                ) : (
                  <IconsDiv
                    onClick={() =>
                      alreadyAdded
                        ? handleDelete(currentUser.id, stock)
                        : handleAddStock(currentUser.id, stock)
                    }
                  >
                    <TransformIcon
                      first={addToListIcon}
                      second={alreadyAddedIcon}
                      w1={"1.5rem"}
                      w2={"1.5rem"}
                      transform={alreadyAdded}
                    />
                  </IconsDiv>
                )}
              </ResultRow>
            ))}
          </ResultsWrapper>
        ) : null}
        <ResultsWrapper>
          {filteredResults.length === 0 && query ? (
            <NoResultRow>
              {!showAddMissing ? <p>Sorry, no results</p> : null}
              <div>
                {!showAddMissing ? (
                  <AddMissingText onClick={() => setShowAddMissing(true)}>
                    Need to add a missing stock/fund?
                  </AddMissingText>
                ) : (
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "80%",
                    }}
                  >
                    <span style={{ color: "#7249d1" }}>Add stock:</span>
                    <span
                      style={{
                        width: "1rem",
                        cursor: "pointer",
                        color: "#FF3501",
                      }}
                      onClick={() => setShowAddMissing(false)}
                    >
                      &#10005;
                    </span>
                  </span>
                )}
              </div>
              {showAddMissing ? <AddMissing user={currentUser.id} /> : null}
            </NoResultRow>
          ) : null}
        </ResultsWrapper>
      </Results>
    </Container>
  );
};

export default SearchStocks;

// styles
const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 530px;
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5rem;
  background-color: #fff;
  font-family: "Exo", sans-serif;
  /* border: 1px solid #333; */

  h5 {
    width: 100%;
    padding-left: 2rem;
    font-size: 1rem;
    /* border: 1px solid red; */
  }
`;
const InputWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  padding: 0 0.3rem;
  margin: 0.5rem 0;
  border-radius: 3px;
  border: 2px solid #7249d1;

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
const Input = styled.input`
  &:focus {
    outline: none;
    /* outline-color: #7249d1; */
  }
  position: relative;
  width: 220px;
  padding: 0.4rem;
  font-size: 17px;
  border-radius: 3px;
  font-family: "Exo", sans-serif;
  border: none;
  /* border: 2px solid #7249d1; */
`;
const Results = styled.div`
  width: 100%;
  /* border: 2px solid orange; */

  h4 {
    padding-top: 1.5rem;
    margin: 0.4rem 0;
  }
`;
const ResultsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: scroll;
  /* border: 1px solid red; */
`;
const ResultRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 0 1rem;
  /* box-shadow: 2px 3px 8px 0 #999; */
  cursor: default;
  /* border: 1px solid red; */

  label {
    height: 1rem;
    font-size: 0.9rem;
    text-align: right;
    padding-right: 1rem;
    /* border: 2px solid red; */
  }

  p {
    font-size: 1.2rem;
    /* border: 2px solid red; */
  }
`;
const NoResultRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  padding: 0 1rem;
  cursor: default;
  /* border: 1px solid red; */

  p {
    font-size: 1.2rem;
    /* border: 2px solid red; */
  }
`;
const AddMissingText = styled.span`
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  color: #7249d1;
`;
const Row = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: space-between;
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  width: ${(props) => props.width};
  /* border: 1px solid green; */
`;
const IconsDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  cursor: pointer;
  /* border: 1px solid red; */
`;
const AlreadyAddedLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  cursor: pointer;
  animation: spin_already_added_loader 1s linear forwards infinite;
  /* border: 1px solid red; */

  img {
    width: 1.5rem;
  }

  @keyframes spin_already_added_loader {
    to {
      transform: rotate(360deg);
    }
  }
`;
