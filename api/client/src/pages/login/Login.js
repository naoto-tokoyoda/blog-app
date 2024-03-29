import { useContext, useRef, useState } from "react";
import { Context } from "../../context/Context";

import "./login.css"
import { axiosInstance } from "../../config";

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
      const res = await axiosInstance.post("/auth/login", {
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
      <span className="loginTitle">Admin Panel</span>
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
    </div>
  )
}

export default Login