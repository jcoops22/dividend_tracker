import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { addStock, deleteStock } from "../../resources/stockUtilities";
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
  const [alreadyAddedIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608509562/Dividend%20Tracker/Icons/SearchResults/check-svgrepo-com_1_g7pyz8.svg"
  );
  const [addToListIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608506065/Dividend%20Tracker/Icons/SearchResults/add-svgrepo-com_gihegx.svg"
  );

  useEffect(() => {
    if (!tickersArr) {
      buildTickersArr(selectCurrentUserStocks);
    }
    // set the focus on the input on render
    document.querySelector("#search_input").focus();
    filterResults(query);
    alreadyAddedCheck(query);
  }, [query, tickersArr]);

  // filter the query through the array of stocks
  const filterResults = (query) => {
    let temp = allstocks.filter((stock) => {
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
    let success = await addStock(user, stock);
    if (success.message === undefined) {
      setCurrentUserStocks(selectCurrentUserStocks.concat(stock));
      setAlreadyAdded(!alreadyAdded);
      let arr = tickersArr;
      arr.push(query.toUpperCase());
      setTickersArr(arr);
    } else {
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
    let success = await deleteStock(user, stock);
    if (success.message === undefined) {
      console.log("success");
      setCurrentUserStocks(
        selectCurrentUserStocks.filter(
          (stocks) => stocks.ticker !== stock.ticker
        )
      );
      setAlreadyAdded(!alreadyAdded);
      setTickersArr(
        tickersArr.filter((ticker) => query.toUpperCase() !== ticker)
      );
    } else {
      console.log(success.message);
    }
  };

  return (
    <Container id={"searchResults"}>
      <h5>Search:</h5>
      <Input
        autoComplete="off"
        id="search_input"
        type="text"
        placeholder="Enter Symbol/Ticker value"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={query.length ? { textTransform: "uppercase" } : null}
      />
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
                <IconsDiv>
                  {alreadyAdded ? (
                    <AddedIcon
                      src={alreadyAddedIcon}
                      alt="added already"
                      onClick={() => handleDelete(selectCurrentUser.id, stock)}
                    />
                  ) : (
                    <AddIcon
                      src={addToListIcon}
                      alt="add to list"
                      onClick={() =>
                        handleAddStock(selectCurrentUser.id, stock)
                      }
                    />
                  )}
                </IconsDiv>
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
  position: relative;
  left: 100%;
  width: 100%;
  max-width: 530px;
  height: 12rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5rem;
  animation: slide_in_Search_from_left 0.3s forwards;
  background-color: #fff;
  /* border: 2px solid blue; */

  h5 {
    width: 100%;
    padding-left: 2rem;
    font-size: 1rem;
    /* border: 1px solid red; */
  }

  @keyframes slide_in_Search_from_left {
    to {
      left: 50%;
    }
  }
`;
const Input = styled.input`
  &:focus {
    outline-color: #7249d1;
  }
  width: 50%;
  padding: 0.4rem;
  font-size: 17px;
  border-radius: 3px;
  border: 2px solid #7249d1;
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
  /* border: 1px solid red; */
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
const AddedIcon = styled.img`
  width: 1.5rem;
`;
const AddIcon = styled.img`
  width: 1.5rem;
`;
