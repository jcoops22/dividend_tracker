import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { formatDateData } from "../../resources/stockUtilities";
import LoadingIcon from "../Shared/LoadingIcon";
import DividendsForm from "../Home/DividendsForm";
import D3Graph from "../Shared/D3Graph";

const Drawer = ({
  info,
  open,
  loading,
  data,
  dividends,
  stock,
  startTimer,
  forceInfoUpdate,
}) => {
  const [point, setPoint] = useState(
    info ? "calc(100% - 4.8rem)" : "calc(100% - 7.8rem)"
  );
  const [showGraph, setShowGraph] = useState(false);
  const [graphIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1614995416/Dividend%20Tracker/Icons/bar-chart-svgrepo-com_1_hkohbj.svg"
  );

  useEffect(() => {
    setShowGraph(false);
    if (info) {
      setPoint("calc(100% - 4.9rem)");
    } else if (dividends) {
      setPoint("calc(100% - 7.8rem)");
    }
    // hide the graph if needed on resize
    window.addEventListener("resize", checkShowGraph);
    // clean up
    return () => {
      window.removeEventListener("resize", checkShowGraph);
    };
  }, [loading, info, dividends, point, data]);

  const checkShowGraph = () => {
    // hide the graph on resize
    setShowGraph(false);
  };

  return (
    <Container
      animationName={open ? "open_drawer" : "close_drawer"}
      fillMode={open ? "forwards" : "backwards"}
    >
      {open ? (
        <HrWrapper>
          <Hr wid={point} />
          <div></div>
        </HrWrapper>
      ) : null}
      {data && !loading && info ? (
        <InfoWrapper>
          <RowForInfo padding="0.5rem">
            <ShowGraphButton
              onClick={() => setShowGraph(!showGraph)}
              border={showGraph ? "none" : "2px solid #7249d1"}
            >
              {showGraph ? (
                <span>&#10005;</span>
              ) : (
                <img src={graphIcon} alt="graph view" />
              )}
            </ShowGraphButton>
            <ColForInfo>
              {showGraph ? (
                <GraphMobileWrapper>
                  <D3Div id="d3Div">
                    {data.timeDate.yield === "No data" ? null : (
                      <D3Graph arr={data.timeDate} stock={stock} />
                    )}
                  </D3Div>
                </GraphMobileWrapper>
              ) : (
                <ColForInfoWrapper>
                  <span>
                    <span> Market Value: </span>
                    {data.value === undefined
                      ? "Data Not Available"
                      : data.value}
                  </span>

                  <span>
                    <span>Yield: </span>
                    {isNaN(data.yield * 100)
                      ? 0
                      : (data.yield * 100).toFixed(2)}
                    %
                  </span>

                  <span>
                    <span> Dividend per share: </span>$
                    {isNaN(data.divPerShare) ? 0 : data.divPerShare}
                  </span>

                  <span>
                    <span> Ex-Dividend date: </span>
                    {data.exDivDate
                      ? formatDateData(data.exDivDate)
                      : "No data"}
                  </span>

                  <span>
                    <span> Payout date: </span>
                    {data.payDivDate
                      ? formatDateData(data.payDivDate)
                      : "No data"}
                  </span>
                </ColForInfoWrapper>
              )}
            </ColForInfo>
            <D3Wrapper>
              <D3Div>
                <D3Graph
                  loading={loading}
                  arr={data.timeDate}
                  stock={stock}
                  startTimer={startTimer}
                  forceInfoUpdate={forceInfoUpdate}
                />
              </D3Div>
            </D3Wrapper>
          </RowForInfo>
        </InfoWrapper>
      ) : null}
      {!loading && dividends ? (
        <InfoWrapper>
          <DividendsForm stock={stock} />
        </InfoWrapper>
      ) : null}
      {loading ? (
        <InfoWrapper>
          <LoadingIcon
            visibiliy={open ? "visibile" : "hidden"}
            height={"3rem"}
            marginTop={"2rem"}
          />
        </InfoWrapper>
      ) : null}
    </Container>
  );
};

export default Drawer;

// styles
const Container = styled.div`
  position: relative;
  height: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  animation: noname 0.4s;
  animation-fill-mode: forwards;
  animation-name: ${(props) => props.animationName};
  font-family: "Arimo", sans-serif;
  /* border: 1px solid red; */

  @keyframes open_drawer {
    to {
      height: 10rem;
    }
  }

  @keyframes close_drawer {
    from {
      height: 6rem;
    }
  }
`;
const HrWrapper = styled.div`
  display: none;
  justify-content: flex-start;
  align-items: center;

  div {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: #7249d1;
  }

  @media ${device.tabletS} {
    display: flex;
  }
`;
const Hr = styled.hr`
  width: ${(props) => props.wid};
  border-color: #7249d1;
  animation: extend_hr_in_drawer 0.3s forwards;
  /* border: 1px solid red; */

  @keyframes extend_hr_in_drawer {
    from {
      width: 0;
    }
  }
`;
const InfoWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 9rem;
  opacity: 0;
  animation: fade_info_in 0.5s forwards;
  /* border: 1px solid green; */

  @keyframes fade_info_in {
    to {
      opacity: 1;
    }
  }
`;
const ShowGraphButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  cursor: pointer;
  /* border: 1px solid orange; */

  span {
    position: absolute;
    top: 0;
    left: calc(100% - 2rem);
    z-index: 2;
    height: 2rem;
    width: 2rem;
    font-size: 1.2rem;
    color: #7249d1;
  }

  img {
    position: absolute;
    top: calc(50% - 1.5rem);
    left: calc(100% - 3rem);
    z-index: 2;
    width: 1.5rem;
    padding: 0.1rem;
    transition-duration: 0.4s;
    border-radius: 50%;
    border: ${(props) => props.border};

    @media ${device.mobileM} {
      top: 0;
    }
  }

  @media ${device.tablet} {
    display: none;
  }
`;
const RowForInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  /* border: 1px solid blue; */
`;
const ColForInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  /* border: 1px solid red; */

  @media ${device.tablet} {
    width: fit-content;
  }
`;
const ColForInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  padding-right: 2rem;
  /* border: 1px solid red; */

  span {
    font-family: "Arimo", sans-serif;
    font-size: 0.9rem;
    margin: 0.2rem;
    color: #444;
    margin: 0.3rem 0.5rem;
    /* border: 1px solid red; */

    span {
      color: #000;
      font-family: "Exo", sans-serif;
    }

    @media ${device.mobileL} {
      margin: 0.6rem;
    }
    @media ${device.tabletS} {
      margin: 0.3rem;
    }
  }
`;
const GraphMobileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* border: 1px solid blue; */

  @media ${device.tablet} {
    display: none;
  }
`;

const D3Wrapper = styled.div`
  position: relative;
  display: none;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  /* border: 1px solid red; */

  @media ${device.tablet} {
    display: flex;
  }
`;
const D3Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  /* border: 1px solid blue; */

  @media ${device.tabletS} {
    padding: 0;
  }
`;
