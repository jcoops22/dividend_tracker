import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as d3 from "d3";
import { device } from "../../resources/mediaquery";
import { setBatch } from "react-redux/lib/utils/batch";

const D3Graph = ({ arr, stock }) => {
  const [valueArr, setValueArr] = useState(null);

  useEffect(() => {
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

  // D3 FUNC
  const drawChart = (w, h) => {
    // const data = [70, 55, 80, 95, 40, 80];
    const data = valueArr;
    const baseLine = data ? data[0] : 0;
    const svg = d3
      // .select("#d3cont")
      .select(`#${stock.ticker}`)
      // .select("#stock")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

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
      .attr("width", "4px")
      .attr("height", (d) => {
        let dbase = baseLine * 2;
        return (d / dbase) * 100;
      })
      .attr("fill", (d) => (d >= baseLine ? "#27d67b" : "#FF3501"));

    // 38/230 = .165 .165 x 100 = 16.5
  };
  return <Container id={`${stock.ticker}`}></Container>;
};

export default D3Graph;

// styles
const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 0.1rem;
  overflow: hidden;
  /* transform: rotate(180deg); */
  transform: scale(-1, -1);
  background-color: #fff;
  border-top: 2px solid #7249d1;
  border-right: 2px solid #7249d1;
  /* border: 1px solid red; */
`;
