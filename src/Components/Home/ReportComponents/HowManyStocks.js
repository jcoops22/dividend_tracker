import React from "react";
import styled from "styled-components";

const HowManyStocks = ({ stocks, user, tickers, divs }) => {
  return (
    <Container>
      <P>
        You are currently tracking <b>{stocks.length}</b>
        {stocks.length === 1 ? " holding" : " holdings"}.
      </P>
    </Container>
  );
};

export default HowManyStocks;

// styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const P = styled.p`
  font-size: 1.3rem;
`;
