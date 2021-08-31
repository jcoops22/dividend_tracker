import React, { useEffect, useState } from "react";
import styled from "styled-components";

const DividendTotal = ({ stocks, user, tickers, divs }) => {
  useEffect(() => {
    console.log();
    // totalDividends(stocks);
  }, []);

  //  get total of payouts for each stock as an array
  const getPayoutsArray = (arr) => {
    let allpayouts = [];
    arr.map((stock) => {
      return stock.payouts.forEach((payout) => {
        allpayouts.push(parseFloat(payout.amount).toFixed(2));
      });
    });
    return allpayouts;
  };

  const totalDividends = (arr) => {
    let payouts = getPayoutsArray(arr);
    return payouts.reduce(
      (tot, next) => {
        return parseFloat(tot) + parseFloat(next);
      },
      [parseFloat(payouts[0])]
    );
  };

  //content
  return (
    <Container>
      <P>
        Total dividends earned to date:{" "}
        <strong>${totalDividends(stocks).toFixed(2)}</strong>
      </P>
    </Container>
  );
};

export default DividendTotal;

// styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const P = styled.p`
  font-size: 1rem;

  strong {
    font-weight: bolder;
    font-size: 1.2rem;
  }
`;
