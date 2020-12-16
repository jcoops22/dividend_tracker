import React from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import SignIn from "../Home/SignIn";

const Landing = () => {
  return (
    <Container>
      <HeaderWrapper>
        <h2>Dividend Tracker</h2>
        <h3>Keep track of all your payouts</h3>
      </HeaderWrapper>
      <Section>
        <SignIn />
        <ul>
          <li>Add stocks to your list</li>
          <li>Enter your dividend payouts</li>
          <li>Get up to date information on your tracked stocks</li>
          <li>Get analysis reports of your portfolio</li>
        </ul>
      </Section>
    </Container>
  );
};

export default Landing;

// styles
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: #fff;
  border: 1px solid red;

  @media ${device.tabletS} {
    padding: 0 3rem;
  }
`;
const HeaderWrapper = styled.div`
  padding-top: 2rem;
  margin-bottom: 1rem;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  h2 {
    width: 100%;
    text-align: center;
  }
`;
const Section = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 2rem;
`;
