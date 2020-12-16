import React from "react";
import styled from "styled-components";

const StocksWrapper = ({ stocks }) => {
  return (
    <Container>
      {stocks.map((stock, ind) => (
        <StockLine key={ind}>
          <StockLabel>Ticker:</StockLabel>
          {stock.ticker}
          <StockLabel>Company Name:</StockLabel>
          {stock.name}
        </StockLine>
      ))}
    </Container>
  );
};

export default StocksWrapper;

// styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
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
