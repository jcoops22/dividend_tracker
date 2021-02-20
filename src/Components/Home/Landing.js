import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { Link } from "react-router-dom";
import Register from "../Home/Register";
import Footer from "../Shared/Footer";
import { UserContext } from "../Context/UserProvider";

const Landing = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [spiral] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1609045408/Dividend%20Tracker/road-curve-svgrepo-com_njavke.svg"
  );
  const [singlePurpleCircleFilled] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1609173177/Dividend%20Tracker/Icons/atom-circular-symbol-of-circles-svgrepo-com_ccz61s.svg"
  );
  const [addStock] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1609110754/Dividend%20Tracker/Icons/file-svgrepo-com_nnfjpo.svg"
  );
  const [enterDivs] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1609111143/Dividend%20Tracker/Icons/data-scientist-research-data-profession-svgrepo-com_toyjvx.svg"
  );
  const [graph] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1609111143/Dividend%20Tracker/Icons/graph-svgrepo-com_pqko55.svg"
  );
  const [reports] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1609111414/Dividend%20Tracker/Icons/report-svgrepo-com_ysbigv.svg"
  );
  const [whiteCircles] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1613756512/Dividend%20Tracker/Icons/Frame_1_l9oihd.svg"
  );
  const [sinlgeWhiteCircle] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1609173177/Dividend%20Tracker/Icons/plate-circles-from-top-view-svgrepo-com_flb1ak.svg"
  );
  const [trackStats] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1613772849/Dividend%20Tracker/Icons/undraw_Browser_stats_re_j7wy_x7xweb.svg"
  );
  const [investingForHeader] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1613778050/Dividend%20Tracker/Icons/undraw_investing_7u74_d1vsuv.svg"
  );
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollBackToGetStarted = () => {
    let form = document.getElementById("getStarted");
    form.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <Container>
      <HeaderWrapper bg={trackStats}>
        <SignInWrapper>
          <Link to={currentUser ? "/home" : "/signin"}>
            <SignInSpan>
              <img
                src={currentUser ? singlePurpleCircleFilled : sinlgeWhiteCircle}
                alt="sign in"
              />
              {currentUser ? "Go to Dashboard" : "Sign In to Dashboard"}
            </SignInSpan>
          </Link>
        </SignInWrapper>
        <Hero>
          <Header>
            <HeaderH1>
              Dividend Tracker
              <img src={investingForHeader} alt="investing" />
            </HeaderH1>
            <h2>Record and manage your stock dividends</h2>
          </Header>
          <Diagram>
            <img src={trackStats} alt="diagram" />
          </Diagram>
        </Hero>
      </HeaderWrapper>
      <Section bg={spiral}>
        <RegisterDiv>
          <H3>
            Start tracking <span>your</span> dividends!
          </H3>
          {showRegistrationForm ? <Register /> : null}
        </RegisterDiv>
      </Section>
      <ListWrapper>
        <List>
          <h3>How it works: </h3>
          <ul>
            <li>
              <div>
                <img src={addStock} alt="add stocks" />
                Add stocks to your list
              </div>
            </li>
            <li>
              <div>
                <img src={enterDivs} alt="enter dividends" />
                Enter your dividend payouts
              </div>
            </li>
            <li>
              <div>
                <img src={graph} alt="get info on stocks" />
                Get up to date* information on your tracked stocks**
              </div>
            </li>
            <li>
              <div>
                <img src={reports} alt="reports" />
                Generate reports to track your progress
              </div>
            </li>
          </ul>
          <Asterisk>
            <p>*Stock market data is updated daily (generally every hour)</p>
            <p>**currently API calls are limited to only 3 per minute</p>
          </Asterisk>
        </List>
      </ListWrapper>
      <GetStarted>
        <WhiteCircles src={whiteCircles} alt="div circle" />
        <h3>Get Started Now.</h3>
        <Link to="/signin">
          <button>Create your account</button>
        </Link>
      </GetStarted>
      <Footer />
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 8rem;
  padding-left: 1rem;
  border: 1px solid red;

  h3 {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: right;
    padding-right: 0.6rem;
    margin: auto 2rem 0;
    color: #ddd;
    width: 100%;
    height: 6rem;
    font-size: 1rem;
    background-color: #7249d1;
    border-bottom-left-radius: 100px;
    /* border: 1px solid red; */
  }

  @media ${device.tablet} {
    background-position: right bottom;
  }
`;
const SignInWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 4rem;
  /* border: 1px solid red; */
`;
const SignInSpan = styled.span`
  &:hover {
    /* border-bottom: 2px solid #7249d1; */
  }
  display: flex;
  align-items: center;
  color: #7249d1;
  margin-right: 1rem;
  /* border: 1px solid red; */

  img {
    width: 1.4rem;
    margin-right: 0.5rem;
    /* border: 1px solid red; */
  }
`;
const Hero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: 4rem 0;
  /* border: 1px solid orange; */
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  /* border: 1px solid blue; */

  h2 {
    font-size: 1rem;
    margin: 1rem;
  }
`;
const HeaderH1 = styled.h1`
  position: relative;
  display: flex;
  justify-content: space-between;
  font-size: clamp(2rem, 5vw, 4rem);
  color: #7249d1;
  /* border: 1px solid red; */

  img {
    display: none;
    position: absolute;
    left: 105%;
    width: 3rem;
    /* border: 1px solid red; */

    @media ${device.mobileS} {
      display: initial;
    }
  }
`;
const Diagram = styled.div`
  margin-top: 6rem;
  max-width: 1024px;
  /* border: 1px solid red; */

  img {
    width: 100%;
    /* border: 1px solid red; */
  }

  @media ${device.laptop} {
    /* margin-top: 4rem; */
  }
`;
const Section = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-bottom: 3rem;
  background-color: #fff;
  background-image: url(${(props) => props.bg});
  background-position: right bottom;
  background-repeat: no-repeat;
  /* border: 1px solid red; */
`;
const RegisterDiv = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
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
    color: #27d67b;
    text-decoration: underline;
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
    margin-top: 20%;
  }

  @media ${device.tabletS} {
    font-size: 1.7rem;
  }
