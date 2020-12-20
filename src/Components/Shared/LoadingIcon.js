import React from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";

const LoadingIcon = ({ big, small, visibiliy }) => {
  return (
    <div>
      {big ? (
        <Loader>
          <Spinner />
        </Loader>
      ) : (
        <LoaderSmall visibiliy={visibiliy} />
      )}
    </div>
  );
};

export default LoadingIcon;

// styels
const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
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
const LoaderSmall = styled.div`
  position: absolute;
  top: calc(50% - 15px);
  left: calc(50% - 15px);
  height: 30px;
  width: 30px;
  opacity: 1;
  visibility: ${(props) => props.visibiliy};
  animation: rotate_drawer_loader 0.5s ease-in infinite alternate;
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
