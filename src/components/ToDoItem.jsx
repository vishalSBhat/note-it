import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const ToDoItem = (props) => {
  return (
    <div className="mt-3 py-3 list-item">
      <span
        onClick={() => props.editItemStart(props.id)}
        className="my-auto mr-2 ml-3 list-item-icon edit-icon"
        title="Edit"
      >
        <FontAwesomeIcon icon={faEdit} />
      </span>
      <span onClick={() => props.onItemPress(props.id)}>
        <input
          onChange={(e) => props.editItemUpdateValue(props.id, e.target.value)}
          id={props.id}
          type="text"
          readOnly="readonly"
          className={props.status ? "m-0 p-0 item-checked" : "m-0 p-0"}
          value={props.value}
        />
      </span>
      <span
        id={`edit${props.id}`}
        onClick={() => props.editItem(props.id)}
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
