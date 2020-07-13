import React from "react";
import SignUp from "./SignUp";
import Login from "./Login";

const Authenticate = (props) => (
  <div>
    <Login authenticate={props.authenticate} />
    <SignUp authenticate={props.authenticate} />
  </div>
);

export default Authenticate;
