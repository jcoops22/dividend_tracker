import React, { useState, useContext } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import {
  deleteStock,
  getTickerInfo,
  markStockAsSold,
  updateStockInfo,
  getSeekingAlphaAPIData,
} from "../../resources/stockUtilities";
import TransformIcon from "../Shared/TransformIcon";
import Drawer from "./Drawer";
import { StocksContext } from "../Context/StocksProvider";
import { UserContext } from "../Context/UserProvider";

const StockToolbar = ({ stock }) => {
  const [deleteIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1631341728/Dividend%20Tracker/Icons/Stock%20Toolbar/trash-svgrepo-com_k6m8ts.svg"
  );
  const [infoIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608614713/Dividend%20Tracker/Icons/Stock%20Toolbar/info-svgrepo-com_quyddh.svg"
  );
  const [closeInfoIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608615238/Dividend%20Tracker/Icons/Stock%20Toolbar/up-arrow-svgrepo-com_i2hote.svg"
  );
  const [openIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608615849/Dividend%20Tracker/Icons/Stock%20Toolbar/plus-svgrepo-com_mtsovt.svg"
  );
  const [closeIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608616032/Dividend%20Tracker/Icons/Stock%20Toolbar/close-svgrepo-com_nohmjc.svg"
  );
  const [markAsSoldIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1630473930/Dividend%20Tracker/Icons/Stock%20Toolbar/transfer-svgrepo-com_ktmyen.svg"
  );
  const [archivedIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1630473930/Dividend%20Tracker/Icons/Stock%20Toolbar/archive-svgrepo-com_qwlusk.svg"
  );
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [tickerInfo, setTickerInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showDividend, setShowDividend] = useState(false);
  const [sold, setSold] = useState(
    stock.isSold === undefined ? false : stock.isSold
  );
  const [showDrawer, setShowDrawer] = useState(false);
  const [localStorageUser] = useState(
    JSON.parse(window.localStorage.getItem("currentUser"))
  );
  const [daymillies] = useState(86400000); //24 hours in milliseconds
  const { setTickerDataAction } = useContext(StocksContext);
  const {
    setCurrentUserStocksAction,
    currentUserStocks,
    currentUser,
  } = useContext(UserContext);

  // update the local storage with updated stock item
  const updateLocalStorageStocks = (updatedStock) => {
    // console.log(updatedStock);
    // get the index to splice
    let selectedIndex = localStorageUser.stocks.findIndex(
      (e) => e.ticker === updatedStock.ticker
    );
    // splice into the local storage current user stocks
    localStorageUser.stocks.splice(selectedIndex, 1, {
      ...localStorageUser.stocks[selectedIndex],
      info: updatedStock,
      dps: updatedStock.divPerShare,
    });

    if (selectedIndex > -1) {
      let newCU = { ...localStorageUser, stocks: localStorageUser.stocks };
      // set it in local storage
      window.localStorage.setItem("currentUser", JSON.stringify(newCU));
      // console.log("FROM FUNC", newCU);
    }
  };
  // retrieve the symbol data
  const assignTickerData = async () => {
    setLoading(true);
    // if its already open return and do the close handled in handleShowInfo
    if (showDrawer && showInfo) {
      return;
    }

    // // Check if its updated in local storage first
    if (localStorageUser.stocks) {
      // get the stock we're working with
      let selectedStock = localStorageUser.stocks.filter((s) =>
        s.ticker === stock.ticker ? s : null
      );
      // check if stock has the "info" property
      if (selectedStock[0] && selectedStock[0].hasOwnProperty("info")) {
        // see if its been more than 24hours since updated
        if (
          selectedStock[0].info.timeDate.updated <
          new Date().getTime() + daymillies
        ) {
          // use the existing data from localStorage
          // console.log("we pulled from existing");
          setTickerDataAction(selectedStock[0].info);
          setTickerInfo(selectedStock[0].info);
          setLoading(false);
        } else if (
          // is it more than 24 hours old ?
          selectedStock[0].info.timeDate.updated >=
          new Date().getTime() + daymillies
        ) {
          // console.log("we checked but it was outdated, had to call");
          // run the getTickerInfo function from stockUtilities
          let data = await getTickerInfo(stock.ticker, 60);
          setTickerDataAction(data);
          setTickerInfo(data);
          updateLocalStorageStocks(data);
          setLoading(!!!data);
        } else {
          // do a fresh check
          // console.log("nothing in local storage from the first IF");
          // run the getTickerInfo function from stockUtilities
          let data = await getTickerInfo(stock.ticker, 60);
          console.log("DATA:", data);
          setTickerDataAction(data);
          setTickerInfo(data);
          updateLocalStorageStocks(data);
          setLoading(!!!data);
        }
      } else {
        // do a fresh check
        // console.log("nothing in local storage");
        // run the getTickerInfo function from stockUtilities
        let data = await getTickerInfo(stock.ticker, 60);
        // console.log("DATA:", data);
        setTickerDataAction(data);
        setTickerInfo(data);
        updateLocalStorageStocks(data);
        setLoading(!!!data);

        let theStock = currentUserStocks.filter((s) => {
          return s.ticker === data.ticker;
        });
        let withDPS = { ...theStock[0], dps: data.divPerShare };
        let newArr = await updateStockInfo(currentUser.id, withDPS);
        setCurrentUserStocksAction(newArr);
      }
    }
  };
  // force refresh
  const forceInfoUpdate = async () => {
    // do a fresh check
    // run the getTickerInfo function from stockUtilities
    let data = await getTickerInfo(stock.ticker, 60);
    console.log("DATA:", data);
    setTickerDataAction(data);
    setTickerInfo(data);
    updateLocalStorageStocks(data);
    setLoading(!!!data);
    return data;
  };

  // BUTTONS Functions
  // update the stocks list after delete
  const updateAfterDelete = async (user, stock) => {
    let success = await deleteStock(user, stock);
    if (success.message === undefined) {
      console.log("success");
      setCurrentUserStocksAction(
        currentUserStocks.filter((stocks) => stocks.ticker !== stock.ticker)
      );
    } else {
      console.log(success.message);
    }
  };
  //hightlight row when drawer is opened
  const highlight = () => {
    let row = document.getElementById(`line${stock.ticker}`);
    // add styling when drawer is opened
    showDrawer
      ? row.classList.remove("highlight")
      : row.classList.add("highlight");
  };
  // tasks when DIVIDEND drawer is opened
  const handleShowDividend = () => {
    if (showDividend) {
      setShowDrawer(false);
      setShowDividend(false);
      highlight();
    } else {
      setLoading(false);
      setShowDrawer(true);
      setShowDividend(true);
      setShowInfo(false);
      highlight();
    }
  };
  // tasks when INFO drawer is opened
  const handleShowInfo = () => {
    if (showInfo) {
      setShowDrawer(false);
      setShowInfo(false);
      assignTickerData();
      highlight();
    } else {
      // getSeekingAlphaAPIData(stock.ticker, "chart");
      assignTickerData();
      setShowDrawer(true);
      setShowInfo(true);
      setShowDividend(false);
      highlight();
    }
  };
  //handle marking stock as sold
  const markAsSold = async (stock) => {
    getSeekingAlphaAPIData(stock.ticker, "info");
    // getSeekingAlphaAPIData(stock.ticker, "chart");
    setSold(!sold); //toggle the sold value
    let updatedStock = { ...stock, isSold: !sold }; //add/update the isSold property
    let result = await markStockAsSold(currentUser.id, updatedStock); //update on backend
    //handle response
    if (result.success) {
      setCurrentUserStocksAction(result.stocks); //need to update the setCurrentUserStocksAction to refresh the data
    } else {
      console.log("There was an error archiving this stock.");
    }
  };

  return (
    <Container onDoubleClick={() => handleShowDividend()}>
      <Wrapper color={stock.isSold ? "transparent" : "#eee"}>
        <WrapperParagraph>double click for dividends form</WrapperParagraph>
        <IconSection>
          <IconWrapper>
            <img
              src={deleteIcon}
              alt="delete stock entry"
              onClick={() => {
                setDeleting(true);
                setShowModal(true);
              }}
            />
          </IconWrapper>
          <IconWrapper
            onClick={() => {
              setDeleting(false);
              setShowModal(true);
            }}
          >
            <img
              width="1.5rem"
              src={!sold ? markAsSoldIcon : archivedIcon}
              alt="archive"
            />
          </IconWrapper>
          <IconWrapper
            onClick={() => {
              handleShowInfo();
            }}
          >
            <TransformIcon
              first={infoIcon}
              second={closeInfoIcon}
              w1={"1.5rem"}
              w2={"1.5rem"}
              transform={showInfo}
            />
          </IconWrapper>
          <IconWrapper
            onClick={() => {
              handleShowDividend();
            }}
          >
            <TransformIcon
              first={openIcon}
              second={closeIcon}
              w1={"1.5rem"}
              w2={"1.2rem"}
              transform={showDividend}
            />
          </IconWrapper>
        </IconSection>
      </Wrapper>
      {showModal ? (
        <Modal
          animationName={
            showModal ? "fade_delete_modal_in" : "fade_delete_modal_out"
          }
          onClick={() => setShowModal(false)}
        >
          {deleting ? (
            <ConfirmDelete onClick={(e) => e.stopPropagation()}>
              <ConfirmDeleteWrapper style={{ background: "#fff" }}>
                <p>
                  <u>DELETE</u>: {stock.name}({stock.ticker})
                </p>
                <ButtonsWrapper>
                  <input
                    type="button"
                    value="Delete"
                    onClick={() => {
                      setShowDrawer(false);
                      setShowModal(false);
                      setShowInfo(false);
                      setShowDividend(false);
                      updateAfterDelete(currentUser.id, stock);
                    }}
                  />
                  <input
                    bg={"#7249d1"}
                    type="button"
                    value="Cancel"
                    onClick={() => setShowModal(false)}
                  />
                </ButtonsWrapper>
              </ConfirmDeleteWrapper>
            </ConfirmDelete>
          ) : (
            <ConfirmDelete onClick={(e) => e.stopPropagation()}>
              <ConfirmDeleteWrapper style={{ background: "#fff" }}>
                {stock.isSold ? (
                  <p>
                    Unarchive{" "}
                    <u>
                      {stock.name}({stock.ticker})
                    </u>
                    ?
                  </p>
                ) : (
                  <div>
                    <p>
                      Archive{" "}
                      <u>
                        {stock.name}({stock.ticker})
                      </u>
                      ?
                    </p>
                    <Note>
                      *Marking this stock as "sold" will retain all historical
                      data. If you do not want to keep this data then{" "}
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleting(true);
                        }}
                      >
                        delete
                      </span>{" "}
                      the stock instead.
                    </Note>
                  </div>
                )}
                <ButtonsWrapper>
                  <input
                    type="button"
                    value="Yes"
                    onClick={() => {
                      setShowModal(false);
                      markAsSold(stock);
                    }}
                  />
                  <input
                    type="button"
                    value="No"
                    onClick={() => setShowModal(false)}
                  />
                </ButtonsWrapper>
              </ConfirmDeleteWrapper>
            </ConfirmDelete>
          )}
        </Modal>
      ) : null}
      <Drawer
        forceInfoUpdate={forceInfoUpdate}
        key={stock.ticker}
        info={showInfo}
        dividends={showDividend}
        stock={stock}
        open={showDrawer}
        data={tickerInfo}
        loading={loading}
      />
    </Container>
  );
};

