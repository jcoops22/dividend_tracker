import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "../Shared/Header";
import Toolbar from "../Shared/Toolbar";
import axios from "axios";

const Home = () => {
  useEffect(() => {
    let api_KEY = "3M8136KILLJ20M9K";
    // let api_URL_TIME_Series = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=60min&apikey=${api_KEY}`;
    let api_URL_Overview = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=${api_KEY}`;

    axios
      .get(api_URL_Overview)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <Header text={"Dividend Tracker"} />
      <Toolbar />
    </Container>
  );
};

export default Home;
// styles
const Container = styled.div`
  width: 100%;
  /* border: 1px solid red; */
`;
