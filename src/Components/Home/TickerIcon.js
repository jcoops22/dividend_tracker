import React, { useState } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";

const TickerIcon = ({ url }) => {
  const [placeholder] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1614894683/Dividend%20Tracker/Icons/tickerplaceholder_bn3avi.jpg"
  );

  return (
    <Container>
      <img src={url ? url : placeholder} alt="ticker" />
    </Container>
  );
};

export default TickerIcon;

// styles
const Container = styled.div`
  position: absolute;
  top: 0;
  left: calc(100% - 2.5rem);
  margin-left: auto;
  /* border: 1px solid red; */

  img {
    width: 2rem;
  }
  @media ${device.tabletS} {
    left: calc(100% - 1.8rem);
  }
`;
