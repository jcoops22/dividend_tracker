import React, { useState } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { deleteStock } from "../../resources/stockUtilities";

const StockToolbar = ({ stock, user }) => {
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

  return (
    <Container>
      <Wrapper>
        <IconWrapper>
          <img
            src={deleteIcon}
            alt="delete stock entry"
            onClick={() => {
              deleteStock(user.id, stock);
            }}
          />
        </IconWrapper>
        <IconWrapper>
          <img
            src={infoIcon}
            alt="show stock info"
            onClick={() => {
              deleteStock(user.id, stock);
            }}
          />
        </IconWrapper>
        <IconWrapper>
          <img
            src={openIcon}
            alt="show dividend entry"
            onClick={() => {
              deleteStock(user.id, stock);
            }}
          />
        </IconWrapper>
      </Wrapper>
    </Container>
  );
};

export default StockToolbar;

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
