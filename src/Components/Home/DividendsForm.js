import React from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

const DividendsForm = ({ stock }) => {
  return (
    <Container>
      <Row>
        <Amount>
          <label>Amount:</label>
          <RowInput>
            <span>&#36;</span>
            <input
              autoFocus
              type="number"
              min="0"
              step="0.01"
              default="0.00"
              onChange={(e) => console.log(e.target.value)}
            />
          </RowInput>
        </Amount>
        <DateWrapper>
          <label>Date:</label>
          <input type="date" onChange={(e) => console.log(e.target.value)} />
        </DateWrapper>
        <button>Enter</button>
      </Row>
      <History>
        <h6>History:</h6>
        <HistoryWrapper>
          <HistoryLine>
            <div>
              <p>$0.45</p>
              <span>11/30/20</span>
            </div>
          </HistoryLine>
          <HistoryLine>
            <div>
              <p>$0.45</p>
              <span>11/30/20</span>
            </div>
          </HistoryLine>
          <HistoryLine>
            <div>
              <p>$0.45</p>
              <span>11/30/20</span>
            </div>
          </HistoryLine>
          <HistoryLine>
            <div>
              <p>$0.45</p>
              <span>11/30/20</span>
            </div>
          </HistoryLine>
          <HistoryLine>
            <div>
              <p>$0.45</p>
              <span>11/30/20</span>
            </div>
          </HistoryLine>
        </HistoryWrapper>
      </History>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DividendsForm);

// styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  /* border: 1px solid red; */

  label {
    font-size: 0.9rem;
    color: #444;
  }
  input {
    width: 100%;
    height: 2rem;
    font-size: 1.2rem;
    /* margin-right: 2rem; */
    border: none;
    outline: none;

    @media ${device.tabletS} {
      /* font-size: 1.5rem; */
    }
  }
  input[type="number"] {
    max-width: 100px;
    /* border: 1px solid orange; */
  }
  button {
    &:focus {
      outline: none;
    }
    &:hover {
      background-color: #27d67b;
      color: #fff;
    }
    color: #27d67b;
    height: 2rem;
    width: 7rem;
    margin-left: auto;
    background-color: #fff;
    cursor: pointer;
    transition-duration: 0.2s;
    border-radius: 20px;
    border: 2px solid #27d67b;
  }
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 0 0.5rem;
  background-color: #fff;
  border-bottom: 2px solid #999;
  /* border: 1px solid blue; */

  @media ${device.tablet} {
    justify-content: space-between;
  }
`;
const RowInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: #fff;
  /* border: 1px solid red; */
`;
const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.tabletS} {
    margin-left: 2rem;
  }
`;
const Amount = styled.div`
  display: flex;
  flex-direction: column;
`;
const History = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  h6 {
    font-size: 0.9rem;
    padding: 0.1rem 0 0 0.2rem;
  }
`;
const HistoryWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 0.5rem;
  /* border: 1px solid red; */

  @media ${device.tabletS} {
    padding: 0 1rem;
  }
`;
const HistoryLine = styled.div`
  width: 48%;
  margin: 0 0.1rem;
  border: 1px solid #333;
  border-top: none;
  /* border: 1px solid red; */

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 0.2rem;
    width: 100%;

    p {
      font-size: 1rem;
    }
    span {
      font-size: 0.8rem;
      color: #999;
    }
  }
`;