export default StockToolbar;

// styles
const Container = styled.div`
  width: 100%;
  user-select: none;
  /* border: 1px solid red; */
`;
const WrapperParagraph = styled.p`
  display: none;
  padding-left: 0.1rem;
  font-size: 0.7rem;
  transition-delay: 0.1s;
  transition-duration: 0.3s;

  @media ${device.tabletS} {
    display: initial;
    opacity: 0;
  }
`;
const Wrapper = styled.div`
  &:hover {
    background-color: ${(props) => props.color};
  }
  &:hover ${WrapperParagraph} {
    opacity: 0.8;
  }
  width: 100%;
  padding: 0.3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  transition-duration: 0.3s;
  /* border: 1px solid red; */
`;
const IconSection = styled.section`
  display: flex;
  justify-content: space-around;
  flex-direction: row-reverse;
  width: 100%;
  /* border: 1px solid red; */

  @media ${device.tabletS} {
    width: fit-content;
    justify-content: center;
  }
`;
const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  margin: 0 0.7rem;
  cursor: pointer;
  border-radius: 50%;
  /* border: 1px solid red; */

  img {
    width: 100%;
  }
`;
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0);
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: 0.4s forwards;
  animation-name: ${(props) => props.animationName};

  @keyframes fade_delete_modal_in {
    to {
      background-color: rgba(0, 0, 0, 0.6);
    }
  }

  @keyframes fade_delete_modal_out {
    from {
      background-color: rgba(0, 0, 0, 0);
    }
  }
`;
const ConfirmDelete = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 92%;
  max-width: 400px;
  margin: 0 auto;
  padding: 0.1rem;
  border-radius: 3px;
  background: rgb(114, 73, 209);
  background: linear-gradient(
    149deg,
    rgba(114, 73, 209, 1) 40%,
    rgba(39, 214, 123, 1) 60%
  );
  /* border: 1px solid red; */

  p {
    width: 100%;
    padding: 0.4rem 0;
    font-size: 1rem;
    text-align: center;
    /* border: 1px solid red; */

    u {
      font-size: 1rem;
      font-weight: 600;
    }
  }
`;
const ConfirmDeleteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  width: 100%;
  height: 100%;
  padding: 1rem;
  border-radius: 3px;
`;
const Note = styled.span`
  font-size: 0.8rem;

  span {
    &:hover {
      font-weight: bolder;
    }
    transition-duration: 0.2s;
    color: #ff3501;
    cursor: pointer;
    /* border: 1px solid red; */
  }
`;
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
  padding: 1rem 0;
  /* border: 2px solid red; */

  input {
    &:focus {
      outline: none;
    }
    &:hover {
      color: #fff;
      background-color: #7249d1;
    }
    transition-duration: 0.2s;
    cursor: pointer;
    width: 5rem;
    height: 2rem;
    border-radius: 20px;
    background-color: #fff;
    border: 2px solid #7249d1;
  }

  input[value="Delete"],
  input[value="Yes"] {
    &:hover {
      color: #000;
      background-color: #27d67b;
    }
    border-color: #27d67b;
  }
`;
