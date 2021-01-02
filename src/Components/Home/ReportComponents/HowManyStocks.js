import React, { useState, useEffect } from "react";
import styled from "styled-components";

const HowManyStocks = ({ stocks, user, tickers, divs }) => {
  const [mostDividends, setMostDividends] = useState(null);
  useEffect(() => {
    console.log(mostDividends);
    if (!mostDividends) {
      getMostValuable(stocks);
    }
  }, [mostDividends]);
  const totalPayouts = (arr) => {
    return arr.payouts
      ? arr.payouts.reduce(
          (a, b) =>
            parseFloat(a.amount).toFixed(2) + parseFloat(b.amount).toFixed(2)
        )
      : 0;
  };
  const getMostValuable = (arr) => {
    let arrWithPayouts = arr.map((stock) =>
      stock.payouts
        ? { ...stock, total: totalPayouts(stock.payouts) }
        : { ...stock, total: 0 }
    );

    console.log(arrWithPayouts);
  };
  return (
    <Container>
      <P>
        You currently have <b>{stocks.length}</b>
        {stocks.length === 1 ? " holding" : " holdings"}.
      </P>
      {mostDividends ? (
        <P>
          Your most dividend paid stock is {mostDividends.name}
          <span>({mostDividends.ticker})</span>
        </P>
      ) : null}
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
