import React, { useContext, useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import D3Graph from "../Shared/D3Graph";
import HowManyStocks from "./ReportComponents/HowManyStocks";
import { UserContext } from "../Context/UserProvider";
import { StocksContext } from "../Context/StocksProvider";

const Reports = ({ history }) => {
  const { currentUserStocks, currentUser } = useContext(UserContext);
  const { showAllDivsAction, tickerData } = useContext(StocksContext);
  const [printing, setPrinting] = useState(false);

  // way to hide the print and go back bar while printing
  const handlePrint = () => {
    setPrinting(true);
    setTimeout(() => {
      window.print();
      setPrinting(false);
    }, 1000);
  };

  return (
    <Container>
      {printing ? null : (
        <Header>
          <Return onClick={() => history.push("/home")}>Go Back</Return>
          <PrintButton onClick={() => handlePrint()}>Print Report</PrintButton>
        </Header>
      )}
      <h1>Analysis Report:</h1>
      <Wrapper>
        <ReportWrapper>
          <HowManyStocks
            stocks={currentUserStocks}
            user={currentUser}
            tickers={tickerData}
            divs={showAllDivsAction}
          />
        </ReportWrapper>
      </Wrapper>
    </Container>
  );
};

export default withRouter(Reports);

// styles

const Container = styled.div`
  min-height: 100vh;

  h1 {
    margin: 1.5rem 0;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem;
  background-color: #333;
`;
const Return = styled.div`
  width: 5rem;
  font-size: 1.2rem;
  color: #7249d1;
  color: #fff;
  cursor: pointer;
  font-family: "Exo", sans-serif;
`;
const PrintButton = styled.button`
  width: 6rem;
  height: 3rem;
  cursor: pointer;
  font-weight: 400;
  font-family: "Exo", sans-serif;
  border-radius: 5px;
  background-color: #27d67b;
  outline: none;
  border: none;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const ReportWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
