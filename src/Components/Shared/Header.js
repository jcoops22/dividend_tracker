import React from "react";
import styled from "styled-components";

const Header = ({ text }) => {
  return <H1>{text}</H1>;
};

export default Header;
// styles
const H1 = styled.h1`
  font-size: 3rem;
  text-align: center;
  width: 100%;
`;
