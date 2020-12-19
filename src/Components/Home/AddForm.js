import React, { useState } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";
import SearchStocks from "../Home/SearchStocks";
import { selectAllStocks } from "../../redux/stocks/stocks-selectors";

const Add = ({ selectAllStocks }) => {
  return (
    <Container>
      <Link to="/home">back</Link>
      <h1>Add Stock</h1>
      <Form onClick={(e) => e.stopPropagation()}>
        <label>Symbol</label>
        <SearchStocks allstocks={selectAllStocks} />
      </Form>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  selectAllStocks: selectAllStocks,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Add);

// styles
const Container = styled.div`
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  /* pointer-events: none; */
  border: 2px solid purple;
`;
const Form = styled.div`
  height: 10rem;
  width: 100%;
  max-width: 800px;
  /* background-color: blue; */
  border: 3px solid #333;
`;
