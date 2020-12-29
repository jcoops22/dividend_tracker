import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { addStock, deleteStock } from "../../resources/stockUtilities";
import { selectCurrentUserStocks } from "../../redux/user/user-selectors";
import { setCurrentUserStocks } from "../../redux/user/user-actions";
import TransformIcon from "../Shared/TransformIcon";

const AddMissing = ({
  user,
  setCurrentUserStocks,
  selectCurrentUserStocks,
}) => {
  const [alreadyAddedIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608509562/Dividend%20Tracker/Icons/SearchResults/check-svgrepo-com_1_g7pyz8.svg"
  );
  const [addToListIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608506065/Dividend%20Tracker/Icons/SearchResults/add-svgrepo-com_gihegx.svg"
  );
  const [littleLoader] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608614181/Dividend%20Tracker/Icons/SearchResults/loading-loader-svgrepo-com_urrwap.svg"
  );
  const [alreadyAdded, setAlreadyAdded] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ticker, setTicker] = useState(null);
  const [name, setName] = useState(null);

  // adding stock function
  const handleAddStock = async (user, stock) => {
    setLoading(true);
    let timeStampeStock = { ...stock, added: new Date().getTime() };
    let success = await addStock(user, timeStampeStock);
    if (success.message === undefined) {
      console.log("from Add", success);
      setCurrentUserStocks(selectCurrentUserStocks.concat(timeStampeStock));
      setAlreadyAdded(!alreadyAdded);
      setLoading(false);
    } else {
      setLoading(false);
      console.log(success.message);
    }
  };

  // handle unchecking the match aka deleting
  const handleDelete = async (user, stock) => {
    setLoading(true);
    let success = await deleteStock(user, stock);
    if (success.message === undefined) {
      console.log("from delete", success);
      setCurrentUserStocks(
        selectCurrentUserStocks.filter(
          (stocks) => stocks.ticker !== stock.ticker
        )
      );
      setAlreadyAdded(!alreadyAdded);
      setLoading(false);
    } else {
      setLoading(false);
      console.log(success.message);
    }
  };

  const handleSubmit = () => {
    let stock = {
      ticker: ticker.toUpperCase(),
      name: name,
    };
    if (!alreadyAdded) {
      handleAddStock(user, stock);
    } else {
      handleDelete(user, stock);
    }
  };

  return (
    <Container>
      <Col>
        <label>Ticker/Symbol</label>
        <input
          type="text"
          placeholder="ticker"
          onChange={(e) => setTicker(e.target.value)}
          style={ticker ? { textTransform: "uppercase" } : null}
        />
      </Col>
      <Col>
        <label>Company Name</label>
        <input
          type="text"
          placeholder="company name"
          onChange={(e) => setName(e.target.value)}
        />
      </Col>
      <IconsDiv onClick={() => handleSubmit()}>
        {loading ? (
          <AlreadyAddedLoader>
            <img src={littleLoader} alt="little loader" />
          </AlreadyAddedLoader>
        ) : (
          <TransformIcon
            first={addToListIcon}
            second={alreadyAddedIcon}
            w1={"1.5rem"}
            w2={"1.5rem"}
            transform={alreadyAdded}
          />
        )}
      </IconsDiv>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  selectCurrentUserStocks: selectCurrentUserStocks,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUserStocks: (stocks) => dispatch(setCurrentUserStocks(stocks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMissing);

// styles
const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  /* border: 1px solid #333; */

  label {
    margin-top: 0.8rem;
  }

  input {
    font-family: "Exo", sans-serif;
    height: 2rem;
    width: 100%;
    font-size: 18px;
    padding: 0.2rem 0 0.2rem 0.2rem;
  }

  input::placeholder {
    color: #ccc;
  }
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
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
