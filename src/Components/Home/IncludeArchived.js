import React from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";

const IncludeArchived = ({ showArchived, setShowArchived }) => {
  return (
    <Container>
      <p>Include sold:</p>
      <Pill
        flex={showArchived ? "flex-end" : "flex-start"}
        color={showArchived ? "#fff" : "#7249d1"}
        bg={showArchived ? "#7249d1" : "#fff"}
      >
        <span>On Off</span>
        <Circle
          left={showArchived ? "calc(100% - 1.8rem)" : "0"}
          onClick={() => {
            setShowArchived(!showArchived);
          }}
        ></Circle>
      </Pill>
    </Container>
  );
};

export default IncludeArchived;

//styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  /* border: 1px solid red; */

  @media ${device.tabletS} {
    width: fit-content;
    align-items: center;
  }
`;
const Pill = styled.div`
  position: relative;
  width: 4rem;
  height: 2.2rem;
  color: ${(props) => props.color};
  display: flex;
  align-items: center;
  transition-duration: 0.2s;
  transition-timing-function: linear;
  background-color: ${(props) => props.bg};
  border-radius: 20px;
  border: 2px solid #7249d1;

  span {
    position: absolute;
    left: -2px;
    width: 4rem;
    display: flex;
    justify-content: center;
    /* border: 1px solid red; */
  }
`;
const Circle = styled.div`
  position: relative;
  left: ${(props) => props.left};
  width: 1.8rem;
  height: 1.8rem;
  transition-duration: 0.2s;
  transition-timing-function: linear;
  cursor: pointer;
  border-radius: 50%;
  background-color: #27d67b;
  /* border: 2px solid #27d67b; */
`;
