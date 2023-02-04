import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { Context } from "../../context/Context";

import "./login.css"

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(false);
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      setError(true);
    }
  };
  //to check out it is logged in or not
  // console.log(isFetching);  
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={submitHandler}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
          required={true}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
          required={true}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>

      {error && <span style={{color: "red", marginTop: "5px"}}>Username and password do not match.</span>  }

      {/* <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button> */}
    </div>
  )
}

export default Login