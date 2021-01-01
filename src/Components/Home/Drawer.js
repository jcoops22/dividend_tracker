import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectTickerData } from "../../redux/stocks/stocks-selectors";
import { formatDateData } from "../../resources/stockUtilities";
import LoadingIcon from "../Shared/LoadingIcon";
import DividendsForm from "../Home/DividendsForm";
import D3Graph from "../Shared/D3Graph";

const Drawer = ({ info, open, loading, data, dividends, stock }) => {
  const [point, setPoint] = useState(
    info ? "calc(100% - 4.8rem)" : "calc(100% - 7.8rem)"
  );

  useEffect(() => {
    if (info) {
      setPoint("calc(100% - 4.9rem)");
    } else if (dividends) {
      setPoint("calc(100% - 7.8rem)");
    }
  }, [loading, info, dividends, point]);

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
          <Row padding="0.5rem">
            <Col>
              <Row>
                <span>
                  Market Value:{" "}
                  {data.value === undefined ? "Data Not Available" : data.value}
                </span>
              </Row>
              <Row>
                <span>
                  Yield:{" "}
                  {isNaN(data.yield * 100) ? 0 : (data.yield * 100).toFixed(2)}%
                </span>
              </Row>
              <Row>
                <span>
                  Dividend per share: $
                  {isNaN(data.divPerShare) ? 0 : data.divPerShare}
                </span>
              </Row>
              <HideOnMobile>
                <Row>
                  <span>
                    Ex-Dividend date:{" "}
                    {data.exDivDate
                      ? formatDateData(data.exDivDate)
                      : "No data"}
                  </span>
                </Row>
                <Row>
                  <span>
                    Payout date:{" "}
                    {data.payDivDate
                      ? formatDateData(data.payDivDate)
                      : "No data"}
                  </span>
                </Row>
              </HideOnMobile>
            </Col>
            <D3Wrapper padding="0 0 0 0.5rem">
              <D3Div>
                {data.timeDate.yield === "No data" ? null : (
                  <D3Graph arr={data.timeDate} stock={stock} />
                )}
              </D3Div>
            </D3Wrapper>
          </Row>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  display: flex;
  justify-content: flex-start;
  align-items: center;

  div {
    /* opacity: 0.5; */
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: #7249d1;
  }
`;
const Hr = styled.hr`
  width: ${(props) => props.wid};
  border-color: #7249d1;
  /* opacity: 0.5; */
  animation: extend_hr_in_drawer 0.3s forwards;

  @keyframes extend_hr_in_drawer {
    from {
      width: 0;
    }
  }
`;

const InfoWrapper = styled.div`
  height: 9rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0;
  animation: fade_info_in 0.5s forwards;
  /* border: 1px solid red; */

  @keyframes fade_info_in {
    to {
      opacity: 1;
    }
  }
`;
const Row = styled.div`
  display: flex;
  padding: ${(props) => props.padding};
  padding-bottom: 0.2rem;
  font-size: 1rem;
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: ${(props) => props.padding};
  width: 50%;

  @media ${device.tabletS} {
    justify-content: center;
  }
`;
const HideOnMobile = styled.div`
  display: none;

  @media ${device.tablet} {
    display: initial;
  }
`;
const D3Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 50%;
  /* border: 1px solid red; */
`;
const D3Div = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 0.5rem;
  /* border: 2px solid gray; */
`;
