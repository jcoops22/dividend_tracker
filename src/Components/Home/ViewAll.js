import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { setShowAllDivs } from "../../redux/stocks/stocks-actions";
import { selectShowAllDivs } from "../../redux/stocks/stocks-selectors";
import { formatDateData } from "../../resources/stockUtilities";

const ViewAll = ({ setShowAllDivs, selectShowAllDivs }) => {
  const [payouts, setPayouts] = useState(selectShowAllDivs.payouts);

  useEffect(() => {
    console.log(payouts);
  }, [payouts]);
  return (
    <Container onClick={() => setShowAllDivs({ show: false, payouts: [] })}>
      <DividendsWrapper onClick={(e) => e.stopPropagation()}>
        {payouts ? (
          <div>
            <h5>Payouts: </h5>
            {payouts.map((payout, ind) => (
              <Row key={ind}>
                <p>${payout.amount}</p>
                <p>{formatDateData(payout.payDate)}</p>
              </Row>
            ))}
          </div>
        ) : null}
      </DividendsWrapper>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  selectShowAllDivs: selectShowAllDivs,
});
const mapDispatchToProps = (dispatch) => ({
  setShowAllDivs: (viewOjb) => dispatch(setShowAllDivs(viewOjb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewAll);

// styles
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fade_view_dividends_modal_in 0.5s forwards;
  background-color: rgba(0, 0, 0, 0);
  /* border: 2px solid red; */

  @keyframes fade_view_dividends_modal_in {
    to {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
`;
const DividendsWrapper = styled.div`
  position: absolute;
  min-height: 300px;
  max-height: 500px;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  overflow-y: scroll;
  border: 1px solid #333;

  h5 {
    color: #fff;
    font-size: 1.4rem;
    background-color: #7249d1;
    padding: 0.3rem 2rem;
  }
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1px;
  padding: 0.4rem 2rem;
  border: 2px solid #333;
`;
