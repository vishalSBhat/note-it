import React from "react";
import axios from "axios";
import LoginForm from "./LoginForm";

const Login = (props) => {
  const handleSubmit = ({ name, mail, password }) => {
    const loading = document.getElementById("loading-container");
    loading.classList.remove("d-none");
    axios
      .post("https://powerful-temple-81597.herokuapp.com/login/", {
        mail,
        password,
      })
      .then((res) => {
        setTimeout(() => loading.classList.add("d-none"), 700);
        setTimeout(() => {
          props.authenticate(res.data.token);
          if (res.data.token === "null") alert(res.data.message);
        }, 1000);
      });
  };
  return (
    <div className="col-12 col-sm-4 py-3 pt-sm-0" id="login-form">
      <h3 className="my-4">Login to-Do</h3>
      <LoginForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default Login;
