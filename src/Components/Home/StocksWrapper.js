import React, { useEffect } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import StockToolbar from "./StockToolbar";
import { formatDateData } from "../../resources/stockUtilities";
import TickerIcon from "./TickerIcon";

const StocksWrapper = ({ stocks }) => {
  useEffect(() => {}, [stocks]);

  // convert to comma notation
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Container>
      {stocks.map((stock) => (
        <StockLine key={stock.ticker}>
          <Row>
            <Col>
              <Name>
                <span>{stock.name.split(" ").slice(0, 2).join(" ")}</span>
                <TickerIcon symbol={stock.ticker} />
              </Name>
              <Ticker>
                <span>{stock.ticker}</span>
              </Ticker>
            </Col>
            <Row>
              <SectionDiv>
                <StockLabel>
                  Last Dividend:
                  {stock.payouts ? (
                    <span>
                      {stock.payouts.length
                        ? "$" +
                          numberWithCommas(
                            parseFloat(stock.payouts[0].amount).toFixed(2)
                          )
                        : "No payments"}
                    </span>
                  ) : (
                    <span>No Payments</span>
                  )}
                </StockLabel>
              </SectionDiv>
              <SectionDiv>
                <StockLabel>
                  Last Payout:
                  {stock.payouts ? (
                    <span>
                      {stock.payouts.length
                        ? formatDateData(stock.payouts[0].payDate)
                        : "No payments"}
                    </span>
                  ) : (
                    <span>No Payments</span>
                  )}
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
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 1.2rem;
  padding: 0.5rem 0;
  margin: 0.3rem 0;
  background-color: ${(props) => props.background};
  border-radius: 8px;
  transition-duration: 0.3s;
  box-shadow: 2px 3px 8px 0 #999;
  /* border: 2px solid red; */

  @media ${device.tabletS} {
    &:hover {
      box-shadow: 2px 3px 8px 0 #999;
    }
    box-shadow: none;
  }
`;
const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  /* border: 1px solid green; */

  @media ${device.tabletS} {
    flex-wrap: nowrap;
    width: 100%;
  }
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* border: 1px solid green; */

  @media ${device.tabletS} {
    width: 50%;
  }
`;
const Name = styled.div`
  position: relative;
  font-size: 1.3rem;
  color: #000;
  padding-left: 0.3rem;
  /* border: 1px solid red; */

  span {
    font-weight: bolder;
  }
`;
const Ticker = styled.div`
  font-size: 1rem;
  color: #555;
  padding-left: 0.3rem;
  margin-top: 0.2rem;
  /* border: 1px solid red; */
`;
const SectionDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  padding: 0.5rem 0.3rem;
  /* border: 1px solid red; */

  span {
    padding: 0 0.7rem;
  }
`;
const StockLabel = styled.label`
  font-size: 0.8rem;
  color: #999;
  /* border: 1px solid red; */

  span {
    color: #333;
    font-weight: bold;
  }

  @media ${device.tabletS} {
    font-size: 1rem;
  }
`;
