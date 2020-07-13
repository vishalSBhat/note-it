import React from "react";
import ToDoItem from "./ToDoItem";

const ToDoList = (props) => {
  return (
    <div id="list-items" className="mx-2 mx-sm-4 my-4">
      {props.itemList.map((item, index) => {
        return (
          <ToDoItem
            editItem={props.editItem}
            onItemPress={props.onItemPress}
            deleteItem={props.deleteItem}
            key={index}
            id={item._id}
            value={item.item}
            status={item.checked}
          />
        );
      })}
    </div>
  );
};

export default ToDoList;
