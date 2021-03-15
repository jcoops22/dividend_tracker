import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import * as d3 from "d3";

const D3Graph = ({
  arr,
  stock,
  startTimer,
  setStartTimer,
  forceInfoUpdate,
  loading,
}) => {
  const [valueArr, setValueArr] = useState(null);
  const [infoValues, setInfoValues] = useState(null);
  const [hoveredValue, setHoveredValue] = useState(null);
  const [useTimeoutView, setUseTimeoutView] = useState(true);
  const [showRefresh, setShowRefresh] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState(false);
  const [refreshIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1615498605/Dividend%20Tracker/Icons/refresh-svgrepo-com_rpdems.svg"
  );

  useEffect(() => {
    window.addEventListener("resize", handleDuplicateGraph);

    // check for data the build the chart
    if (!valueArr && !infoValues) {
      makeValuesArray(arr);
      makeInfoValues(arr);
      setUseTimeoutView(true);
    } else if (arr[0] !== undefined) {
      // create the graph chart
      setUseTimeoutView(false);
      drawChart("100%", "90%");
    }

    return () => {
      window.removeEventListener("resize", handleDuplicateGraph);
    };
  }, [
    valueArr,
    infoValues,
    useTimeoutView,
    showRefresh,
    useTimeoutView,
    loading,
  ]);

  // make a values array from the time series data
  const makeValuesArray = (obj) => {
    let arr = Object.entries(obj);
    let values = arr
      .slice(0, 100)
      .reverse()
      .map((val) => {
        return val[1].value ? parseFloat(val[1].value.slice(1)) : null;
      });
    setValueArr(values.reverse());
  };
  // get first middle and last values for the infobar
  const makeInfoValues = (obj) => {
    let arrObj = Object.entries(obj).reverse();
    if (arr[0] !== undefined) {
      setInfoValues([
        formatInfo(arrObj[2][1].lastUpdated),
        formatInfo(arrObj[50][1].lastUpdated),
        formatInfo(arrObj[99][1].lastUpdated),
      ]);
    } else {
      return;
    }
  };
  // format the info data
  const formatInfo = (info) => {
    let date = (info) => {
      return info ? info.slice(5, 10).replace("-", "/") : null;
    };
    let time = (info) => {
      if (info) {
        let rawTime = info.slice(11, -6);
        return rawTime > 12 ? rawTime - 12 + "pm" : parseInt(rawTime) + "am";
      }
    };
    return date(info) + " " + time(info);
  };
  // average for baseline value
  const average = (array) => array.reduce((a, b) => a + b) / array.length;
  // get the highest value
  const getHigh = (array) => array.reduce((a, b) => (a > b ? a : b));
  // get the lowest value
  const getLow = (array) => array.reduce((a, b) => (a < b ? a : b));
  // get correct cents
  const getCents = (num) => {
    if (num && num.toString().includes(".")) {
      return num.toString().slice(-2).includes(".")
        ? (num.toString() + 0).slice(-2)
        : num.toString().slice(-2);
    } else {
      return "00";
    }
  };
  // hide duplicate svgs on resize from mobile to fullscreen
  const handleDuplicateGraph = () => {
    let svgs = d3.selectAll(`#${stock.ticker} svg rect`);

    if (svgs._groups[0].length >= 100 && window.innerWidth > 768) {
      setShowRefresh(true);
    }
  };
  // handle reloading the graph after hiding on resize
  const handleRefresh = () => {
    drawChart("100%", "90%");
    setShowRefresh(false);
  };
  // set timer if the API is on timeout

  // D3 FUNC
  const drawChart = (w, h) => {
    let svgs = d3.selectAll(`#${stock.ticker} svg rect`);

    if (svgs._groups[0].length >= 100) {
      console.log("svgs._groups[0].length");
      handleDuplicateGraph();
      // return;
    }
    const data = valueArr;
    const baseLine = data ? data : [100];
    const dbase = average(baseLine);
    const high = getHigh(baseLine);
    const low = getLow(baseLine) - getLow(baseLine) * 0.5;
    // make the svg element
    const svg = d3
      .select(`#${stock.ticker}`)
      .append("svg")
      .attr("width", w)
      .attr("height", h);
    // select all rect elements and pass the data
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .on("mouseover", (e, d, i) => {
        setHoveredValue(d);
        d3.select(e.target)
          .attr("transform", "scale(1, 1.1)")
          .attr("fill", (d) => {
            return d >= dbase
              ? "rgba(39, 214, 124,0.3)"
              : "rgba(255, 52, 1,0.3)";
          });
      })
      .on("mouseleave", () => {
        d3.selectAll("rect")
          .attr("transform", "scale(1,1)")
          .attr("fill", "rgba(114, 73, 209,0.3)");
        setHoveredValue(null);
      })
      .transition()
      .delay((d, i) => `${i}8`)
      .duration(800)
      .attr("x", (d, i) => `${i}%`)
      .attr("y", (d, i) => 0)
      .attr("width", "1%")
      .attr("height", (d, i) => {
        let cents = getCents(d);
        let pennies = d * 100;
        let highPennies = high * 100;
        let lowestPennies = low * 100;
        let prevNum = data[i >= 1 ? i - 1 : 0];
        let difference = d - prevNum;
        // calculate the percent change
        const change = (a, b) => {
          let dif = a - b;
          return (dif / a) * 100;
        };

        // console.log("val", d, "comparing:", parseInt(prevNum), parseInt(d));
        // if (parseInt(prevNum) === parseInt(d)) {
        //   console.log("Equals:", parseInt(cents) * 0.3);
        //   return parseInt(cents) * 0.333;
        // } else if (parseInt(prevNum) >= parseInt(d)) {
        //   console.log("Greater:", parseInt(cents) * 0.5);
        //   return parseInt(cents) * 0.6;
        // } else if (parseInt(prevNum) <= parseInt(d)) {
        //   console.log("Less:", parseInt("1" + cents));
        //   return parseInt("1" + cents) * 0.7;
        // }

        // console.log(
        //   "val:",
        //   d,
        //   "Pennies:",
        //   pennies,
        //   "HighPens:",
        //   highPennies,
        //   "result:",
        //   parseInt((pennies / highPennies) * 100)
        // );
        // console.log(parseInt((pennies / highPennies) * 100));
        return parseInt((pennies / highPennies) * 100);
      })
      .style("stroke", "#7249d1")
      .style("stroke-width", "1px")
      .attr("fill", "rgba(114, 73, 209,0.3)");

    //%change = difference / original number * 100;
    // 38/230 = .165 .165 x 100 = 16.5
  };

  return (
    <Container>
      {loading ? (
        <p>Loading</p>
      ) : (
        <Wrapper>
          <RefreshButton
            onClick={() => {
              forceInfoUpdate();
              setShowRefresh(false);
            }}
            onMouseOver={() => setRefreshMessage(true)}
            onMouseOut={() => setRefreshMessage(false)}
          >
            <img src={refreshIcon} alt="refresh graph" />
          </RefreshButton>
          {refreshMessage ? (
            <RefreshMessage>Refresh Graph</RefreshMessage>
          ) : null}
          {useTimeoutView || showRefresh ? (
            <RefreshTimeoutWrapper>
              {showRefresh ? (
                <Refresh onClick={() => handleRefresh()}>Show Graph</Refresh>
              ) : (
                <TimeoutParagraph>API Timeout</TimeoutParagraph>
              )}
            </RefreshTimeoutWrapper>
          ) : (
            <Graph id={`${stock.ticker}`}>
              <Legend>
                {!hoveredValue ? (
                  <p>
                    Market Value <span>(last 7 trading days)</span>
                  </p>
                ) : (
                  <HoverValParagraph
                    color={
                      hoveredValue >= average(valueArr) ? "#27d67b" : "#FF3501"
                    }
                  >
                    Value: <span>${hoveredValue.toFixed(2)}</span>
                  </HoverValParagraph>
                )}
              </Legend>
              <LeftInfoBar>
                {valueArr ? <span>0</span> : null}
                {valueArr ? <span>${getHigh(valueArr).toFixed(2)}</span> : null}
              </LeftInfoBar>
              {infoValues ? (
                <BottomInfoBar>
                  {infoValues.map((i, ind) => (
                    <span key={ind}>{i}</span>
                  ))}
                </BottomInfoBar>
              ) : null}
            </Graph>
          )}
        </Wrapper>
      )}
    </Container>
  );
};

