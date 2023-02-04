import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post('/auth/register', {
        username,
        email,
        password,
      });
      if (res.data) window.location.replace('/login');
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={submitHandler}>
        <label htmlFor="">Username</label>
        <input
          type="text"
          className="registerInput"
          name=""
          id=""
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="">Email</label>
        <input
          type="text"
          className="registerInput"
          name=""
          id=""
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="">Password</label>
        <input
          type="password"
          className="registerInput"
          name=""
          id=""
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="registerButton">
          Register
        </button>
      </form>
      {error && (
        <span style={{ color: 'red', marginTop: '5px' }}>
          Something went wrong
        </span>
      )}
    </div>
  );
};

export default Register;
