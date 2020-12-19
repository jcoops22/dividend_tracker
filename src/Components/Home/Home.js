import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, firestore } from "../Firebase/firebase";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Header from "../Shared/Header";
import Toolbar from "../Shared/Toolbar";
import StocksList from "./StocksList";
import LoadingIcon from "../Shared/LoadingIcon";
import { setStocks } from "../../redux/stocks/stocks-actions";
import { setCurrentUser } from "../../redux/user/user-actions";
import { selectAllStocks } from "../../redux/stocks/stocks-selectors";

const Home = ({ setCurrentUser, setStocks, selectAllStocks }) => {
  const [loading, setLoading] = useState(false);
  const [allStocks, setAllStocks] = useState(null);

  useEffect(() => {
    // updated user on signout
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setCurrentUser(null);
        setStocks(null);
      }
    });

    if (!selectAllStocks) {
      // console.log("we dont' have stocks already");
      getStocks();
    }

    return () => {
      unsub();
    };
  }, [auth]);

  const getStocks = () => {
    setLoading(true);
    const stocksCollectionRef = firestore.collection("symbols");
    stocksCollectionRef.get().then((data) => {
      setStocks(data.docs[0].data().symbols);
      setAllStocks(data.docs[0].data().symbols);
      setLoading(false);
    });
  };

  return (
    <Container>
      <Header text={"Dividend Tracker"} />
      <Toolbar stocks={allStocks} />
      <Lin onClick={() => auth.signOut()}>Sign out</Lin>
      <StocksList />
      {loading ? <LoadingIcon /> : null}
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  selectAllStocks: selectAllStocks,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setStocks: (stocks) => dispatch(setStocks(stocks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
// styles
const Container = styled.div`
  width: 100%;
  height: 100vh;
  /* border: 1px solid red; */
`;
const Lin = styled.div`
  background-color: lightgreen;
`;
