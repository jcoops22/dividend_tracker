import React from "react";
import styled from "styled-components";

const ErrorComponent = ({ message }) => {
  return (
    <Container>
      <p>{message}</p>
    </Container>
  );
};

export default ErrorComponent;

// styles
const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  /* border: 1px solid red; */

  p {
    font-size: 1rem;
    color: red;
    text-align: center;
    /* border: 1px solid red; */
  }
`;
