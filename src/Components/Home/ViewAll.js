import React from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";

const ViewAll = ({ payouts }) => {
  return (
    <Container>
      <h1>All payouts here</h1>
      <div>
        {payouts.map((payout, ind) => (
          <div key={ind}>{payout.amount}</div>
        ))}
      </div>
    </Container>
  );
};

export default ViewAll;

// styles
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  height: 100vh;
  width: 100vw;
  opacity: 0.5;
  animation: fade_view_dividends_modal_in 0.5s forwards;
  background-color: rgba(0, 0, 0, 0);
  border: 2px solid red;

  @keyframes fade_view_dividends_modal_in {
    to {
      background-color: rgba(0, 0, 0, 1);
    }
  }
`;
