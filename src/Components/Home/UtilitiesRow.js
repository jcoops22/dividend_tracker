import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";

const UtilitiesRow = ({ children }) => {
  const navbar = useRef();
  // scroll pos for showHideNavbar func
  var prevScrollpos = window.pageYOffset;

  useEffect(() => {
    window.addEventListener("scroll", showHideNavbar);
    // clean up
    return () => {
      window.removeEventListener("scroll", showHideNavbar);
    };
  }, [navbar]);

  const showHideNavbar = () => {
    /* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      navbar.current.style.top = "52.8px";
    } else {
      navbar.current.style.top = `0rem`;
    }
    prevScrollpos = currentScrollPos;
  };

  return <Container ref={navbar}>{children}</Container>;
};

export default UtilitiesRow;

// styles
const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: center;
  transition-duration: 0.5s;

  @media ${device.tabletS} {
    flex-direction: row;
  }
`;
