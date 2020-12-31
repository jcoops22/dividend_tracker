import React from "react";
import styled from "styled-components";
import D3Graph from "../Shared/D3Graph";

const Reports = () => {
  return (
    <Container>
      <D3Graph />
    </Container>
  );
};

export default Reports;

// styles

const Container = styled.div`
  min-height: 100vh;
`;
