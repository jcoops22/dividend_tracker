import React from "react";
import styled from "styled-components";
import D3Graph from "../Shared/D3Graph";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentUser,
  selectCurrentUserStocks,
} from "../../redux/user/user-selectors";
import {
  selectTickerData,
  selectShowAllDivs,
} from "../../redux/stocks/stocks-selectors";
import HowManyStocks from "./ReportComponents/HowManyStocks";

const Reports = ({
  selectCurrentUser,
  selectCurrentUserStocks,
  selectTickerData,
  selectShowAllDivs,
}) => {
  return (
    <Container>
      <h1>Analysis Report:</h1>
      <Wrapper>
        <ReportWrapper>
          <HowManyStocks
            stocks={selectCurrentUserStocks}
            user={selectCurrentUser}
            tickers={selectTickerData}
            divs={selectShowAllDivs}
          />
        </ReportWrapper>
      </Wrapper>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  selectCurrentUser: selectCurrentUser,
  selectCurrentUserStocks: selectCurrentUserStocks,
  selectTickerData: selectTickerData,
  selectShowAllDivs: selectShowAllDivs,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Reports);

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
