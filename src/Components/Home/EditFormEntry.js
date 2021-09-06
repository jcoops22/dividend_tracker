import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { device } from "../../resources/mediaquery";

const EditFormEntry = ({
  fieldName,
  type,
  value,
  setter,
  disabled,
  checked,
}) => {
  const [lock] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1630824925/Dividend%20Tracker/Icons/lock-svgrepo-com_tnxomg.svg"
  );

  const handleSetter = (e, setr) => {
    if (type === "checkbox") {
      checked = setr(!value);
    } else {
      setr(e.target.value);
    }
  };
  return (
    <Row>
      <label>{fieldName}:</label>
      {type === "textarea" ? (
        <textarea
          rows="4"
          cols="30"
          maxLength="500"
          value={value}
          onChange={(e) => handleSetter(e, setter)}
        ></textarea>
      ) : (
        <SubWrapper>
          <Input
            checked={checked}
            disabled={disabled}
            bg={disabled ? "#ccc" : null}
            type={type}
            value={value}
            onChange={(e) => (setter ? handleSetter(e, setter) : null)}
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
  align-items: center;
  margin: 0.5rem;

  label {
    margin-right: 0.5rem;
  }
`;
const Input = styled.input`
  padding: 0 0.5rem;
  background-color: ${(props) => props.bg};
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
