import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  updateStockDividend,
  getStockDividends,
  deleteDividend,
  formatDateData,
  makeTodaysDate,
} from "../../resources/stockUtilities";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import {
  setShowAllDivs,
  setShowAllDivsStock,
} from "../../redux/stocks/stocks-actions";
import { selectShowAllDivs } from "../../redux/stocks/stocks-selectors";

const DividendsForm = ({
  stock,
  selectCurrentUser,
  setShowAllDivs,
  setShowAllDivsStock,
  selectShowAllDivs,
}) => {
  const [amount, setAmount] = useState(0);
  const [payDate, setPayDate] = useState(makeTodaysDate());
  const [stockPayouts, setStockPayouts] = useState(
    stock.payouts ? stock.payouts : []
  );
  const [check, setCheck] = useState(true);
  const [loading, setLoading] = useState(false);
  const [deleteIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608651426/Dividend%20Tracker/Icons/Stock%20Toolbar/delete-folder-hand-drawn-outline-svgrepo-com_rjmcgy.svg"
  );
  const [littleLoader] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608614181/Dividend%20Tracker/Icons/SearchResults/loading-loader-svgrepo-com_urrwap.svg"
  );
  useEffect(() => {
    // populate the total in the history header
    if (stockPayouts.length) {
      getTotal();
    }
    // get the most updated list of dividends
    if (check) {
      getStockDividends(selectCurrentUser.id, stock).then((data) => {
        console.log("in the getstock");
        // shouldn't be undefined by the time this runs after dividend has been added
        if (stockPayouts.length) {
          // sort by date paid *decending*
          setStockPayouts(
            data.sort((a, b) => (a.payDate < b.payDate ? 1 : -1))
          );
        }
      });
      // using the Check flag to only do one render of the getStockDividends func
      setCheck(false);
      setLoading(false);
    }
    // console.log(check);
    // console.log(stockPayouts);
  }, [stockPayouts]);

  // handle recording the dividend
  const handleSubmit = async () => {
    setLoading(true);
    // if they don't have any payout yet make an empty array
    let currentPayouts = stockPayouts === undefined ? [] : stockPayouts;
    let payoutObj = {
      amount: amount,
      payDate: payDate,
      created: new Date().getTime(),
    };
    // console.log(stock.payouts);
    let success = await updateStockDividend(
      selectCurrentUser.id,
      stock,
      currentPayouts.concat(payoutObj)
    );
    console.log("updatestockdiv--return", success);
    if (success.message === undefined) {
      let dividends = await getStockDividends(selectCurrentUser.id, stock);
      // update the history/payouts arr
      // console.log(dividends);
      // to reload
      setCheck(true);
      // if successful
      if (dividends.message === undefined) {
        // set the stock payouts array
        setStockPayouts(dividends);
        // clear the inputs and values
        setAmount(0);
        setPayDate(makeTodaysDate());
        setLoading(false);
      }
    } else {
      console.log("There was an error.");
      return {
        message: success.message,
      };
    }
  };

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
      setCheck(true);
      setStockPayouts(newDividends);
      setLoading(false);
    } else {
      console.log("There was an error.");
      return {
        message: success.message,
      };
    }
  };
  // generate total for history header
  const getTotal = () => {
    let acc = 0;
    if (stockPayouts.length) {
      stockPayouts.map((val) => {
        return (acc += parseFloat(val.amount));
      });
      return acc.toFixed(2);
    }
  };

  return (
    <Container>
      <Row>
        <Amount>
          <label>Amount:</label>
          <RowInput>
            <span>&#36;</span>
            <input
              id="amount_input"
              autoFocus
              type="number"
              min="0"
              step="0.01"
              default="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </RowInput>
        </Amount>
        <DateWrapper>
          <label>Date:</label>
          <input
            id="payDate_input"
            type="date"
            value={payDate}
            onChange={(e) => setPayDate(e.target.value)}
          />
        </DateWrapper>
        <SubmitDividend
          onClick={() => handleSubmit()}
          disabled={loading || !(amount && payDate)}
        >
          {loading ? <img src={littleLoader} alt="loading" /> : "Add"}
        </SubmitDividend>
      </Row>
      <History
        opacity={loading ? "0.5" : null}
        p_events={loading ? "none" : null}
      >
        <HistoryHeader>
          <HistoryHeaderWrapper>
            <h6>History:</h6>
            <>
              <div
                onClick={() => {
                  setShowAllDivs({
                    show: true,
                    payouts: stockPayouts,
                    stock: stock,
                  });
                  console.log(stockPayouts);
                }}
              >
                View All
                {stockPayouts && stockPayouts.length > 4
                  ? ` (${stockPayouts.length})`
                  : null}
              </div>
            </>
            <p>
              Total:{" "}
              {stockPayouts ? (
                <span>{stockPayouts.length ? `$${getTotal()}` : "$0"}</span>
              ) : (
                "$0"
              )}
            </p>
          </HistoryHeaderWrapper>
        </HistoryHeader>
        {stockPayouts ? (
          <HistoryWrapper>
            {stockPayouts.slice(0, 4).map((pay, ind) => (
              <HistoryLine key={ind}>
                <span>{ind + 1}</span>
                <div>
                  <p>${parseFloat(pay.amount).toFixed(2)}</p>
                  <span>
                    {window.innerWidth >= 411
                      ? formatDateData(pay.payDate)
                      : formatDateData(pay.payDate).slice(0, -5)}
                  </span>
                  <DeleteDividend>
                    <img
                      src={deleteIcon}
                      alt="delete dividend"
                      onClick={() => handleDelete(pay.created)}
                    />
                  </DeleteDividend>
                </div>
              </HistoryLine>
            ))}
          </HistoryWrapper>
        ) : null}
      </History>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  selectCurrentUser: selectCurrentUser,
  selectShowAllDivs: selectShowAllDivs,
});
const mapDispatchToProps = (dispatch) => ({
  setShowAllDivs: (viewOjb) => dispatch(setShowAllDivs(viewOjb)),
  setShowAllDivsStock: (obj) => dispatch(setShowAllDivsStock(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DividendsForm);

// styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  /* border: 1px solid red; */

  label {
    font-size: 0.9rem;
    color: #444;
  }
  input {
    width: 100%;
    height: 2rem;
    font-size: 1.2rem;
    border: none;
    outline: none;
  }
  input[type="number"] {
    max-width: 100px;
    /* border: 1px solid orange; */
  }
`;
const SubmitDividend = styled.button`
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: #27d67b;
    color: #fff;
  }
  color: #27d67b;
  height: 2rem;
  width: 7rem;
  margin-left: auto;
  background-color: #fff;
  cursor: ${(props) => props.pointer};
  transition-duration: 0.2s;
  pointer-events: ${(props) => props.p_events};
  border-radius: 20px;
  border: 2px solid #27d67b;

  img {
    width: 1rem;
    animation: spin_littleloader_in_dividend_submit 1s forwards infinite;

    @keyframes spin_littleloader_in_dividend_submit {
      to {
        transform: rotate(360deg);
      }
    }
  }
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 0 0.5rem;
  background-color: #fff;
  border-bottom: 2px solid #7249d1;
  /* border: 1px solid blue; */

  @media ${device.tablet} {
    justify-content: space-between;
  }
`;
const RowInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: #fff;
  /* border: 1px solid red; */
`;
const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.tabletS} {
    margin-left: 2rem;
  }
`;
const Amount = styled.div`
  display: flex;
  flex-direction: column;
`;
const History = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  opacity: ${(props) => props.opacity};
  pointer-events: ${(props) => props.p_events};
`;
const HistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const HistoryHeaderWrapper = styled.div`
  width: 100%;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  padding: 0.3rem 0.7rem;
  color: #fff;
  background-color: #7249d1;

  h6 {
    font-size: 0.9rem;
    padding: 0.1rem 0 0 0.2rem;
  }

  div {
    cursor: pointer;
    color: #fff;
  }

  p {
    span {
      color: #27d67b;
    }
  }
`;
const HistoryWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 0.5rem;
  /* border: 1px solid red; */

  @media ${device.tabletS} {
    padding: 0 1rem;
  }
`;
const HistoryLine = styled.div`
  position: relative;
  width: 48%;
  margin: 0.1rem 0.1rem 0;
  border: 1px solid #333;
  border-top: none;
  /* border: 1px solid red; */

  span:first-of-type {
    position: absolute;
    left: 0.1rem;
    color: #333;
    font-size: 0.5rem;
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.8rem;
    width: 100%;

    p {
      font-size: 1rem;
      color: #27d67b;
    }

    span:first-of-type {
      position: static;
      font-size: 0.8rem;
      color: #999;
      margin-left: 0.3rem;
    }
  }
`;
const DeleteDividend = styled.span`
  img {
    width: 1.2rem;
    cursor: pointer;
  }
`;
const ViewAllWrapper = styled.div``;
