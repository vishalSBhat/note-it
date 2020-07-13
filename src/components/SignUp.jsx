import React from "react";
import SignUpForm from "./SignUpForm";

const axios = require("axios");

const SignUp = (props) => {
  const handleSubmit = ({ name, mail, password }) => {
    const loading = document.getElementById("loading-container");
    loading.classList.remove("d-none");
    axios
      .post("http://localhost:5000/signup/", { name, mail, password })
      .then((res) => {
        setTimeout(() => loading.classList.add("d-none"), 700);
        setTimeout(() => {
          props.authenticate(res.data.token);
          if (res.data.token === "null") alert(res.data.message);
        }, 1000);
      });
  };

  return (
    <div id="signup-form" className="col-12 col-sm-7 ml-0 ml-sm-5 py-5 pl-4">
      <h3 className="my-4">Sign up to-Do</h3>
      <SignUpForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default SignUp;
