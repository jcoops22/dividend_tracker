import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectShowAllDivs } from "../../redux/stocks/stocks-selectors";
import { setShowAllDivs } from "../../redux/stocks/stocks-actions";
import AddForm from "../Home/AddForm";
import ViewAll from "../Home/ViewAll";

const Toolbar = ({ selectShowAllDivs }) => {
  const [add] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608615849/Dividend%20Tracker/Icons/Stock%20Toolbar/plus-svgrepo-com_mtsovt.svg"
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [showViewAllForm, setShowViewAllForm] = useState(
    selectShowAllDivs.show
  );

  useEffect(() => {
    console.log(showViewAllForm);
    setShowViewAllForm(selectShowAllDivs.show);
  }, [selectShowAllDivs, showViewAllForm]);

  return (
    <Container
      onClick={() => {
        return showAddForm ? setShowAddForm(false) : null;
      }}
    >
      <ReportButton>
        <button>Reports</button>
      </ReportButton>
      <AddTickerWrapper>
        <AddTicker onClick={() => setShowAddForm(true)}>
          <span>Add stock</span>
          <img src={add} alt="add" />
        </AddTicker>
      </AddTickerWrapper>
      {showAddForm ? <AddForm /> : null}
      {showViewAllForm ? <ViewAll payouts={selectShowAllDivs.payouts} /> : null}
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  selectShowAllDivs: selectShowAllDivs,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);

// styles
const Container = styled.div`
  width: 100%;
  height: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  margin-bottom: 3rem;
  padding: 0;
  overflow: hidden;
  opacity: 0;
  animation: drop_toolbar_down 0.5s 1s forwards;
  border-bottom: 2px solid #999;

  @keyframes drop_toolbar_down {
    to {
      opacity: 1;
      padding: 0.5rem;
      height: 4.25rem;
    }
  }
`;
const ReportButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  /* border: 2px solid #edc639; */
  /* border: 1px solid red; */

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
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 1rem;
  box-shadow: 2px 2px 8px 0 #999;
  cursor: pointer;
  /* border: 1px solid orange; */
  img {
    margin-left: 1rem;
    width: 2rem;
  }
`;
