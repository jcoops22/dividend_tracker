import React, { useState } from "react";
import styled from "styled-components";
import SearchStocks from "../Home/SearchStocks";

const Add = () => {
  const [close] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608616936/Dividend%20Tracker/Icons/SearchResults/close-svgrepo-com_c2ygft.svg"
  );

  return (
    <Container>
      <CloseForm src={close} alt="close" />
      <Form>
        <SearchStocks />
      </Form>
    </Container>
  );
};

export default Add;

// styles
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  opacity: 0;
  height: 100vh;
  width: 100vw;
  font-family: "Exo", sans-serif;
  animation: fade_AddForm_in 0.5s forwards;
  background-color: rgba(0, 0, 0, 0.7);
  /* border: 2px solid purple; */

  @keyframes fade_AddForm_in {
    to {
      opacity: 1;
    }
  }
`;
const CloseForm = styled.img`
  position: absolute;
  top: 4rem;
  left: calc(100% - 4rem);
  width: 1.5rem;
  cursor: pointer;
  /* border: 1px solid red; */
`;
const Form = styled.div`
  position: relative;
  left: 100%;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  animation: slide_form_in_from_right 0.4s forwards;
  /* border: 3px solid red; */

  @keyframes slide_form_in_from_right {
    to {
      left: 0;
    }
  }
`;
