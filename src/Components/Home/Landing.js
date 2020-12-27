import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { Link } from "react-router-dom";
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
  const [spiral] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1609045408/Dividend%20Tracker/road-curve-svgrepo-com_njavke.svg"
  );
  const [cash] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608094687/Dividend%20Tracker/Icons/dollar-svgrepo-com_1_flt8lu.svg"
  );

  useEffect(() => {}, []);

  return (
    <Container>
      <HeaderWrapper>
        <SignInWrapper>
          <Link to="/signin">
            <SignInSpan>Sign In</SignInSpan>
          </Link>
        </SignInWrapper>
        <Header>
          <h1 onClick={() => auth.signOut()}>Dividend Tracker</h1>
          <img src={cash} alt="cash" />
        </Header>
        <h3>Record and manage your stock dividends</h3>
      </HeaderWrapper>
      <Section bg={spiral}>
        <RegisterDiv
          animationName={
            showRegistrationForm ? "change_flex_from_center_to_start" : null
          }
        >
          <H3 animationName={showRegistrationForm ? "fade_header_out" : null}>
            Start tracking <span>your</span> dividends!
          </H3>
          <Button
            url={coin}
            animationName={showRegistrationForm ? "circle_and_drop_out" : null}
            onClick={() => setShowRegistrationForm(true)}
          >
            Get Started
          </Button>
          {showRegistrationForm ? (
            <PiggyBank src={piggyBank} alt="piggy bank" />
          ) : null}
          {showRegistrationForm ? <Register /> : null}
        </RegisterDiv>
      </Section>
      <ListWrapper>
        <List>
          <ul>
            <li>Add stocks to your list</li>
            <li>Enter your dividend payouts</li>
            <li>Get up to date* information on your tracked stocks</li>
            <li>Generate reports to track your progress</li>
          </ul>
        </List>
      </ListWrapper>
    </Container>
  );
};

export default Landing;

// styles
const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  /* border: 1px solid blue; */
`;
const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  /* border: 1px solid red; */

  h3 {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    width: 100%;
    height: 6rem;
    background-color: #7249d1;
    border-bottom-left-radius: 100px;
  }
`;
const Header = styled.div`
  width: 100%;
  padding-left: 0.3rem;
  margin: 1.5rem 0;
  display: flex;
  justify-content: flex-start;

  img {
    margin-left: 0.3rem;
    width: 2rem;
    transform: rotate(-45deg);
  }

  @media ${device.mobileL} {
    padding-left: 20%;

    img {
      margin-left: 1rem;
    }
  }
`;
const SignInWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem 1rem;
`;
const SignInSpan = styled.span`
  color: #7249d1;
`;
const Section = styled.section`
  width: 100%;
  height: 100%;
  padding-bottom: 3rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff;
  background-image: url(${(props) => props.bg});
  background-position: right bottom;
  background-repeat: no-repeat;
  /* border: 1px solid red; */
`;
const RegisterDiv = styled.div`
  position: relative;
  width: 100%;
  height: 560px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* border: 1px solid red; */

  @keyframes change_flex_from_center_to_start {
    to {
      justify-content: flex-start;
    }
  }

  @media ${device.tabletS} {
    width: 60%;
  }
  @media ${device.tablet} {
    animation: ${(props) => props.animationName} 1s 1.5s forwards;
    justify-content: center;
  }
`;
const H3 = styled.h3`
  margin-top: 40%;
  animation: ${(props) => props.animationName} 4s forwards;
  span {
    color: #7249d1;
  }

  @keyframes fade_header_out {
    0% {
      margin-top: 0;
      opacity: 0;
    }
    50% {
      margin-top: 0;
      opacity: 0;
    }
    100% {
      margin-top: 0;
      opacity: 1;
    }
  }

  @media ${device.mobileL} {
    margin-top: 0;
  }
`;

const ListWrapper = styled.div`
  background-color: #fff;
`;
const List = styled.div`
  width: 100%;
  height: 15rem;
  margin-top: -3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #7249d1;

  ul {
    color: #fff;
    line-height: 1.5;
    /* border: 1px solid red; */
  }

  @media ${device.tablet} {
    border-top-left-radius: 100px;
  }
`;
const Button = styled.button`
  &:focus {
    outline: none;
  }
  /* position: absolute; */
  top: 3rem;
  width: 6rem;
  height: 2.5rem;
  border-radius: 0;
  animation: nothing 2.5s forwards;
  animation-name: ${(props) => props.animationName};
  background-color: #27d67b;
  margin-top: 1rem;
  cursor: pointer;
  border-radius: 3px;
  border: none;
  outline: none;

  @keyframes circle_and_drop_out {
    0% {
      position: absolute;
    }
    10% {
      position: absolute;
      background-color: #fff;
      color: #fff;
      font-size: 0.6rem;
      top: 3rem;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }
    30% {
      position: absolute;
      background-color: #fff;
      background-image: url(${(props) => props.url});
      border: none;
    }
    90% {
      position: absolute;
      background-color: #fff;
      border: none;
      background-image: url(${(props) => props.url});
    }
    100% {
      position: absolute;
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
