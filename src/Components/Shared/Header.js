import React, { useContext } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { UserContext } from "../Context/UserProvider";

const Header = ({ text, user, auth, history }) => {
  const { setCurrentUserAction } = useContext(UserContext);
  return (
    <Container>
      <H1 onClick={() => history.push("/")}>{text}</H1>
      <Welcome>Welcome, {user}</Welcome>
      <SignOut
        onClick={() => {
          auth.signOut();
          setCurrentUserAction(null);
        }}
      >
        Sign Out
      </SignOut>
    </Container>
  );
};

export default Header;
// styles
const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 4rem;
  padding: 0.3rem 0;
  background-color: #333;
  color: #fff;
  /* border: 1px solid red; */
  @media ${device.tabletS} {
    height: 3.3rem;
    padding: 0.3rem 1rem;
  }
`;
const H1 = styled.h1`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.2rem;
  width: 60%;
  height: 100%;
  padding: 1rem 0.5rem;
  margin-left: 0;
  cursor: pointer;
  /* border: 1px solid red; */

  @keyframes slide_header_over {
    to {
      margin-left: 0;
      font-size: 1.5rem;
    }
  }

  @media ${device.tabletS} {
    animation: slide_header_over 0.7s 0.5s ease-out forwards;
    margin-left: 40%;
    font-size: 2.5rem;
  }
`;
const Welcome = styled.div`
  display: none;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding-top: 2rem;
  width: 40%;
  height: 100%;
  font-size: 1.1rem;
  opacity: 0;
  text-transform: capitalize;
  animation: fade_welcome_in 0.3s 1.2s ease-out forwards;
  /* border: 1px solid red; */

  @media ${device.tabletS} {
    display: flex;
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
