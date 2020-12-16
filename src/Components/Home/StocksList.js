import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import LoadingIcon from "../Shared/LoadingIcon";

const StocksList = ({ stocks }) => {
  const [userStocks, setUserStocks] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userStocks) {
      setLoading(false);
    }
  }, [userStocks]);

  return (
    <Container>
      <h1>Your Stocks:</h1>
      {userStocks ? (
        <StockWrapper>
          {userStocks.map((stock, ind) => (
            <StockLine key={ind}>
              <StockLabel>Ticker:</StockLabel>
              {stock.ticker}
              <StockLabel>Company Name:</StockLabel>
              {stock.name}
            </StockLine>
          ))}
        </StockWrapper>
      ) : (
        "Add some stocks to track your dividends"
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
const StockWrapper = styled.div`
  max-width: 900px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid red;
`;
const StockLine = styled.p`
  width: 100%;
  font-size: 1.2rem;
  color: blue;
  display: flex;
  align-items: center;
  border: 1px solid green;
`;
const StockLabel = styled.label`
  font-weight: bold;
  color: #999;
`;
