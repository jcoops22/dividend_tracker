import React, { useState } from "react";
import styled from "styled-components";
import EditModal from "./EditModal";
import ToolTip from "../Shared/ToolTip";

const EditStock = ({ stock }) => {
  const [editing, setEditing] = useState(false);
  const [editIcon] = useState(
    "https://res.cloudinary.com/drucvvo7f/image/upload/v1630904132/Dividend%20Tracker/Icons/edit-list-svgrepo-com_p0qjtu.svg"
  );

  return (
    <Wrapper>
      <img src={editIcon} alt="edit" onClick={() => setEditing(true)} />
      {editing ? (
        <EditModal editing={editing} setEditing={setEditing} stock={stock} />
      ) : null}
    </Wrapper>
  );
};

export default EditStock;

//styles
const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  /* border: 1px solid red; */

  img {
    cursor: pointer;
    width: 1rem;
    margin-left: 1rem;
  }
`;
