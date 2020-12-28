import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import { Link } from "react-router-dom";
import Register from "../Home/Register";
import Footer from "../Shared/Footer";

const Landing = ({ selectCurrentUser }) => {
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
    // "https://res.cloudinary.com/drucvvo7f/image/upload/v1609109955/Dividend%20Tracker/Icons/dollar-svgrepo-com_1_qdtatm.svg"
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1609121510/Dividend%20Tracker/Icons/Screen_Shot_2020-12-27_at_7.10.32_PM_kptcp9.jpg"
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
  useEffect(() => {}, []);

  const scrollBackToGetStarted = () => {
    let form = document.getElementById("getStarted");
    form.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <Container>
      <HeaderWrapper>
        <SignInWrapper>
          <Link to={selectCurrentUser ? "/home" : "/signin"}>
            <SignInSpan>
              {selectCurrentUser ? "Go to Dashboard" : "Sign In to Dashboard"}
            </SignInSpan>
          </Link>
        </SignInWrapper>
        <Header>
          <h1>
            Dividend Tracker
            <img src={cash} alt="cash" />
            <ImgsWrapper>
              <Img
                src={cash}
                alt="cash"
                left={"53%"}
                rotate={"rotate(-45deg)"}
              />
              <Img
                src={cash}
                alt="cash"
                left={"54%"}
                rotate={"rotate(-35deg)"}
              />
              <Img
                src={cash}
                alt="cash"
                left={"55%"}
                rotate={"rotate(-25deg)"}
              />
            </ImgsWrapper>
          </h1>
          <section>
            <Underline left={"10%"} color={"#7249d1"} />
            <Underline left={"20%"} color={"#27d67b"} />
            <Underline left={"30%"} color={"#edc639"} />
          </section>
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
            id="getStarted"
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
          <h3>How it works: </h3>
          <ul>
            <li>
              <img src={addStock} alt="add stocks" />
              Add stocks to your list
            </li>
            <li>
              <img src={enterDivs} alt="enter dividends" />
              Enter your dividend payouts
            </li>
            <li>
              <img src={graph} alt="get info on stocks" />
              Get up to date* information on your tracked stocks
            </li>
            <li>
              <img src={reports} alt="reports" />
              Generate reports to track your progress
            </li>
          </ul>
          <Asterick>
            *Stock market data is updated daily (generally every hour)
          </Asterick>
        </List>
      </ListWrapper>
      <GetStarted>
        <h3>Get Started Now.</h3>
        <button onClick={() => scrollBackToGetStarted()}>
          Create your account
        </button>
      </GetStarted>
      <Footer />
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  selectCurrentUser: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);

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
    text-align: right;
    padding-right: 0.6rem;
    margin: 2rem;
    color: #fff;
    width: 100%;
    height: 6rem;
    font-size: 1rem;
    background-color: #7249d1;
    border-bottom-left-radius: 100px;
  }

  @media ${device.mobileL} {
    h3 {
      font-size: 1.5rem;
    }
  }

  @media ${device.tabletS} {
    h3 {
      font-size: 1.9rem;
    }
  }
`;
const SignInWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
`;
const SignInSpan = styled.span`
  color: #7249d1;
  border-bottom: 2px solid #7249d1;
`;
const Header = styled.div`
  width: 100%;
  margin: 3.5rem 0;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  h1 {
    position: relative;
    width: 100%;
    padding-left: 0.3rem;
    display: flex;
    justify-content: flex-start;
    /* border: 1px solid red; */
  }

  img {
    display: none;
    width: 5rem;
    margin-left: 1rem;
    /* border: 1px solid red; */
  }

  section {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    /* border: 1px solid red; */
  }

  @media ${device.mobileL} {
    h1 {
      padding-left: 4%;
    }
    img {
      display: initial;
    }
  }

  @media ${device.tabletS} {
    font-size: 2rem;

    h1 {
      padding-left: 20%;
    }
  }
`;
const ImgsWrapper = styled.div`
  display: inline;
  display: none;
`;
const Img = styled.img`
  position: absolute;
  top: 2rem;
  left: ${(props) => props.left};
  margin-left: 0.3rem;
  width: 2rem;
  transform: ${(props) => props.rotate};
`;
const Underline = styled.div`
  width: 50%;
  height: 4px;
  margin-left: ${(props) => props.left};
  background-color: ${(props) => props.color};
  margin-top: 0.6rem;
  /* border: 1px solid red; */
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
`;
const List = styled.div`
  width: 100%;
  margin-top: -4rem;
  padding: 3rem 0.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
    line-height: 3.5;
    list-style: none;
    padding: 0.5rem;
    /* border: 1px solid red; */

    img {
      width: 1.5rem;
      margin-right: 1rem;
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
const Asterick = styled.div`
  margin: 3rem 0 1rem;
  padding-left: 1rem;
  width: 100%;
  font-size: 0.8rem;
`;
const GetStarted = styled.div`
  height: 18rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem;
  /* border: 1px solid red; */

  h3 {
    margin: 2rem;
  }

  button {
    cursor: pointer;
    width: 6rem;
    height: 2.5rem;
    font-size: 0.8rem;
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
