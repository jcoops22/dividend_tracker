import React, { useState } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import AddForm from "../Home/AddForm";

const Toolbar = () => {
  const [add] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1607372577/Dividend%20Tracker/add-svgrepo-com_jqafqu_ndqnlz.svg"
  );
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <Container
      onClick={() => {
        return showAddForm ? setShowAddForm(false) : null;
      }}
    >
      <ReportButton hidden={true}>
        <button>Reports</button>
      </ReportButton>
      <AddTickerWrapper>
        <AddTicker onClick={() => setShowAddForm(!showAddForm)}>
          <span>Add new stock or fund</span>
          <img src={add} alt="add" />
        </AddTicker>
      </AddTickerWrapper>
      {showAddForm ? <AddForm /> : null}
    </Container>
  );
};

export default Toolbar;

// styles
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border: 2px solid #999;

  @media ${device.tabletS} {
    border: none;
  }
`;
const ReportButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  /* border: 2px solid #edc639; */
  border: 1px solid red;

  button {
    width: 6rem;
    height: 3rem;
    cursor: pointer;
    border-radius: 3px;
  }
`;
const AddTickerWrapper = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  /* border: 1px solid red; */
`;
const AddTicker = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 0.3rem;
  border: 1px solid orange;
  img {
    margin-left: 1rem;
    width: 2rem;
  }
`;
