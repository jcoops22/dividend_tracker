import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import * as d3 from "d3";

const D3Graph = ({ arr, stock }) => {
  const [valueArr, setValueArr] = useState(null);

  useEffect(() => {
    // console.log(arr);
    if (!valueArr) {
      makeValuesArray(arr);
    } else {
      drawChart("100%", 100);
    }
    //   console.log("we running");
  }, [valueArr]);

  // make a values array from the time series data
  const makeValuesArray = (obj) => {
    let arr = Object.entries(obj);
    let values = arr.slice(0, 100).map((val) => {
      return parseFloat(val[1].value.slice(1));
    });
    setValueArr(values);
  };

  // average for baseline value
  const average = (array) => array.reduce((a, b) => a + b) / array.length;

  // get the highest value
  const getHigh = (array) => array.reduce((a, b) => (a > b ? a : b));

  // get correct cents
  const getCents = (num) => {
    if (num.toString().includes(".")) {
      return num.toString().slice(-2).includes(".")
        ? (num.toString() + 0).slice(-2)
        : num.toString().slice(-2);
    } else {
      return "00";
    }
  };
  // D3 FUNC
  const drawChart = (w, h) => {
    // const data = [70, 55, 80, 95, 40, 80];
    const data = valueArr;
    const baseLine = data ? data : [100];
    const dbase = average(baseLine) * 2;
    // make the svg element
    const svg = d3
      .select(`#${stock.ticker}`)
      .append("svg")
      .attr("width", w)
      .attr("height", h);
    // select all rect elements pass the data and
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .transition()
      .delay((d, i) => `${i}8`)
      .duration(800)
      .attr("x", (d, i) => `${i}%`)
      .attr("y", (d, i) => 0)
      .attr("width", "3px")
      .attr("height", (d) => {
        let cents = getCents(d);

        // console.log(
        //   ("The D:", d, "DBASE:", dbase, "PERCENT:", cents / dbase) * 100
        // );

        return (d / dbase) * 100;
      })
      .attr("fill", (d) => (d >= dbase / 2 ? "#27d67b" : "#FF3501"));

    // 38/230 = .165 .165 x 100 = 16.5
  };

  return (
    <Container id={`${stock.ticker}`}>
      <Legend>Time Range (last 100 hours)</Legend>
      <LeftInfoBar>
        <span>0</span>
        {valueArr ? <span>${average(valueArr).toFixed(2)}</span> : null}
        {valueArr ? <span>${getHigh(valueArr) / 0.5}</span> : null}
      </LeftInfoBar>
      <BottomInfoBar>
        <span>Info</span>
        <span>info</span>
        <span>more info</span>
      </BottomInfoBar>
    </Container>
  );
};

export default D3Graph;

// styles
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 0.1rem;
  /* overflow: hidden; */
  transform: scale(-1, -1);
  background-color: #fff;
  border-top: 2px solid #7249d1;
  border-right: 2px solid #7249d1;
  /* border: 1px solid red; */
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
  /* border: 1px solid gray; */
`;
const LeftInfoBar = styled.div`
  position: absolute;
  top: -0.5rem;
  left: 100%;
  width: 1rem;
  height: 110%;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: center;
  transform: rotate(180deg);
  /* border: 1px solid blue; */

  span {
    font-size: 0.6rem;
    background-color: #fff;
  }
`;
const BottomInfoBar = styled.div`
  position: absolute;
  top: -1rem;
  left: 0;
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  transform: rotate(180deg);
  /* border: 1px solid red; */
`;
