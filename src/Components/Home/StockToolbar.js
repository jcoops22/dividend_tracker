import React, { useState, useContext } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { deleteStock, getTickerInfo } from "../../resources/stockUtilities";
import TransformIcon from "../Shared/TransformIcon";
import Drawer from "./Drawer";
import { StocksContext } from "../Context/StocksProvider";
import { UserContext } from "../Context/UserProvider";

const StockToolbar = ({ stock }) => {
  const [deleteIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608651426/Dividend%20Tracker/Icons/Stock%20Toolbar/delete-folder-hand-drawn-outline-svgrepo-com_rjmcgy.svg"
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
  const [showModal, setShowModal] = useState(false);
  const [tickerInfo, setTickerInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showDividend, setShowDividend] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const { setTickerDataAction } = useContext(StocksContext);
  const {
    setCurrentUserStocksAction,
    currentUserStocks,
    currentUser,
  } = useContext(UserContext);

  const assignTickerData = async () => {
    setLoading(true);
    if (showDrawer && showInfo) {
      return;
    }
    let data = await getTickerInfo(stock.ticker, 60);
    setTickerDataAction(data);
    setTickerInfo(data);
    setLoading(!!!data);
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
  // tasks when DIVIDEND drawer is opened
  const handleShowDividend = () => {
    if (showDividend) {
      setShowDrawer(false);
      setShowDividend(false);
    } else {
      setLoading(false);
      setShowDrawer(true);
      setShowDividend(true);
      setShowInfo(false);
    }
  };
  // tasks when INFO drawer is opened
  const handleShowInfo = () => {
    if (showInfo) {
      setShowDrawer(false);
      setShowInfo(false);
      assignTickerData();
    } else {
      assignTickerData();
      setShowDrawer(true);
      setShowInfo(true);
      setShowDividend(false);
    }
  };

  return (
    <Container onDoubleClick={() => handleShowDividend()}>
      <Wrapper>
        <WrapperParagraph>double click for dividends form</WrapperParagraph>
        <IconSection>
          <IconWrapper>
            <img
              src={deleteIcon}
              alt="delete stock entry"
              onClick={() => {
                setShowModal(true);
              }}
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
          <ConfirmDelete>
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
        </Modal>
      ) : null}
      <Drawer
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
    background-color: #eee;
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

  input[value="Cancel"] {
    &:hover {
      color: #000;
      background-color: #27d67b;
    }
    border-color: #27d67b;
  }
`;
