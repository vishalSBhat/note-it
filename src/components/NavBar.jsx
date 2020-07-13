import React from "react";
import logo from "../images/logo.png";

const NavBar = (props) => {
  return (
    <div className="mb-4 container">
      <div id="nav-bar">
        <img id="logo" src={logo} alt="" />
        {props.show === "true" && (
          <h3
            onClick={() => props.authenticate("null")}
            className="ml-auto mr-sm-3"
          >
            Logout
          </h3>
        )}
      </div>
    </div>
  );
};

export default NavBar;
