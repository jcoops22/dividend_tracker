import React from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

const DividendsForm = ({ stock }) => {
  return (
    <Container>
      <h1>Dividends form</h1>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DividendsForm);

// styles
const Container = styled.div`
  background-color: green;
`;
