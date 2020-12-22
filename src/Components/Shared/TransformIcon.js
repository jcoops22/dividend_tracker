import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { device } from "../../resources/mediaquery";

const TransformIcon = ({ first, second, transform, w1, w2 }) => {
  useEffect(() => {
    // console.log(transform);
  }, [transform]);

  return (
    <Container>
      {transform ? (
        <Second width={w2}>
          <img src={second} alt="second" />
        </Second>
      ) : (
        <First width={w1}>
          <img src={first} alt="first" />
        </First>
      )}
    </Container>
  );
};

export default TransformIcon;

// styles
const ImageDiv = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width};

  img {
    width: 100%;
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
`;
const First = styled.div`
  ${ImageDiv}
  transform: scale(1);
  opacity: 1;
  animation: whirl_image_out 0.3s forwards;

  @keyframes whirl_image_out {
    from {
      transform: scale(0.1);
      opacity: 0;
    }
  }
`;
const Second = styled.div`
  ${ImageDiv}
  opacity: 0;
  transform: scale(0.1);
  animation: whirl_image_in 0.3s forwards;

  @keyframes whirl_image_in {
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;
