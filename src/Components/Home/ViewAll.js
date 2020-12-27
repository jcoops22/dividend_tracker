import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import { setCurrentUserStocks } from "../../redux/user/user-actions";
import { setShowAllDivs } from "../../redux/stocks/stocks-actions";
import { selectShowAllDivs } from "../../redux/stocks/stocks-selectors";
import {
  formatDateData,
  deleteDividend,
  updateStockDividend,
} from "../../resources/stockUtilities";

const ViewAll = ({
  setShowAllDivs,
  selectShowAllDivs,
  selectCurrentUser,
  setCurrentUserStocks,
}) => {
  const [stock] = useState(selectShowAllDivs.stock);
  const [payouts, setPayouts] = useState(selectShowAllDivs.payouts);
  const [loading, setLoading] = useState(false);
  const [deleteIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608651426/Dividend%20Tracker/Icons/Stock%20Toolbar/delete-folder-hand-drawn-outline-svgrepo-com_rjmcgy.svg"
  );

  useEffect(() => {
    // console.log(payouts);
  }, [payouts]);

  // handle delete
  const handleDelete = async (createdID) => {
    setLoading(true);
    let newDividends = await deleteDividend(
      selectCurrentUser.id,
      stock,
      createdID
    );
    console.log(newDividends);
    let success = await updateStockDividend(
      selectCurrentUser.id,
      stock,
      newDividends
    );
    if (success.message === undefined) {
      setPayouts(payouts.filter((pay) => pay.created !== createdID));
      setShowAllDivs({
        ...selectShowAllDivs,
        payouts: payouts.filter((pay) => pay.created !== createdID),
      });
      setCurrentUserStocks(success);
      setLoading(false);
    } else {
      console.log("There was an error.");
      return {
        message: success.message,
      };
    }
  };

  return (
    <Container onClick={() => setShowAllDivs({ show: false, payouts: [] })}>
      <DividendsWrapper onClick={(e) => e.stopPropagation()}>
        {payouts ? (
          <Wrapper opacity={loading ? "0.5" : null}>
            <h5>
              <span>
                <span style={{ fontSize: "1.1rem" }}>
                  (<span style={{ color: "#ccc" }}> {payouts.length} </span>)
                </span>{" "}
                {payouts.length === 1 ? "Payout" : "Payouts"}:
              </span>
              <span>
                {stock.name.split(" ").slice(0, 2).join(" ")}
                {`(${stock.ticker})`}
              </span>
            </h5>
            {payouts.map((payout, ind) => (
              <Row key={ind}>
                <span>{ind + 1}</span>
                <p>${parseFloat(payout.amount).toFixed(2)}</p>
                <p>{formatDateData(payout.payDate)}</p>
                <img
                  src={deleteIcon}
                  alt="delete"
                  onClick={() => handleDelete(payout.created)}
                />
              </Row>
            ))}
          </Wrapper>
        ) : null}
      </DividendsWrapper>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  selectShowAllDivs: selectShowAllDivs,
  selectCurrentUser: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({
  setShowAllDivs: (viewOjb) => dispatch(setShowAllDivs(viewOjb)),
  setCurrentUserStocks: (arr) => dispatch(setCurrentUserStocks(arr)),
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
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 1.4rem;
    background-color: #7249d1;
    padding: 0.3rem 2rem;
  }
`;
const Wrapper = styled.div`
  opacity: ${(props) => props.opacity};
`;
const Row = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 2rem;
  margin-bottom: 1px;
  padding: 0.4rem 2rem;
  border: 2px solid #333;

  span {
    position: absolute;
    left: 0.2rem;
    font-size: 0.7rem;
    text-decoration: underline;
    color: #000;
  }

  img {
    width: 1.5rem;
    cursor: pointer;
  }
`;
