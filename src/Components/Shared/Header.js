import React, { useContext, useState } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { UserContext } from "../Context/UserProvider";

const Header = ({ auth, history }) => {
  const { setCurrentUserAction, currentUser } = useContext(UserContext);
  const [logo] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1614808777/Dividend%20Tracker/Icons/undraw_investing_7u74_qhrqj3.svg"
  );

  return (
    <Container>
      <H1 onClick={() => history.push("/")}>
        Dividend Tracker
        <img src={logo} alt="dividend tracker" />
      </H1>
      <WelcomeSignOutDiv>
        <Welcome>Welcome, {currentUser.first}</Welcome>
        <SignOut
          onClick={() => {
            auth.signOut();
            setCurrentUserAction(null);
          }}
        >
          Sign Out
        </SignOut>
      </WelcomeSignOutDiv>
    </Container>
  );
};

export default Header;
// styles
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 3.3rem;
  padding: 0.3rem 0;
  background-color: #333;
  color: #fff;
  /* border: 1px solid red; */

  @media ${device.tablet} {
    justify-content: space-between;
    padding: 0.3rem 1rem;
  }
`;
const H1 = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  height: 100%;
  padding: 1rem 0.5rem;
  cursor: pointer;
  /* border: 1px solid red; */

  img {
    display: none;
    width: 3rem;
    margin-left: 1rem;
    /* border: 1px solid red; */
    @media ${device.mobileL} {
      display: initial;
    }
  }

  @keyframes slide_header_over {
    to {
      transform: translateX(0);
      font-size: 1.2rem;
    }
  }

  @media ${device.tablet} {
    font-size: 2rem;
    transform: translateX(100%);
    animation: slide_header_over 0.7s 0.5s ease-out forwards;
  }
`;
const WelcomeSignOutDiv = styled.div`
  display: flex;
  align-items: center;
  /* border: 1px solid red; */
`;
const Welcome = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
  height: 100%;
  font-size: 1.1rem;
  opacity: 0;
  margin: 0 1rem;
  text-transform: capitalize;
  animation: fade_welcome_in 0.3s 1.2s ease-out forwards;
  /* border: 1px solid blue; */

  @media ${device.tabletS} {
    display: flex;
    margin: 0 3rem;
  }

  @keyframes fade_welcome_in {
    to {
      padding-top: 0;
      opacity: 1;
    }
  }
`;
const SignOut = styled.button`
  &:hover {
    border: 2px solid #fff;
  }
  width: 6rem;
  height: 2rem;
  margin: 0 auto;
  cursor: pointer;
  opacity: 0;
  background-color: #27d67b;
  border-radius: 20px;
  animation: fade_signOut_in 0.8s 1.3s forwards;
  border: none;
  /* border: 2px solid #fff; */

  @keyframes fade_signOut_in {
    to {
      opacity: 1;
    }
  }
`;
