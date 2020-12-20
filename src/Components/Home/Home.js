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
import { selectCurrentUser } from "../../redux/user/user-selectors";

const Home = ({
  setCurrentUser,
  selectCurrentUser,
  setStocks,
  selectAllStocks,
}) => {
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
      <Sticky>
        <Header
          text={"Dividend Tracker"}
          user={selectCurrentUser.first}
          auth={auth}
        />
        <Toolbar stocks={allStocks} />
      </Sticky>
      <StocksList />
      {loading ? <LoadingIcon /> : null}
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  selectAllStocks: selectAllStocks,
  selectCurrentUser: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setStocks: (stocks) => dispatch(setStocks(stocks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
// styles
const Container = styled.div`
  width: 100%;
  padding-bottom: 4rem;
  /* border: 1px solid red; */
`;
const Sticky = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
`;
