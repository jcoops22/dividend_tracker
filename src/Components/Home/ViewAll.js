import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import {
  formatDateData,
  deleteDividend,
  updateStockDividend,
} from "../../resources/stockUtilities";
import { StocksContext } from "../Context/StocksProvider";
import { UserContext } from "../Context/UserProvider";
import { makeTodaysDate } from "../../resources/stockUtilities";

const ViewAll = () => {
  const { currentUser, setCurrentUserStocksAction } = useContext(UserContext);
  const { showAllDivs, showAllDivsAction } = useContext(StocksContext);
  const [stock] = useState(showAllDivs.stock);
  const [payouts, setPayouts] = useState(showAllDivs.payouts);
  const [loading, setLoading] = useState(false);
  const [deleteIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1631341728/Dividend%20Tracker/Icons/Stock%20Toolbar/trash-svgrepo-com_k6m8ts.svg"
  );
  const [littleLoader] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608614181/Dividend%20Tracker/Icons/SearchResults/loading-loader-svgrepo-com_urrwap.svg"
  );

  useEffect(() => {}, [payouts]);

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
      setPayouts(payouts.filter((pay) => pay.created !== createdID));
      showAllDivsAction({
        ...showAllDivs,
        payouts: payouts.filter((pay) => pay.created !== createdID),
      });
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
  // generate total
  const getTotal = (arr) => {
    let total = 0;
    arr.forEach((pay) => {
      total += parseFloat(pay.amount);
    });
    return total;
  };

  return (
    <Container onClick={() => showAllDivsAction({ show: false, payouts: [] })}>
      <DividendsWrapper onClick={(e) => e.stopPropagation()}>
        {payouts ? (
          <Wrapper opacity={loading ? "0.5" : null}>
            {stock ? (
              <h5>
                <span>
                  {stock.name.split(" ").slice(0, 2).join(" ").replace(",", "")}{" "}
                  {`(${stock.ticker})`}
                </span>
                <p>
                  <span>
                    (<span> {payouts.length} </span>)
                  </span>{" "}
                  {payouts.length === 1 ? "Payout" : "Payouts"}:
                </p>
                <Close
                  onClick={() =>
                    showAllDivsAction({ show: false, payouts: [] })
                  }
                >
                  &#10005;
                </Close>
              </h5>
            ) : null}
            {payouts.map((payout, ind) => (
              <Row key={ind}>
                <span>{ind + 1}</span>
                <p>${numberWithCommas(parseFloat(payout.amount).toFixed(2))}</p>
                <p>{formatDateData(payout.payDate)}</p>
                <img
                  src={deleteIcon}
                  alt="delete"
                  onClick={() => handleDelete(payout.created)}
                />
              </Row>
            ))}
            <Total>
              <p>Total:</p>
              <span>${numberWithCommas(getTotal(payouts).toFixed(2))}</span>
            </Total>
          </Wrapper>
        ) : null}
        {loading ? <ViewAllLoader src={littleLoader} alt="loading" /> : null}
      </DividendsWrapper>
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
  top: 25vh;
  min-height: 300px;
  max-height: 500px;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  opacity: 1;
  overflow-y: scroll;
  overflow-x: hidden;
  animation: jumpDividendPayoutsUp 0.5s ease-in-out forwards;
  border: 1px solid #333;
  /* border: 1px solid red; */

  @keyframes jumpDividendPayoutsUp {
    from {
      top: 40vh;
      opacity: 0;
    }
  }

  h5 {
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #fff;
    font-size: 1.4rem;
    background-color: #7249d1;
    padding: 0.3rem 2rem;
    /* border: 1px solid red; */

    span {
      font-size: 1.3rem;
    }

    p {
      font-size: 1.1rem;
      padding: 0.3rem 0;
      span {
        font-size: 1rem;
        span {
          color: #ccc;
        }
      }
    }
  }
`;
const Close = styled.div`
  position: absolute;
  top: 0;
  left: calc(100% - 1.6rem);
  display: inline;
  width: 100%;
  font-size: 1.5rem;
  color: #999;
  color: #7249d1;
  color: #fff;
  cursor: pointer;
  /* border: 1px solid red; */
`;
const Wrapper = styled.div`
  opacity: ${(props) => props.opacity};
  /* border: 1px solid red; */
`;
const Total = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem 0;
  /* border: 2px solid red; */

  p {
    color: #333;
    margin: 0 1rem;
  }

  span {
    color: #27d67b;
    font-size: 1.2rem;
    font-weight: 700;
    font-family: "Arimo", sans-serif;
  }
`;
const Row = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  justify-content: flex-start;
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

  p {
    margin-right: auto;
  }

  img {
    position: absolute;
    top: 0.2rem;
    left: calc(100% - 2rem);
    width: 1.3rem;
    cursor: pointer;
    /* border: 1px solid red; */
  }
`;
const ViewAllLoader = styled.img`
  position: absolute;
  left: calc(50% - 1rem);
  top: calc(50% - 1rem);
  width: 2rem;
  animation: spin_div_loader 1s linear infinite;

  @keyframes spin_div_loader {
    to {
      transform: rotate(360deg);
    }
  }
`;
