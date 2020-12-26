import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import StockToolbar from "./StockToolbar";
import { formatDateData } from "../../resources/stockUtilities";

const StocksWrapper = ({ stocks }) => {
  const [stockPayoutsDate] = useState(
    stocks.payouts ? formatDateData(stocks.payouts[0].payDate) : null
  );
  const [stockPayoutsAmount] = useState(
    stocks.payouts ? stocks.payouts[0].amount : null
  );

  useEffect(() => {}, [stocks]);

  return (
    <Container>
      {stocks.map((stock, ind) => (
        <StockLine key={stock.ticker}>
          <Row>
            <Col>
              <Name>
                <span>{stock.name}</span>
              </Name>
              <Ticker>
                <span>{stock.ticker}</span>
              </Ticker>
            </Col>
            <Row>
              <SectionDiv>
                <StockLabel>
                  Last Dividend:
                  <span>
                    {stockPayoutsAmount
                      ? parseFloat(stockPayoutsAmount).toFixed(2)
                      : "No payments"}
                  </span>
                </StockLabel>
              </SectionDiv>
              <SectionDiv>
                <StockLabel>
                  Last Payout:
                  <span>
                    {stockPayoutsDate ? stockPayoutsDate : "No payments"}
                  </span>
                </StockLabel>
              </SectionDiv>
            </Row>
          </Row>
          <StockToolbar stock={stock} key={stock.ticker} />
        </StockLine>
      ))}
    </Container>
  );
};

export default StocksWrapper;

// styles
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 0 4rem;
  /* border: 3px solid green; */

  @media ${device.mobileL} {
    padding: 0 0.5rem 4rem;
  }
`;
const StockLine = styled.div`
  width: 100%;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  margin: 0.3rem 0;
  background-color: ${(props) => props.background};
  box-shadow: 2px 3px 8px 0 #999;
  border-radius: 8px;
  border: 2px solid #7249d1;
`;
const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* border: 1px solid green; */

  @media ${device.tabletS} {
    flex-wrap: nowrap;
    width: 100%;
  }
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  /* width: ${(props) => props.wid}; */
  width: 100%;
  /* border: 1px solid green; */
  @media ${device.tabletS} {
    width: 50%;
  }
`;
const Name = styled.div`
  font-size: 1.3rem;
  color: #000;
  padding-left: 0.3rem;

  span {
    font-weight: bolder;
  }
`;
const Ticker = styled.div`
  font-size: 1rem;
  color: #555;
  padding-left: 0.3rem;
  margin-top: 0.2rem;
`;
const SectionDiv = styled.div`
  height: 50%;
  width: 50%;
  padding: 0.5rem 0.3rem;

  span {
    padding: 0 0.7rem;
  }
`;
const StockLabel = styled.label`
  font-size: 1rem;
  color: #999;
`;
