import React, { useState } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";

const Toolbar = () => {
  const [add] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1607372577/Dividend%20Tracker/add-svgrepo-com_jqafqu_ndqnlz.svg"
  );
  return (
    <Container>
      <ReportButton hidden={true}>
        <button>Reports</button>
      </ReportButton>
      <AddTicker>
        <span>Add new stock or fund</span>
        <img src={add} alt="add" />
      </AddTicker>
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
const AddTicker = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 0.3rem;
  cursor: pointer;
  border: 1px solid red;

  img {
    margin-left: 1rem;
    width: 2rem;
  }
`;
const Meter = styled.meter`
  transition-duration: 1s;
  border: 1px solid red;
`;
