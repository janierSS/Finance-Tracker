import React, {useState} from 'react'
import styles from "./Signup.module.css"
import { useSignup } from '../../hooks/useSignup';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const {signup, isPending, error} = useSignup()

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault()
    signup(email, password, username)
  }

  return (
    <form className={styles["signup-form"]} onSubmit={submitHandler}>
      <h2>Signup</h2>
      <label>
        <span>username:</span>
        <input type="text" onChange={usernameHandler} value={username} />
      </label>
      <label>
        <span>email:</span>
        <input type="email" onChange={emailHandler} value={email} />
      </label>
      <label>
        <span>password:</span>
        <input type="password" onChange={passwordHandler} value={password} />
      </label>
      {!isPending && <button className="btn">Signup</button>}
      {isPending && <button className='btn' disabled>loading...</button>}
      {error && <p>{error}</p>}
    </form>
  );
}

export default Signup