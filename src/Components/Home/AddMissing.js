import React, { useState, useContext } from "react";
import styled from "styled-components";
import { addStock, deleteStock } from "../../resources/stockUtilities";
import TransformIcon from "../Shared/TransformIcon";
import { UserContext } from "../Context/UserProvider";

const AddMissing = ({ user }) => {
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
  const { currentUserStocks, setCurrentUserStocksAction } = useContext(
    UserContext
  );

  // adding stock function
  const handleAddStock = async (user, stock) => {
    setLoading(true);
    let timeStampedStock = { ...stock, added: new Date().getTime() };
    let success = await addStock(user, timeStampedStock);
    console.log(success);
    if (success.message === undefined) {
      setCurrentUserStocksAction(currentUserStocks.concat(timeStampedStock));
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
      setCurrentUserStocksAction(
        currentUserStocks.filter((stocks) => stocks.ticker !== stock.ticker)
      );
      setAlreadyAdded(!alreadyAdded);
      setLoading(false);
    } else {
      setLoading(false);
      alert(success.message);
      console.log(success.message);
    }
  };
  // handle add of custom stock
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
      <IconsDiv onClick={() => (name && ticker ? handleSubmit() : null)}>
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

export default AddMissing;

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
