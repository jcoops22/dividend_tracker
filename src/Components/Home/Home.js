import React from "react";
import styled from "styled-components";
import Header from "../Shared/Header";

const Home = () => {
  return (
    <Container>
      <Header text={"Dividend Tracker"} />
    </Container>
  );
};

export default Home;
// styles
const Container = styled.div`
  width: 100%;
  border: 2px solid #edc639;
`;
