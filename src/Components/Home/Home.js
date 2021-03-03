import React, { useEffect, useContext, useRef } from "react";
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
  const navbar = useRef();
  // scroll pos for showHideNavbar func
  var prevScrollpos = window.pageYOffset;

  useEffect(() => {
    // get stocks from firebase or retrieve them from localStorage
    if (!stocks) {
      getStocks();
    }
    // instiate event
    window.addEventListener("scroll", showHideNavbar);
    // clean up
    return () => {
      window.removeEventListener("scroll", showHideNavbar);
    };
  }, [auth, stocks, navbar]);

  const showHideNavbar = () => {
    /* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      navbar.current.style.top = "0";
    } else {
      navbar.current.style.top = `-3.3rem`;
    }
    prevScrollpos = currentScrollPos;
  };

  return (
    <Container>
      <Sticky ref={navbar}>
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
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  transition-duration: 0.5s;
`;
