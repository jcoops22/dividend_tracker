import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, firestore } from "../Firebase/firebase";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Header from "../Shared/Header";
import Toolbar from "../Shared/Toolbar";
import StocksList from "./StocksList";
import LoadingIcon from "../Shared/LoadingIcon";
import { setCurrentUser } from "../../redux/user/user-actions";
import { selectCurrentUser } from "../../redux/user/user-selectors";

const Home = ({ setCurrentUser }) => {
  const [loading, setLoading] = useState(false);
  const [allStocks, setAllStocks] = useState(
    JSON.parse(localStorage.getItem("symbol"))
  );

  useEffect(() => {
    // updated user on signout
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setCurrentUser(null);
      } else {
        console.log("did not sign out");
      }
    });

    if (!localStorage.symbol) {
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
      <Lin onClick={() => auth.signOut()}>Sign out</Lin>
      <StocksList />
      {loading ? <LoadingIcon /> : null}
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  selectCurrentUser: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
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