export default D3Graph;

// styles
const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: fit-content;
  padding-bottom: 1rem;
  margin: 0 0.2rem;
  /* border: 3px solid red; */
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const RefreshButton = styled.div`
  &:hover {
    img {
      transform: rotate(270deg);
    }
  }
  position: absolute;
  top: 0;
  left: calc(100% - 1.5rem);
  z-index: 2;
  display: none;
  justify-content: center;
  align-items: center;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  cursor: pointer;
  /* border: 1px solid orange; */

  img {
    width: 100%;
    transition-duration: 0.6s;
  }

  @media ${device.tablet} {
    display: flex;
  }
`;
const RefreshTimeoutWrapper = styled.div`
  height: 8rem;
  display: flex;
  align-items: center;
  /* border: 1px solid orange; */
`;
const RefreshMessage = styled.p`
  position: absolute;
  top: 0;
  left: calc(100% - 6.5rem);
  z-index: 1;
  display: flex;
  align-items: center;
  opacity: 0;
  width: 6.5rem;
  height: 1.5rem;
  font-size: 0.6rem;
  background-color: #fff;
  padding: 0 0.5rem;
  animation: slideRefreshMessageIn 0.4s ease-out forwards;
  /* border: 1px solid red; */

  @keyframes slideRefreshMessageIn {
    to {
      opacity: 1;
    }
  }
`;
const Graph = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 8rem;
  opacity: 0;
  transform: scale(-1, -1);
  animation: fadeD3GraphIn 0.8s ease-out forwards;
  background-color: #fff;
  border-top: 2px solid #7249d1;
  border-right: 2px solid #7249d1;
  /* border: 1px solid greenyellow; */

  @keyframes fadeD3GraphIn {
    to {
      opacity: 1;
    }
  }
