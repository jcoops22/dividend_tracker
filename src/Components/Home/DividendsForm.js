import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  updateStockDividend,
  getStockDividends,
  deleteDividend,
} from "../../resources/stockUtilities";
import { selectCurrentUser } from "../../redux/user/user-selectors";

const DividendsForm = ({ stock, selectCurrentUser }) => {
  const [amount, setAmount] = useState(null);
  const [payDate, setPayDate] = useState(null);
  const [stockPayouts, setStockPayouts] = useState(stock.payouts);
  const [check, setCheck] = useState(true);

  useEffect(() => {
    if (check) {
      getStockDividends(selectCurrentUser.id, stock).then((data) => {
        console.log(data);
        setStockPayouts(data);
      });
      setCheck(false);
    }
    console.log(check);
    console.log(stockPayouts);
  }, [stockPayouts]);

  // handle recording the dividend
  const handleSubmit = async () => {
    // if they don't have any payout yet make an empty array
    let currentPayouts = stockPayouts === undefined ? [] : stockPayouts;
    let payoutObj = {
      amount: amount,
      payDate: payDate,
    };
    console.log(stock.payouts);
    let success = await updateStockDividend(
      selectCurrentUser.id,
      stock,
      currentPayouts.concat(payoutObj)
    );
    if (success.message === undefined) {
      // setStockPayouts(getStockDividends(selectCurrentUser.id, stock));
      let dividends = await getStockDividends(selectCurrentUser.id, stock);
      // update the history arr
      console.log(dividends);
      setCheck(true);
      setStockPayouts(dividends);
      setAmount("");
      setPayDate("");
    } else {
      console.log("There was an error.");
      return {
        message: success.message,
      };
    }
  };

  // handle delete
  const handleDelete = async (ind) => {
    let newDividends = await deleteDividend(selectCurrentUser.id, stock, ind);
    console.log(newDividends);
    let success = await updateStockDividend(
      selectCurrentUser.id,
      stock,
      newDividends
    );
    if (success.message === undefined) {
      setCheck(true);
      setStockPayouts(newDividends);
    } else {
      console.log("There was an error.");
      return {
        message: success.message,
      };
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
            type="date"
            value={payDate}
            onChange={(e) => setPayDate(e.target.value)}
          />
        </DateWrapper>
        <button onClick={() => handleSubmit()}>Enter</button>
      </Row>
      <History>
        <h6>History:</h6>
        {stockPayouts ? (
          <HistoryWrapper>
            {stockPayouts.map((pay, ind) => (
              <HistoryLine key={ind}>
                <div>
                  <p>${pay.amount}</p>
                  <span>{pay.payDate}</span>
                  <DeleteDividend onClick={() => handleDelete(ind)}>
                    Delete
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
});
const mapDispatchToProps = (dispatch) => ({});

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
  button {
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
    cursor: pointer;
    transition-duration: 0.2s;
    border-radius: 20px;
    border: 2px solid #27d67b;
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
  width: 100%;
  display: flex;
  flex-direction: column;

  h6 {
    font-size: 0.9rem;
    padding: 0.1rem 0 0 0.2rem;
  }
`;
const HistoryWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 0.5rem;
  /* overflow-y: scroll; */
  /* border: 1px solid red; */

  @media ${device.tabletS} {
    padding: 0 1rem;
  }
`;
const HistoryLine = styled.div`
  width: 48%;
  margin: 0 0.1rem;
  border: 1px solid #333;
  border-top: none;
  /* border: 1px solid red; */

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 0.5rem;
    width: 100%;

    p {
      font-size: 1rem;
      color: #27d67b;
    }
    span {
      font-size: 0.8rem;
      color: #999;
    }
  }
`;
const DeleteDividend = styled.span`
  width: 1.5rem;
  height: 1.5rem;
`;
