import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";
import { UserContext } from "../Context/UserProvider";
import EditFormEntry from "./EditFormEntry";
import {
  makeTodaysDate,
  formatDateData,
  updateStockInfo,
} from "../../resources/stockUtilities";

const EditModal = ({ stock, editing, setEditing }) => {
  const { currentUser, setCurrentUserStocksAction } = useContext(UserContext);
  const [stockName, setStockName] = useState(stock.name);
  const [monthly, setMonthly] = useState(stock.monthly || false);
  const [dateAdded, setDateAdded] = useState(
    makeTodaysDate(new Date(stock.added))
  );
  const [note, setNote] = useState(stock.note || "");
  const [stockObj, setStockObj] = useState({});
  const [close] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1608616936/Dividend%20Tracker/Icons/SearchResults/close-svgrepo-com_c2ygft.svg"
  );

  useEffect(() => {
    console.log(stock);
    //set the updated object
    setStockObj({
      ...stock,
      name: stockName,
      added: getMillisecondsFromDate(dateAdded),
      note: note,
      monthly: monthly,
    });
  }, [stock, stockName, dateAdded, note, monthly]);

  const calcHowManyDays = (millis) => {
    let today = Date.now(); //get todays milliseconds
    let diff = today - millis; //get the difference from date added
    let days = diff / 86400000; //divide my number of milliseconds in a day
    return parseInt(days);
  };

  const getMillisecondsFromDate = (date) => {
    let millis = Date.parse(formatDateData(date));
    return millis;
  };

  const handleSave = async () => {
    let stocks = await updateStockInfo(currentUser.id, stockObj);
    setCurrentUserStocksAction(stocks);
  };

  return (
    <Container onClick={() => setEditing(false)}>
      <Form onClick={(e) => e.stopPropagation()}>
        <Header>
          Edit: {stock.name}
          <Close src={close} alt="close" onClick={() => setEditing(false)} />
        </Header>
        <FormInputWrapper>
          <EditFormEntry
            fieldName={"Name"}
            type="text"
            value={stockName}
            setter={setStockName}
          />
          <EditFormEntry
            fieldName={"Symbol"}
            type="text"
            value={stock.ticker}
            disabled={true}
          />
          <EditFormEntry
            fieldName={"Date Added"}
            type="date"
            value={dateAdded}
            setter={setDateAdded}
          />
          <EditFormEntry
            fieldName={"Days Owned"}
            type="number"
            value={calcHowManyDays(getMillisecondsFromDate(dateAdded))}
            disabled={true}
          />
          <EditFormEntry
            fieldName={"Notes"}
            type="textarea"
            value={note}
            setter={setNote}
          />
          <EditFormEntry
            fieldName={"Pays Monthly"}
            type="checkbox"
            value={monthly}
            setter={setMonthly}
            checked={monthly}
          />
        </FormInputWrapper>
        <ButtonRow>
          <Save
            type="button"
            value="Update"
            onClick={() => {
              handleSave();
              setEditing(false);
            }}
          />
        </ButtonRow>
      </Form>
    </Container>
  );
};

export default EditModal;

// styles
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  animation: fadeInEditModal 0.4s ease-in-out forwards;
  /* border: 1px solid red; */

  @keyframes fadeInEditModal {
    from {
      opacity: 0;
    }
  }
`;
const Form = styled.div`
  max-width: 700px;
  padding: 0.5rem;
  background-color: #fff;
`;
const Header = styled.h3`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const Close = styled.img`
  width: 1.5rem;
  cursor: pointer;
`;
const FormInputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-around; */
  justify-content: flex-start;
`;
const ButtonRow = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1.8rem;
`;
const Save = styled.input`
  font-family: "Exo", sans-serif;
  font-weight: 600;
  height: 2rem;
  width: 4.5rem;
  cursor: pointer;
  background-color: #27d67b;
  border-radius: 8px;
  outline: none;
  border: none;
`;
