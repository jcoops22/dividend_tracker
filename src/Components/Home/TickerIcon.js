import React, { useEffect, useState } from "react";
import styled from "styled-components";

const TickerIcon = ({ symbol }) => {
  const [placeholder] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1614894683/Dividend%20Tracker/Icons/tickerplaceholder_bn3avi.jpg"
  );
  const [tickerUrl] = useState(
    `https://eodhistoricaldata.com/img/logos/US/${symbol}.png`
  );
  const [urlToUse, setUrlToUse] = useState(tickerUrl);

  useEffect(() => {
    // check if the url is valid
    imageExists(tickerUrl, async function (exists) {
      if (exists) {
        setUrlToUse(tickerUrl);
      } else {
        setUrlToUse(placeholder);
      }
    });
  }, [symbol, urlToUse]);

  const imageExists = (url, callback) => {
    var img = new Image();

    img.onload = async function () {
      await callback(true);
    };
    img.onerror = async function () {
      await callback(false);
    };
    img.src = url;
  };

  return (
    <Container>
      <img src={urlToUse} alt="ticker" />
    </Container>
  );
};

export default TickerIcon;

// styles
const Container = styled.div`
  position: absolute;
  top: 0;
  left: calc(100% - 2rem);
  margin-left: auto;
  /* border: 1px solid red; */

  img {
    width: 2rem;
  }
`;
