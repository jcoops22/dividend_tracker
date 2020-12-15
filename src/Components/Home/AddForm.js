import React, { useState } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import SearchStocks from "../Home/SearchStocks";

const Add = ({ stocks }) => {
  return (
    <Container>
      <h1>Add Stock</h1>
      <Form onClick={(e) => e.stopPropagation()}>
        <label>Symbol</label>
        <SearchStocks allstocks={stocks} />
      </Form>
    </Container>
  );
};

export default Add;

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
  background-color: blue;
  border: 3px solid #333;
`;