`;
const Refresh = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 8rem;
  height: 4rem;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 5px;
  border: 2px solid #333;
`;
const TimeoutParagraph = styled.p`
  font-size: 2.5rem;
  color: red;

  span {
    color: blue;
  }
`;
const Legend = styled.div`
  position: absolute;
  width: 50%;
  height: 2rem;
  font-size: 0.8rem;
  text-align: center;
  top: calc(100% - 2rem);
  left: calc(50% - 25%);
  transform: rotate(180deg);
  pointer-events: none;
  /* border: 1px solid blue; */
`;
const LeftInfoBar = styled.div`
  position: absolute;
  top: 0;
  left: calc(100% - 1.2rem);
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: center;
  width: 1rem;
  height: 8rem;
  padding-top: 1rem;
  transform: rotate(180deg);
  /* border: 1px solid blue; */

  span {
    font-size: 0.6rem;
    text-align: center;
    margin: 0.3rem;
    background-color: #fff;
    visibility: hidden;

    @media ${device.tabletS} {
      visibility: visible;
    }
  }

  span:nth-child(2) {
    visibility: visible;
  }

  @media ${device.tabletS} {
    left: 100%;
  }
`;
const HoverValParagraph = styled.p`
  span {
    color: ${(props) => props.color};
  }
`;
const BottomInfoBar = styled.div`
  position: absolute;
  top: -1.2rem;
  left: 0;
  display: none;
  width: 100%;
  height: 1rem;
  font-size: 0.6rem;
  justify-content: space-between;
  transform: rotate(180deg);
  /* border: 1px solid red; */

  span {
    background-color: #fff;
    border-radius: 8px;
    /* background-color: #fff; */
  }

  @media ${device.tablet} {
    display: flex;
  }
`;
