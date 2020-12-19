import React from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";

const LoadingIcon = () => {
  return (
    <Loader>
      <Spinner />
    </Loader>
  );
};

export default LoadingIcon;

// styels
const Loader = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Spinner = styled.div`
  position: fixed;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid;
  border-top-color: blue;
  animation: spinning 1.2s infinite;

  @keyframes spinning {
    to {
      border-radius: 0;
      transform: rotate(360deg);
    }
  }
`;
