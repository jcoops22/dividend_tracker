import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Drawer from "./Drawer";

const StocksWrapper = ({ stocks }) => {
  const [selected, setSelected] = useState(false);
  const [overviewData, setOverviewData] = useState({});
  const [seriesData, setSeriesData] = useState({});
  const [drawerData, setDrawerData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDrawerData({
      ...seriesData,
      ...overviewData,
    });
  }, [loading, overviewData, seriesData]);

  const getTickerInfo = async (ticker) => {
    // intervals options: 1, 5, 15, 30, 60
    let interval = 5;
    let api_KEY = "3M8136KILLJ20M9K";
    let currentInfo = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=${interval}min&apikey=${api_KEY}`;
    let overview = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${api_KEY}`;
    // OVERVIEW API CALL
    await axios
      .get(overview)
      .then((data) => {
        setLoading(true);
        const {
          DividendYield,
          DividendPerShare,
          DividendDate,
          ExDividendDate,
        } = data.data;
        setOverviewData({
          yield: DividendYield * 100,
          divPerShare: DividendPerShare,
          exDivDate: ExDividendDate,
          payDivDate: DividendDate,
        });
      })
      .catch((err) => {
        setOverviewData({
          yield: "No data",
          divPerShare: "No data",
          exDivDate: "No data",
          payDivDate: "No data",
        });
        setDrawerData({
          value: "No Data",
        });
        setLoading(false);
        return err;
      });
    // TIME SERIES API CALL
    await axios
      .get(currentInfo)
      .then((data) => {
        let time_series_arr = Object.entries(data.data["Time Series (5min)"]);

        time_series_arr.map((arr) => {
          setSeriesData({
            lastUpdated: arr[0],
            value: "$" + arr[1]["4. close"].slice(0, -2),
          });
        });
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setSeriesData({
          lastUpdated: "No Data",
          value: "No Data",
        });
        setDrawerData({
          value: "No Data",
        });
        setLoading(false);
        return err;
      });
  };
  return (
    <Container>
      {stocks.map((stock, ind) => (
        <StockLine
          key={ind}
          onClick={() => {
            setSelected(stock.ticker);
            getTickerInfo(stock.ticker);
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
          <Drawer
            stock={stock}
            open={selected === stock.ticker}
            data={drawerData}
            loading={loading}
          />
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
