import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectTickerData } from "../../redux/stocks/stocks-selectors";

const Drawer = ({ stock, open, loading, data }) => {
  const [drawerData, setDrawerData] = useState(data);

  useEffect(() => {});

  return (
    <Container animationName={open ? "open_drawer" : "noname"}>
      {data ? (
        <InfoWrapper>
          <Row>
            {loading ? <Loader /> : <span>Market Value: {data.value} </span>}
          </Row>
          <Row>{loading ? <Loader /> : <span>Yield: {data.yield}</span>}</Row>
        </InfoWrapper>
      ) : (
        "Loading"
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
  height: 0;
  width: 100%;
  overflow: hidden;
  animation: noname 0.4s forwards;
  animation-name: ${(props) => props.animationName};
  border: 1px solid red;

  @keyframes open_drawer {
    to {
      height: 4rem;
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
`;
const Row = styled.div`
  display: flex;
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
`;
const Loader = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 3px solid red;
  border-top-color: blue;
`;
