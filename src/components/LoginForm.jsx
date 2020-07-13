import React, { useState } from "react";
import InputField from "./InputField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const LoginForm = (props) => {
  const [loginData, setLoginData] = useState({ mail: "", password: "" });
  const inputFieldChange = (e) => {
    e.persist();
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    Array.from(
      document.getElementsByClassName("input-field-error")
    ).forEach((ele) => ele.classList.add("d-none"));
    const mail = document.getElementById("login-mail"),
      password = document.getElementById("login-password");

    if (mail.value.trim() === "") {
      mail.nextSibling.classList.toggle("d-none");
      return;
    } else if (password.value.trim() === "") {
      password.nextSibling.classList.toggle("d-none");
      return;
    }
    props.handleSubmit(loginData);
  };

  return (
    <>
      <InputField
        id="login-mail"
        type="text"
        name="mail"
        value={loginData.mail}
        onChange={inputFieldChange}
        placeholder="e-Mail"
      />
      <InputField
        id="login-password"
        type="password"
        name="password"
        value={loginData.password}
        onChange={inputFieldChange}
        placeholder="Password"
      />
      <span
        onClick={validate}
        title="Login"
        className="ml-auto mt-4 float-button"
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </span>
    </>
  );
};

export default LoginForm;
