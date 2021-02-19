import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import {
  updateStockDividend,
  deleteDividend,
  formatDateData,
  makeTodaysDate,
} from "../../resources/stockUtilities";
import { StocksContext } from "../Context/StocksProvider";
import { UserContext } from "../Context/UserProvider";

const DividendsForm = ({ stock }) => {
  const {
    currentUser,
    currentUserStocks,
    setCurrentUserStocksAction,
  } = useContext(UserContext);
  const { showAllDivsAction } = useContext(StocksContext);
  const [amount, setAmount] = useState(0);
  const [payDate, setPayDate] = useState(makeTodaysDate());
  const [stockPayouts, setStockPayouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608651426/Dividend%20Tracker/Icons/Stock%20Toolbar/delete-folder-hand-drawn-outline-svgrepo-com_rjmcgy.svg"
  );
  const [littleLoader] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608614181/Dividend%20Tracker/Icons/SearchResults/loading-loader-svgrepo-com_urrwap.svg"
  );
  const [openModalIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1609038418/Dividend%20Tracker/Icons/Stock%20Toolbar/share-arrows-svgrepo-com_npdvvm.svg"
  );
  useEffect(() => {
    // set the stockPayouts variable
    setStockPayouts(
      currentUserStocks.filter((s) => s.ticker === stock.ticker)[0].payouts ||
        []
    );
    // populate the total in the history header
    if (stockPayouts.length) {
      getTotal();
    }
  }, [currentUserStocks]);

  // handle recording the dividend
  const handleSubmit = async () => {
    setLoading(true);
    // if they don't have any payout yet make an empty array
    let payoutObj = {
      amount: amount,
      payDate: payDate,
      created: new Date().getTime(),
    };
    // console.log(stock.payouts);
    let success = await updateStockDividend(
      currentUser.id,
      stock,
      stockPayouts.concat(payoutObj)
    );
    console.log("updatestockdiv--return", success);
    if (success.message === undefined) {
      setCurrentUserStocksAction(success);
      setAmount(0);
      setPayDate(makeTodaysDate());
      setLoading(false);
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
    let newDividends = await deleteDividend(currentUser.id, stock, createdID);
    console.log(newDividends);
    let success = await updateStockDividend(
      currentUser.id,
      stock,
      newDividends
    );
    if (success.message === undefined) {
      setCurrentUserStocksAction(success);
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
              autoFocus={window.innerWidth > 580 ? true : null}
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
                  showAllDivsAction({
                    show: true,
                    payouts: stockPayouts,
                    stock: stock,
                  });
                }}
              >
                View All
                {stockPayouts && stockPayouts.length > 4
                  ? ` (${stockPayouts.length})`
                  : null}
                <img src={openModalIcon} alt="view all" width="18px" />
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
                  <span>{formatDateData(pay.payDate)}</span>
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
        {loading ? <DivLoader src={littleLoader} alt="loading" /> : null}
      </History>
    </Container>
  );
};

export default DividendsForm;

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
    animation: spin_littleloader_in_dividend_submit 1s forwards linear infinite;

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
const DivLoader = styled.img`
  position: absolute;
  top: 50%;
  left: calc(50% - 1rem);
  width: 2rem;
  animation: spin_div_loader 1s linear infinite;

  @keyframes spin_div_loader {
    to {
      transform: rotate(360deg);
    }
  }
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
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      margin-left: 0.4rem;
    }
  }

  p {
    span {
      color: #27d67b;
    }
  }
`;
const HistoryWrapper = styled.div`
  width: 100%;
  height: fit-content;
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
