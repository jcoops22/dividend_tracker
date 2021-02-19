import React, { useContext } from "react";
import styled from "styled-components";
import D3Graph from "../Shared/D3Graph";
import HowManyStocks from "./ReportComponents/HowManyStocks";
import { UserContext } from "../Context/UserProvider";
import { StocksContext } from "../Context/StocksProvider";

const Reports = () => {
  const { currentUserStocks, currentUser } = useContext(UserContext);
  const { showAllDivsAction, tickerData } = useContext(StocksContext);

  return (
    <Container>
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

export default Reports;

// styles

const Container = styled.div`
  min-height: 100vh;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const ReportWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
