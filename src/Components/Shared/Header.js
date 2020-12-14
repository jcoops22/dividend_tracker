import React from "react";
import styled from "styled-components";

const Header = ({ text }) => {
  return <H1>{text}</H1>;
};

export default Header;
// styles
const H1 = styled.h1`
  color: #fff;
  font-size: 2rem;
  text-align: center;
  width: 100%;
  padding: 1rem 0.5rem;
  background-color: #000;
  /* border: 1px solid red; */
`;
