import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { auth } from "../Firebase/firebase";
import Header from "../Shared/Header";
import Toolbar from "../Shared/Toolbar";
import StocksList from "./StocksList";
import LoadingIcon from "../Shared/LoadingIcon";
import { StocksContext } from "../Context/StocksProvider";
import { UserContext } from "../Context/UserProvider";

const Home = ({ history }) => {
  const { loading, getStocks, stocks } = useContext(StocksContext);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    // get stocks from firebase or retrieve them from localStorage
    if (!stocks) {
      getStocks();
    }
  }, [auth, stocks]);
  return (
    <Container>
      <Sticky>
        <Header
          text={"Dividend Tracker"}
          user={currentUser.first}
          auth={auth}
          history={history}
        />
        <Toolbar stocks={stocks} />
      </Sticky>
      <StocksList />
      {loading ? <LoadingIcon big={true} height={"6rem"} /> : null}
    </Container>
  );
};

export default Home;

// styles
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-bottom: 4rem;
  /* border: 1px solid red; */
`;
const Sticky = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
`;
