import React, { useState } from "react";
import InputField from "./InputField";

const SignUpForm = (props) => {
  const [signUpData, setSignUpData] = useState({
    name: "",
    mail: "",
    password: "",
  });

  const inputFieldChange = (e) => {
    e.persist();
    setSignUpData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    Array.from(
      document.getElementsByClassName("input-field-error")
    ).forEach((ele) => ele.classList.add("d-none"));
    const name = document.getElementById("sign-up-name"),
      mail = document.getElementById("sign-up-mail"),
      password = document.getElementById("sign-up-password");

    if (name.value.trim() === "") {
      name.nextSibling.classList.toggle("d-none");
      return;
    } else if (mail.value.trim() === "") {
      mail.nextSibling.classList.toggle("d-none");
      return;
    } else if (password.value.trim() === "") {
      password.nextSibling.classList.toggle("d-none");
      return;
    }
    props.handleSubmit(signUpData);
  };

  return (
    <>
      <InputField
        id="sign-up-name"
        type="text"
        name="name"
        placeholder="Name"
        value={signUpData.name}
        onChange={inputFieldChange}
      />
      <InputField
        id="sign-up-mail"
        type="text"
        name="mail"
        placeholder="e-Mail"
        value={signUpData.mail}
        onChange={inputFieldChange}
      />
      <InputField
        id="sign-up-password"
        type="password"
        name="password"
        placeholder="Password"
        value={signUpData.password}
        onChange={inputFieldChange}
      />
      <button onClick={validate} className="my-4 btn btn-md btn-light">
        Sign Up
      </button>
    </>
  );
};

export default SignUpForm;
