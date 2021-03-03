import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import AddForm from "../Home/AddForm";
import ViewAll from "../Home/ViewAll";
import { StocksContext } from "../Context/StocksProvider";

const Toolbar = ({ history }) => {
  const { showAllDivs } = useContext(StocksContext);
  const [add] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608615849/Dividend%20Tracker/Icons/Stock%20Toolbar/plus-svgrepo-com_mtsovt.svg"
  );
  const [reportIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1614794559/Dividend%20Tracker/Icons/analytics-report-svgrepo-com_lucomp.svg"
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [showViewAllForm, setShowViewAllForm] = useState(
    showAllDivs.show || false
  );

  useEffect(() => {
    setShowViewAllForm(showAllDivs.show);
  }, [showAllDivs, showViewAllForm, showAllDivs]);

  return (
    <Container
      onClick={() => {
        return showAddForm ? setShowAddForm(false) : null;
      }}
    >
      <ButtonWrapper>
        <ReportButton onClick={() => history.push("/reports")}>
          Reports
          <img src={reportIcon} alt="reports" />
        </ReportButton>
      </ButtonWrapper>
      <ButtonWrapper>
        <AddTicker onClick={() => setShowAddForm(true)}>
          <span>Add stock</span>
          <img src={add} alt="add" />
        </AddTicker>
      </ButtonWrapper>
      {showAddForm ? <AddForm /> : null}
      {showViewAllForm ? <ViewAll payouts={showAllDivs.payouts} /> : null}
    </Container>
  );
};

export default withRouter(Toolbar);

// styles
const Container = styled.div`
  width: 100%;
  height: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  background-color: #7249d1;
  background-color: #edc639;
  background-color: #fff;
  margin-bottom: 3rem;
  padding: 0;
  overflow: hidden;
  opacity: 0;
  animation: drop_toolbar_down 0.5s 1s forwards;
  border-bottom: 2px solid #999;
  /* border: 1px solid red; */

  @keyframes drop_toolbar_down {
    to {
      opacity: 1;
      padding: 0.5rem;
      height: 4.25rem;
    }
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  /* border: 1px solid red; */
`;
const ReportButton = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 1rem;
  box-shadow: 2px 2px 8px 0 #999;
  background-color: #fff;
  cursor: pointer;
  /* border: 1px solid orange; */

  img {
    margin-left: 1rem;
    width: 2rem;
  }
`;
const AddTicker = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 1rem;
  box-shadow: 2px 2px 8px 0 #999;
  background-color: #fff;
  cursor: pointer;
  /* border: 1px solid orange; */

  img {
    margin-left: 1rem;
    width: 2rem;
  }
`;
