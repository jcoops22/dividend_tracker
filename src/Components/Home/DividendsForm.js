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
    if (amount && payDate) {
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
      // console.log("updatestockdiv--return", success);
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
  // convert to comma notation
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // generate total for history header
  const getTotal = () => {
    let acc = 0;
    if (stockPayouts.length) {
      stockPayouts.map((val) => {
        return (acc += parseFloat(val.amount));
      });
      return numberWithCommas(acc.toFixed(2));
    }
  };

  return (
    <Container>
      <AmountAndDate>
        <Amount>
          <label>Amount:</label>
          <div>
            <span>&#36;</span>
            <input
              id="amount_input"
              autoFocus={window.innerWidth > 580 ? true : false}
              type="number"
              inputMode="decimal"
              pattern="[0-9]+([,\.][0-9]+)?"
              min="0"
              step="0.01"
              default="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
          </div>
        </Amount>
        <DateWrapper>
          <div>
            <label>Date:</label>
            <input
              id="payDate_input"
              type="date"
              value={payDate}
              onChange={(e) => setPayDate(e.target.value)}
            />
          </div>
        </DateWrapper>
        <SubmitDividend
          onClick={() => handleSubmit()}
          pointer={
            loading || !(payDate && amount > 0) ? "not-allowed" : "pointer"
          }
          disabled={loading || !(amount && payDate)}
        >
          {loading ? <img src={littleLoader} alt="loading" /> : "Enter"}
        </SubmitDividend>
      </AmountAndDate>
      <History
        opacity={loading ? "0.5" : null}
        p_events={loading ? "none" : null}
      >
        <HistoryHeader>
          <HistoryHeaderWrapper>
            <h6>History:</h6>
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
            <p>
              <span>Total:</span>
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
                <InfoWrapper>
                  <p>${numberWithCommas(parseFloat(pay.amount).toFixed(2))}</p>
                  <span>{formatDateData(pay.payDate)}</span>
                  <DeleteDividend>
                    <img
                      src={deleteIcon}
                      alt="delete dividend"
                      onClick={() => handleDelete(pay.created)}
                    />
                  </DeleteDividend>
                </InfoWrapper>
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
    font-size: 0.8rem;
    color: #777;
  }

  input {
    width: 100%;
    height: 1.5rem;
    font-size: 0.9rem;
    border: none;
    outline: none;
  }

  input[type="number"] {
    padding-left: 0.2rem;
    max-width: 100px;
    /* border: 1px solid orange; */
  }

  @media ${device.tabletS} {
    input {
      font-size: 1.2rem;
    }
  }
`;
const AmountAndDate = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  background-color: #fff;
  border-bottom: 2px solid #7249d1;
  /* border: 1px solid blue; */

  @media ${device.tabletS} {
    justify-content: flex-start;
  }
`;
const Amount = styled.div`
  display: flex;
  flex-direction: column;
  width: 3rem;
  margin-right: 1rem;
  /* border: 1px solid red; */

  span {
    font-size: 1rem;
  }

  div {
    display: flex;
    align-items: center;
  }
  @media ${device.tabletS} {
    width: 6rem;
  }
`;
const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 10rem;
  overflow: hidden;
  /* border: 1px solid red; */

  @media ${device.tabletS} {
    margin-left: 2rem;
    width: 12rem;
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
  display: flex;
  justify-content: center;
  align-items: center;
  color: #27d67b;
  min-height: 2.5rem;
  min-width: 2.5rem;
  margin-left: 1rem;
  cursor: ${(props) => props.pointer};
  transition-duration: 0.2s;
  pointer-events: ${(props) => props.p_events};
  border-radius: 50%;
  background-color: #fff;
  border: 2px solid #27d67b;
  /* border: 2px solid red; */

  img {
    width: 1rem;
    animation: spin_littleloader_in_dividend_submit 1s forwards linear infinite;

    @keyframes spin_littleloader_in_dividend_submit {
      to {
        transform: rotate(360deg);
      }
    }
  }

  @media ${device.tabletS} {
    min-height: 2rem;
    width: 7rem;
    margin-left: auto;
    border-radius: 20px;
  }
`;
const History = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  opacity: ${(props) => props.opacity};
  pointer-events: ${(props) => props.p_events};
  /* border: 1px solid red; */
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
  padding: 0.3rem;
  color: #fff;
  background-color: #7249d1;
  /* border: 1px solid red; */

  h6 {
    display: none;
    font-size: 0.9rem;
    padding: 0.1rem 0 0 0.2rem;
    /* border: 1px solid red; */

    @media ${device.mobileM} {
      display: initial;
    }
  }

  div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 1px solid red; */

    img {
      margin-left: 0.4rem;
    }
  }

  p {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    /* border: 1px solid red; */

    span:first-of-type {
      color: #fff;
      margin-right: 0.5rem;
    }
    span {
      color: #27d67b;
    }
  }
`;
const HistoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  /* border: 1px solid green; */

  @media ${device.tabletS} {
    padding: 0.2rem 0;
    flex-direction: row;
    justify-content: space-between;
    height: fit-content;
  }
`;
const HistoryLine = styled.div`
  position: relative;
  width: 50%;
  width: 100%;
  margin-top: 0.1rem;
  padding: 0 0.2rem;
  border: 1px solid #333;
  /* border: 1px solid red; */

  span:first-of-type {
    position: absolute;
    left: 0.1rem;
    color: #333;
    font-size: 0.5rem;
  }

  @media ${device.tabletS} {
    width: 48%;
    padding: 0 0.5rem;
  }
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: 0.5rem;
  font-size: 0.8rem;
  /* border: 1px solid blue; */

  p {
    color: #27d67b;
  }

  span:first-of-type {
    font-size: 0.8rem;
    position: static;
    color: #999;
    margin-left: 0.3rem;
  }

  @media ${device.tabletS} {
    font-size: 1rem;

    span:first-of-type {
      font-size: 1rem;
    }
  }
`;
const DeleteDividend = styled.div`
  display: flex;
  align-items: center;
  /* border: 1px solid red; */

  img {
    width: 1.2rem;
    cursor: pointer;

    @media ${device.tabletS} {
      width: 1.5rem;
    }
  }
`;
