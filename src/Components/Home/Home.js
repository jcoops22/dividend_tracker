import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { firestore } from "../Firebase/firebase";
import Header from "../Shared/Header";
import Toolbar from "../Shared/Toolbar";
import StocksList from "./StocksList";
import LoadingIcon from "../Shared/LoadingIcon";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allStocks, setAllStocks] = useState(
    JSON.parse(localStorage.getItem("symbol"))
  );

  useEffect(() => {
    let api_KEY = "3M8136KILLJ20M9K";
    // let api_URL_TIME_Series = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=60min&apikey=${api_KEY}`;
    let api_URL_Overview = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=${api_KEY}`;

    axios
      .get(api_URL_Overview)
      .then((data) => {
        // console.log(data);
      })
      .catch((err) => console.log(err));
    if (!localStorage.symbol) {
      getStocks();
    }
  }, []);

  const getStocks = () => {
    setLoading(true);
    const stocksCollectionRef = firestore.collection("symbols");
    stocksCollectionRef.get().then((data) => {
      let stocksArr = data.docs[0].data().symbols;
      window.localStorage.setItem("symbol", JSON.stringify(stocksArr));
      let storedStocks = JSON.parse(localStorage.getItem("symbol"));
      setAllStocks(storedStocks);
      setLoading(false);
    });
  };

  return (
    <Container>
      <Header text={"Dividend Tracker"} />
      <Toolbar stocks={allStocks} />
      {allStocks ? <StocksList stocks={allStocks} /> : null}
      {loading ? <LoadingIcon /> : null}
    </Container>
  );
};

export default Home;
// styles
const Container = styled.div`
  width: 100%;
  height: 100vh;
  /* border: 1px solid red; */
`;
