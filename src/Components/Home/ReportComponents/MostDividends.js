import React, { useEffect, useState } from "react";
import styled from "styled-components";

const MostDividends = ({ stocks }) => {
  const [topStocks, setTopStocks] = useState([]);

  useEffect(() => {
    console.log(getMostDividends(stocks));
    console.log(topStocks);
  }, [topStocks]);

  const getMostDividends = (arr) => {
    let amountsArr = arr.map((s) => {
      if (s.payouts) {
        return { ...s, total: getTotal(s.payouts) };
      } else {
        return { ...s, total: 0 };
      }
    });
    setTopStocks(amountsArr.sort((a, b) => (a.total < b.total ? 1 : -1)));
  };

  // generate total for dividend sorts
  const getTotal = (divsArr) => {
    let total = 0;
    divsArr.forEach((payout) => {
      let amount = parseFloat(payout.amount);
      total += amount;
    });
    return total;
  };

  return (
    <Container>
      {topStocks ? (
        <div>
          <p>Your top paying stocks:</p>
          <ul>
            {topStocks.slice(0, 3).map((stock) => (
              <li>{stock.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        "You have no dividend payouts to track yet."
      )}
    </Container>
  );
};

export default MostDividends;

// styles
const Container = styled.section`
  padding: 1rem;
`;
