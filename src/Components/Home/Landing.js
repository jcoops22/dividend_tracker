import React, { useState } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import SignIn from "../Home/SignIn";
import Register from "../Home/Register";
import { auth } from "../Firebase/firebase";

const Landing = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [piggyBank] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608094687/Dividend%20Tracker/Icons/piggy-bank-svgrepo-com_vi5aua.svg"
  );
  const [coin] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608095060/Dividend%20Tracker/Icons/coin-svgrepo-com_kejmkv.svg"
  );
  return (
    <Container>
      <HeaderWrapper>
        <h1 onClick={() => auth.signOut()}>Dividend Tracker</h1>
        <SignIn />
      </HeaderWrapper>
      <h3>Record and manage your dividends</h3>
      <Section>
        <RegisterDiv>
          <h3>Start tracking your dividends!</h3>
          <Button
            url={coin}
            animationName={showRegistrationForm ? "circle_and_drop_out" : null}
            onClick={() => setShowRegistrationForm(true)}
          >
            Create an account
          </Button>
          {showRegistrationForm ? (
            <PiggyBank src={piggyBank} alt="piggy bank" />
          ) : null}
          {showRegistrationForm ? <Register /> : null}
        </RegisterDiv>
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
  /* justify-content: space-evenly; */
  background-color: #fff;
  /* border: 1px solid red; */

  @media ${device.tabletS} {
    padding: 0 3rem;
  }
`;
const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;

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
  margin-top: 3rem;

  ul {
    line-height: 1.5;
  }
`;
const RegisterDiv = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  height: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* overflow: hidden; */
  /* border: 1px solid red; */
`;
const Button = styled.button`
  &:focus {
    outline: none;
  }
  position: absolute;
  top: 3rem;
  width: 6rem;
  height: 2.5rem;
  border-radius: 0;
  animation: nothing 2.5s forwards;
  animation-name: ${(props) => props.animationName};
  background-color: #fff;
  border: 2px solid #333;

  @keyframes circle_and_drop_out {
    10% {
      color: #fff;
      font-size: 0.6rem;
      top: 3rem;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }
    30% {
      background-image: url(${(props) => props.url});
      border: none;
    }
    90% {
      border: none;
      background-image: url(${(props) => props.url});
    }
    100% {
      color: #fff;
      font-size: 0.6rem;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      border: 2px solid #333;
      top: 60%;
      opacity: 0;
      border: none;
      background-image: url(${(props) => props.url});
    }
  }
`;
const PiggyBank = styled.img`
  position: absolute;
  top: 75%;
  width: 5rem;
  pointer-events: none;
  opacity: 0;
  animation: fade_in_piggy_bank 2.7s forwards;

  @keyframes fade_in_piggy_bank {
    30% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
