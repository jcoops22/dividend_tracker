import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { firestore } from "../Firebase/firebase";
import Header from "../Shared/Header";
import Toolbar from "../Shared/Toolbar";
import StocksList from "./StocksList";
import LoadingIcon from "../Shared/LoadingIcon";
import { Link } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allStocks, setAllStocks] = useState(
    JSON.parse(localStorage.getItem("symbol"))
  );

  useEffect(() => {
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
      <Link to="/">Sign out</Link>
      <StocksList />
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
