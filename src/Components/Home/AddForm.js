import React, { useState } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";

const Add = () => {
  const [symbolName, setSymbolName] = useState("");

  return (
    <Container>
      <h1>Add Stock</h1>
      <Form onClick={(e) => e.stopPropagation()}>
        <label>Symbol</label>
        <input type="text" onChange={(e) => setSymbolName(e.setSymbolName)} />
      </Form>
    </Container>
  );
};

export default Add;

// styles
const Container = styled.div`
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  /* pointer-events: none; */
  border: 2px solid purple;
`;
const Form = styled.div`
  background-color: blue;
  height: 10rem;
  border: 3px solid #333;
`;
