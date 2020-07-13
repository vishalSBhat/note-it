import React from "react";
import error from "../images/error.jpg";

const InputField = (props) => {
  return (
    <div className="my-2 input-field-container">
      <span className="d-block input-field-placeholder">
        {props.placeholder}
      </span>
      <input
        id={props.id}
        className="p-2 input-field"
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
      <img src={error} alt="Error" className="d-none input-field-error" />
    </div>
  );
};

export default InputField;
