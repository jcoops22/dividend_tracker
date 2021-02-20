import React from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";

const Footer = () => {
  return (
    <Container>
      Developed by:
      <a
        href="https://hungry-saha-ad752d.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Jonathan Cooper
      </a>
    </Container>
  );
};

export default Footer;

// styled
const Container = styled.div`
  height: 10rem;
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  color: #fff;

  a {
    color: #fff;
    margin-left: 1rem;
  }
`;
