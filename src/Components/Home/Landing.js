import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { Link } from "react-router-dom";
import Register from "../Home/Register";
import Footer from "../Shared/Footer";
import { UserContext } from "../Context/UserProvider";

const Landing = () => {
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
  const [threePurpleCircles] = useState(
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
  const [endDataIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1613792946/Dividend%20Tracker/Icons/undraw_All_the_data_re_hh4w_mqs0xb.svg"
  );
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <PurpleCircles
        src={threePurpleCircles}
        alt="tracking circles"
        left={"-3rem"}
        top={"-14rem"}
      />
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
            <h2>Simply and easily manage your stock dividends</h2>
          </Header>
          <DiagramWrapper>
            <Description>
              <h4>Simple, yet robust...</h4>
              <ul>
                <li>Choose from 6000+ stocks and funds (updated regularly)</li>
                <li>Get current data on stocks added to your list</li>
                <li>Use data visualization tools to chart your journey</li>
                <li>
                  Add stocks not listed for lesser known stocks or proprietary
                  funds
                </li>
                <li>Easy to use data entry (no more spreadsheets!)</li>
                <li>Generate analytical reports and more!</li>
              </ul>
            </Description>
            <Diagram>
              <img src={trackStats} alt="diagram" />
            </Diagram>
          </DiagramWrapper>
        </Hero>
      </HeaderWrapper>
      <Section bg={spiral}>
        <RegisterDiv>
          <h3>
            Start tracking <span>your</span> dividends!
          </h3>
          <Register />
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
        <PurpleCircles
          src={threePurpleCircles}
          alt="div circle"
          top={"-0.3rem"}
          left={"-3rem"}
        />
        <h3>Get Started Now.</h3>
        <Link to="/signin">
          <button>Create your account</button>
        </Link>
        <AllTheData src={endDataIcon} alt="all the data" />
      </GetStarted>

      <Footer />
    </Container>
  );
};

export default Landing;

// styles
const Container = styled.div`
  position: relative;
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
  align-self: center;
  width: 100%;
  max-width: 1440px;
  padding: 0.7rem;
  /* border: 1px solid green; */

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

  @media ${device.mobileL} {
    justify-content: center;
  }
  @media ${device.laptop} {
    margin-bottom: 8rem;
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
  margin: 3rem 0;
  /* border: 1px solid orange; */

  @media ${device.mobileL} {
    padding: 0 0.6rem;
  }
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  /* border: 1px solid blue; */

  h2 {
    color: #333;
    font-size: clamp(1rem, 3vw, 2rem);
    margin: 1rem 0;
  }

  @media ${device.tabletS} {
    margin-bottom: 3rem;
  }
  @media ${device.tablet} {
    padding-left: 4rem;
    margin-top: 3rem;
  }
  @media ${device.laptop} {
    align-items: center;
    margin: 8rem 0;
  }
`;
const HeaderH1 = styled.h1`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: clamp(2rem, 8vw, 4rem);
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
    @media ${device.mobileL} {
      width: 4rem;
      left: 100%;
    }
    @media ${device.tabletS} {
      width: 6.5rem;
      margin-bottom: ;
    }
    @media ${device.laptop} {
      position: relative;
      left: 0;
      top: 0;
    }
  }

  @media ${device.tabletS} {
    margin-top: 3rem;
  }
`;
const DiagramWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  margin-top: 6rem;

  @media ${device.laptop} {
    flex-direction: row;
    justify-content: space-around;
  }
`;
const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 2rem;
  margin: 3rem 0;
  /* border: 1px solid red; */

  h4 {
    color: #7249d1;
    font-weight: 700;
    font-size: 1.6rem;
    margin: 1.5rem 0;
  }

  li {
    color: #333;
    margin: 1.5rem 0;
  }
`;
const Diagram = styled.div`
  max-width: 600px;
  /* border: 1px solid red; */

  img {
    width: 100%;
    /* border: 1px solid red; */
  }

  @media ${device.laptop} {
    margin-top: 0;
    align-self: flex-end;
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 100%;
  padding: 3rem 0 8rem;
  /* border: 1px solid red; */

  h3 {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: right;
    padding-right: 0.6rem;
    color: #ddd;
    width: 100%;
    height: 6rem;
    font-size: 1.3rem;
    background-color: #7249d1;
    /* border-bottom-left-radius: 100px; */
    /* border: 1px solid red; */

    span {
      color: #27d67b;
      margin: 0 0.5rem;
      /* text-decoration: underline; */
    }
    @media ${device.tabletS} {
      margin: 7rem 2rem;
    }
  }

  @media ${device.tablet} {
    animation: ${(props) => props.animationName} 1s 1.5s forwards;
    justify-content: center;
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
      font-size: 1.5rem;

      img {
        width: 2.5rem;
      }
    }
  }

  @media ${device.tablet} {
    /* border-top-left-radius: 100px; */
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
  align-items: center;
  justify-content: flex-end;
  padding: 8rem 0;
  overflow: hidden;
  /* border: 1px solid red; */

  h3 {
    position: relative;
    z-index: 2;
    margin: 2rem;
    /* border: 1px solid red; */
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
    justify-content: center;
    font-size: 1.5rem;

    button {
      width: 7rem;
      height: 3.5rem;
      font-size: 1rem;
    }
  }
`;
const AllTheData = styled.img`
  margin: 8rem 0 4rem;
  width: 16rem;
`;
const PurpleCircles = styled.img`
  display: none;
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  width: 14rem;

  @media ${device.tabletS} {
    display: initial;
  }
`;