`;

const ListWrapper = styled.div`
  background-color: #fff;
  /* border: 1px solid red; */
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: -4rem;
  padding: 6rem 0.4rem;
  background-color: #7249d1;
  /* border: 1px solid red; */

  h3 {
    font-size: 1.8rem;
    color: #fff;
    margin: 1rem 0;
    padding-bottom: 0.3rem;
    border-bottom: 2px solid #fff;
  }
  ul {
    color: #fff;
    list-style: none;
    padding: 2rem 0.5rem;
    /* border: 1px solid red; */

    li {
      font-size: 1.2rem;
      margin: 3rem 0;

      div {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        /* border: 1px solid red; */

        img {
          width: 2.2rem;
          margin-right: 1rem;
        }
      }
    }
  }

  @media ${device.tabletS} {
    ul {
      font-size: 1.3rem;
    }
  }

  @media ${device.tablet} {
    border-top-left-radius: 100px;
  }
`;
const Asterisk = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem 0 1rem;
  padding-left: 1rem;
  width: 100%;
  font-size: 0.8rem;
`;
const GetStarted = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30rem;
  padding: 2rem;
  overflow: hidden;
  border: 1px solid red;

  h3 {
    position: relative;
    z-index: 2;
    margin: 2rem;
  }

  button {
    cursor: pointer;
    width: 6rem;
    height: 2.5rem;
    font-size: 0.8rem;
    font-family: "Exo", sans-serif;
    background-color: #27d67b;
    border-radius: 3px;
    border: none;
    outline: none;
  }

  @media ${device.tabletS} {
    font-size: 1.5rem;

    button {
      width: 7rem;
      height: 3.5rem;
      font-size: 1rem;
    }
  }
`;
const WhiteCircles = styled.img`
  position: absolute;
  top: 0rem;
  left: -3rem;
  width: 14rem;
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
  font-family: "Exo", sans-serif;
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

  @media ${device.tabletS} {
    width: 7rem;
    height: 3.5rem;
    font-size: 1rem;
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
