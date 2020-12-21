import React, { useState } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import SearchStocks from "../Home/SearchStocks";
import { selectAllStocks } from "../../redux/stocks/stocks-selectors";

const Add = ({ selectAllStocks }) => {
  return (
    <Container>
      <Form>
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
  left: 0;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.7);
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  animation: fade_AddForm_in 0.5s forwards;
  font-family: "Exo", sans-serif;
  /* border: 2px solid purple; */

  @keyframes fade_AddForm_in {
    to {
      opacity: 1;
    }
  }
`;
const Form = styled.div`
  position: relative;
  left: 100%;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  animation: slide_form_in_from_right 0.4s forwards;
  /* border: 3px solid red; */

  @keyframes slide_form_in_from_right {
    to {
      left: 0;
    }
  }
`;
