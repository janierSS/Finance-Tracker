import React, { useState } from "react";

import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(email, password)
  }

  return (
    <form className={styles["login-form"]} onSubmit={submitHandler}>
      <h2>Login</h2>
      <label>
        <span>email:</span>
        <input type="email" onChange={emailHandler} value={email} />
      </label>
      <label>
        <span>password:</span>
        <input type="password" onChange={passwordHandler} value={password} />
      </label>
      <button className="btn">Login</button>
    </form>
  );
};

export default Login;
