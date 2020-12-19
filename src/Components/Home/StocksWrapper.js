import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StockToolbar from "./StockToolbar";

const StocksWrapper = ({ stocks }) => {
  const [selected, setSelected] = useState(false);
  const [overviewData, setOverviewData] = useState({});
  const [seriesData, setSeriesData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, [loading, overviewData, seriesData]);

  return (
    <Container>
      {stocks.map((stock, ind) => (
        <StockLine
          key={ind}
          onClick={() => {
            setSelected(stock.ticker);
          }}
        >
          <Row>
            <Col>
              <SectionDiv>
                <StockLabel>Company:</StockLabel>
                <span>{stock.name}</span>
              </SectionDiv>
              <SectionDiv>
                <StockLabel>Ticker:</StockLabel>
                <span>{stock.ticker}</span>
              </SectionDiv>
            </Col>
            <Col>
              <SectionDiv>
                <StockLabel>
                  Last Dividend: <span>{stock.last_dividend}</span>
                </StockLabel>
              </SectionDiv>
              <SectionDiv>
                <StockLabel>
                  Last Payout: <span>{stock.last_payment}</span>
                </StockLabel>
              </SectionDiv>
            </Col>
          </Row>
          <StockToolbar stock={stock} />
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
  padding-bottom: 4rem;
`;
const StockLine = styled.div`
  width: 100%;
  font-size: 1.2rem;
  color: blue;
  display: flex;
  flex-direction: column;
  border: 1px solid green;
`;
const Row = styled.div`
  display: flex;
  flex-wrap: nowrap;
  background-color: lightblue;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;
const SectionDiv = styled.div`
  height: 50%;
  padding: 0.5rem 0;

  span {
    padding: 0 0.7rem;
  }
`;
const StockLabel = styled.label`
  font-weight: bold;
  color: #999;
`;
