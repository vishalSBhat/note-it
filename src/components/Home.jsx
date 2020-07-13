import React, { Component } from "react";
import ToDoContainer from "./ToDoContainer";

export default class Home extends Component {
  render() {
    return (
      <div id="to-do-container" className="container p-0 flex-container-parent">
        <div className="row justify-content-center mx-0 mt-3 p-3">
          <ToDoContainer />
        </div>
      </div>
    );
  }
}
