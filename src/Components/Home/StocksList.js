import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { getUserStocks } from "../../resources/stockUtilities";
import LoadingIcon from "../Shared/LoadingIcon";
import StocksWrapper from "./StocksWrapper";

const StocksList = ({ refresh }) => {
  const [userStocks, setUserStocks] = useState(null);
  const [user] = useState(JSON.parse(localStorage.getItem("user")));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (userStocks) {
      setLoading(false);
    } else {
      updateUserStocks();
    }
  }, [userStocks, refresh]);

  const updateUserStocks = async () => {
    let stocks = await getUserStocks(user.id);
    setUserStocks(stocks);
    setLoading(false);
  };

  return (
    <Container>
      <h1>Your Stocks:</h1>
      {loading ? (
        <LoadingIcon />
      ) : (
        <StockContainer>
          {userStocks.length ? (
            <StocksWrapper stocks={userStocks} />
          ) : (
            "Add some stocks!"
          )}
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
  background-color: #fff;

  @media ${device.tabletS} {
    /* padding: 0 1rem; */
  }
`;
const StockContainer = styled.div`
  max-width: 900px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid red;
`;
