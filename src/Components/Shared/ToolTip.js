import React from "react";
import styled from "styled-components";

const ToolTip = ({ children, tip, width, pos }) => {
  return (
    <Container>
      <Wrapper width={width} left={pos}>
        <span>{tip}</span>
        <Triangle />
      </Wrapper>
      {children}
    </Container>
  );
};

export default ToolTip;

// styles
const Wrapper = styled.div`
  position: absolute;
  top: -2.1rem;
  left: ${(props) => props.left};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.7rem;
  width: ${(props) => props.width};
  padding: 0.1rem;
  opacity: 0;
  transition-delay: 0;
  transition-duration: 0.2s;
  background-color: #333;
  border-radius: 5px;
  pointer-events: none;
  /* border: 2px solid red; */

  span {
    font-size: 0.7rem;
    color: #fff;
  }
`;
const Container = styled.div`
  &:hover ${Wrapper} {
    transition-delay: 0.5s;
    opacity: 1;
  }
  position: relative;
`;
const Triangle = styled.div`
  position: absolute;
  top: calc(100% - 5px);
  height: 10px;
  width: 10px;
  background-color: #333;
  transform: rotate(45deg);
  border-radius: 1px;
  /* border: 1px solid red; */
`;
