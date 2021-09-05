import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";

const EditFormEntry = ({ fieldName, type, value, setter, disabled }) => {
  const [lock] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1630824925/Dividend%20Tracker/Icons/lock-svgrepo-com_tnxomg.svg"
  );
  return (
    <Row>
      <label>{fieldName}:</label>
      {type === "textarea" ? (
        <textarea
          rows="4"
          cols="30"
          maxLength="500"
          value={value}
          onChange={(e) => (setter ? setter(e.target.value) : null)}
        ></textarea>
      ) : (
        <SubWrapper>
          <input
            disabled={disabled}
            type={type}
            value={value}
            onChange={(e) => (setter ? setter(e.target.value) : null)}
          />
          {disabled ? <LockSymbol src={lock} alt="locked" /> : null}
        </SubWrapper>
      )}
    </Row>
  );
};

export default EditFormEntry;

//styles
const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0.5rem;

  label {
    margin-right: 0.5rem;
  }
  input {
    padding: 0 0.5rem;
  }
`;
const SubWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
const LockSymbol = styled.img`
  position: absolute;
  left: calc(100% - 2rem);
  width: 1.5rem;
`;
