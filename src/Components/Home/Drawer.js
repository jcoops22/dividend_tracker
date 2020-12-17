import React from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";

const Drawer = ({ stock, open, loading, data }) => {
  return (
    <Container animationName={open ? "open_drawer" : "noname"}>
      {loading ? (
        "loading"
      ) : (
        <InfoWrapper>
          <Row>
            <span>Market Value:{data.value}</span>
          </Row>
          <Row>
            <span>
              Yield:
              {data.yield ? data.yield.toString().substring(0, 4) + "%" : null}
            </span>
          </Row>
        </InfoWrapper>
      )}
    </Container>
  );
};

export default Drawer;

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
