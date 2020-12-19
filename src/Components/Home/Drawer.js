import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectTickerData } from "../../redux/stocks/stocks-selectors";

const Drawer = ({ stock, open, loading, data }) => {
  useEffect(() => {}, [loading]);

  return (
    <Container animationName={open ? "open_drawer" : "noname"}>
      {data ? (
        <InfoWrapper>
          <Row padding="0.5rem">
            <Col>
              <Row>
                {loading ? (
                  <Loader />
                ) : (
                  <span>
                    Market Value:{" "}
                    {data.value === undefined
                      ? "Data Not Available"
                      : data.value}
                  </span>
                )}
              </Row>
              <Row>
                {loading ? (
                  <Loader />
                ) : (
                  <span>
                    Yield: {isNaN(data.yield * 100) ? 0 : data.yield * 100}%
                  </span>
                )}
              </Row>
              <Row>
                {loading ? (
                  <Loader />
                ) : (
                  <span>
                    Dividend per share: $
                    {isNaN(data.divPerShare) ? 0 : data.divPerShare}
                  </span>
                )}
              </Row>
            </Col>
            <Col>
              <D3Div>D3 here</D3Div>
            </Col>
          </Row>
          <Row>
            {loading ? (
              <Loader />
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "0 0.3rem",
                }}
              >
                <div style={{ width: "50%" }}>
                  Ex-Dividend date: {data.exDivDate}
                </div>
                <div style={{ width: "50%" }}>
                  Payout date: {data.payDivDate}
                </div>
              </div>
            )}
          </Row>
        </InfoWrapper>
      ) : (
        <Loader playing={open ? "running" : "paused"} />
      )}
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  selectTickerData: selectTickerData,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);

// styles
const Container = styled.div`
  position: relative;
  height: 0;
  width: 100%;
  overflow: hidden;
  animation: noname 0.4s forwards;
  animation-name: ${(props) => props.animationName};
  border: 1px solid red;

  @keyframes open_drawer {
    to {
      height: 6rem;
    }
  }

  @keyframes close_drawer {
    to {
      height: 4rem;
      background-color: blue;
    }
  }
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  opacity: 0;
  animation: fade_info_in 0.5s forwards;

  @keyframes fade_info_in {
    to {
      opacity: 1;
    }
  }
`;
const Row = styled.div`
  position: relative;
  display: flex;
  padding: ${(props) => props.padding};
  font-size: 1rem;
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;
const Loader = styled.div`
  position: absolute;
  top: calc(50% - 15px);
  left: calc(50% - 15px);
  height: 30px;
  width: 30px;
  opacity: 1;
  animation: rotate_drawer_loader 0.5s ease-in infinite alternate;
  animation-play-state: ${(props) => props.playing};
  border-radius: 50%;
  border: 3px solid red;
  border-top-color: blue;

  @keyframes rotate_drawer_loader {
    to {
      border-radius: 20%;
      transform: rotate(408deg);
    }
  }
`;

const D3Div = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid gray;
`;
