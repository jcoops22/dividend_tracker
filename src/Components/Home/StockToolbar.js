import React, { useState } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { deleteStock, getTickerInfo } from "../../resources/stockUtilities";
import { setTickerData } from "../../redux/stocks/stocks-actions";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import { selectTickerData } from "../../redux/stocks/stocks-selectors";

import Drawer from "./Drawer";

const StockToolbar = ({
  stock,
  selectCurrentUser,
  setTickerData,
  selectTickerData,
}) => {
  const [deleteIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608220501/Dividend%20Tracker/Icons/Stock%20Toolbar/folder-delete-svgrepo-com_sl7sf5.svg"
  );
  const [infoIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608222064/Dividend%20Tracker/Icons/Stock%20Toolbar/info-svgrepo-com_qtqho4.svg"
  );
  const [openIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608222100/Dividend%20Tracker/Icons/Stock%20Toolbar/add-svgrepo-com_jqafqu_nrjek2.svg"
  );
  const [closeIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608222111/Dividend%20Tracker/Icons/Stock%20Toolbar/minus_omimec_o5lvx8.svg"
  );
  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [tickerInfo, setTickerInfo] = useState({});
  const [loading, setLoading] = useState(false);

  const assignTickerData = async () => {
    if (showDrawer) {
      return;
    }
    console.log("running");
    let data = await getTickerInfo(stock.ticker, 5);
    setTickerData(data);
    setTickerInfo(data);
  };

  return (
    <Container>
      <Wrapper>
        <IconWrapper>
          <img
            src={deleteIcon}
            alt="delete stock entry"
            onClick={() => {
              setShowModal(true);
            }}
          />
        </IconWrapper>
        <IconWrapper>
          <img
            src={infoIcon}
            alt="show stock info"
            onClick={() => {
              assignTickerData();
              setShowDrawer(!showDrawer);
            }}
          />
        </IconWrapper>
        <IconWrapper>
          <img src={openIcon} alt="show dividend entry" />
        </IconWrapper>
      </Wrapper>
      {showModal ? (
        <Modal onClick={() => setShowModal(false)}>
          <ConfirmDelete>Are you sure you want to delete?</ConfirmDelete>
        </Modal>
      ) : null}
      <Drawer stock={stock} open={showDrawer} data={tickerInfo} />
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  selectCurrentUser: selectCurrentUser,
  selectTickerData: selectTickerData,
});
const mapDispatchToProps = (dispatch) => ({
  setTickerData: (data) => dispatch(setTickerData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StockToolbar);

// styles
const Container = styled.div`
  width: 100%;
  height: 25%;
  background-color: #3ed;
`;
const Wrapper = styled.div`
  width: 100%;
  padding: 0.3rem;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
`;
const IconWrapper = styled.div`
  width: 2rem;
  cursor: pointer;

  img {
    width: 100%;
  }
`;
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ConfirmDelete = styled.div`
  border: 1px solid red;
`;
