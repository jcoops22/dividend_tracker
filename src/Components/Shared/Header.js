import React from "react";
import styled from "styled-components";

const Header = ({ text }) => {
  return (
    <Container>
      <H1>{text}</H1>
    </Container>
  );
};

export default Header;
// styles
const Container = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  border: 1px solid red;
`;
const H1 = styled.h1`
  color: #fff;
  font-size: 2rem;
  text-align: center;
  width: 100%;
  padding: 1rem 0.5rem;
  background-color: #000;
  /* border: 1px solid red; */
`;
