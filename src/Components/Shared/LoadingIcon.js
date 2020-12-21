import React, { useState } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";

const LoadingIcon = ({ height, big, visibiliy, marginTop }) => {
  const [spinnerIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608524427/Dividend%20Tracker/Icons/cube-svgrepo-com_hiothk.svg"
  );

  // <LoaderSmall visibiliy={visibiliy} />
  return (
    <div>
      {big ? (
        <Loader>
          <Wrapper height={height}>
            <Spinner bg="red" height="35%" aniName="height1" delay="0.2s" />
            <Spinner bg="blue" height="80%" aniName="height2" delay="0.4s" />
            <Spinner bg="green" height="20%" aniName="height3" delay="0.6s" />
            <Spinner bg="purple" height="70%" aniName="height4" delay="0.8s" />
            <Spinner bg="orange" height="50%" aniName="height5" delay="1s" />
          </Wrapper>
        </Loader>
      ) : (
        <Wrapper visibiliy={visibiliy} height={height} marginTop={marginTop}>
          <Spinner bg="red" height="35%" aniName="height1" delay="0.2s" />
          <Spinner bg="blue" height="80%" aniName="height2" delay="0.4s" />
          <Spinner bg="green" height="20%" aniName="height3" delay="0.6s" />
          <Spinner bg="purple" height="70%" aniName="height4" delay="0.8s" />
          <Spinner bg="orange" height="50%" aniName="height5" delay="1s" />
        </Wrapper>
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
const Wrapper = styled.div`
  height: ${(props) => props.height};
  width: 9rem;
  transform: rotate(180deg);
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-top: ${(props) => props.marginTop};
  visibility: ${(props) => props.visibiliy};
  border-top: 4px solid #999;
  /* border: 1px solid red; */
`;
const Spinner = styled.div`
  width: 30px;
  height: ${(props) => props.height};
  background-color: ${(props) => props.bg};
  animation: 0.5s alternate infinite forwards;
  animation-name: ${(props) => props.aniName};
  /* animation-delay: ${(props) => props.delay}; */
  /* border: 1px solid red; */

  @keyframes height1 {
    to {
      height: 20%;
    }
  }

  @keyframes height2 {
    to {
      height: 90%;
    }
  }
  @keyframes height3 {
    to {
      height: 60%;
    }
  }
  @keyframes height4 {
    to {
      height: 30%;
    }
  }
  @keyframes height5 {
    to {
      height: 100%;
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
  animation-delay: ${(props) => props.delay};
  border-radius: 50%;
  border: 3px solid red;
  border-top-color: blue;

  @keyframes rotate_drawer_loader {
    to {
      border-radius: 0%;
      transform: rotate(408deg);
    }
  }
`;
