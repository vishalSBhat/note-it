import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const ToDoItem = (props) => {
  const [name, setItemName] = useState(props.value);

  const editItemStart = (id) => {
    document.getElementById(id).removeAttribute("readonly");
    document.getElementById(id).classList.add("input-edit");
    document.getElementById(id).focus();
    document.getElementById(`edit${id}`).classList.remove("d-none");
  };

  const editItem = (id) => {
    document.getElementById(id).setAttribute("readonly", "readonly");
    document.getElementById(id).classList.remove("input-edit");
    document.getElementById(`edit${id}`).classList.add("d-none");
    props.editItem(id, name);
  };

  return (
    <div className="mt-3 py-3 list-item">
      <span
        onClick={() => editItemStart(props.id)}
        className="my-auto mr-2 ml-3 list-item-icon edit-icon"
        title="Edit"
      >
        <FontAwesomeIcon icon={faEdit} />
      </span>
      <span onClick={() => props.onItemPress(props.id)}>
        <input
          onChange={(e) => setItemName(e.target.value)}
          id={props.id}
          type="text"
          readOnly="readonly"
          className={props.status ? "m-0 p-0 item-checked" : "m-0 p-0"}
          value={name}
        />
      </span>
      <span
        id={`edit${props.id}`}
        onClick={() => editItem(props.id)}
        className="d-none my-auto"
        title="Edit"
      >
        <FontAwesomeIcon icon={faCheck} />
      </span>
      <span
        onClick={() => props.deleteItem(props.id)}
        className="my-auto mr-2 list-item-icon delete-icon"
        title="Delete"
      >
        <FontAwesomeIcon icon={faTrash} />
      </span>
    </div>
  );
};

export default ToDoItem;
