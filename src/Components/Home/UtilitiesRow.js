import React, { useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { StocksContext } from "../Context/StocksProvider";

const UtilitiesRow = ({ children }) => {
  const { showAddForm, showAllDivs } = useContext(StocksContext);
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

  return (
    <Container
      ref={navbar}
      vis={showAddForm || showAllDivs.show ? "hidden" : "visible"}
      events={showAddForm || showAllDivs.show ? "none" : "auto"}
      opacity={showAddForm || showAllDivs.show ? "0" : "1"}
    >
      {children}
    </Container>
  );
};

export default UtilitiesRow;

// styles
const Container = styled.div`
  position: static;
  top: 0;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  height: 4.25rem;
  padding: 0 0.3rem;
  margin-bottom: 3rem;
  transition-duration: 0.5s;
  transition-property: top;
  /* border: 1px solid red; */

  @media ${device.tabletS} {
    flex-direction: row;
  }
  @media ${device.tablet} {
    position: sticky;
    z-index: 1;
    visibility: ${(props) => props.vis};
    /* pointer-events: ${(props) => props.events};
    opacity: ${(props) => props.opacity}; */
  }
`;
