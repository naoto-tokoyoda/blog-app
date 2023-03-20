import React from 'react';
import { Link } from 'react-router-dom';

import "./notFoundPage.css"

const NotFoundPage = () => {
  return (
    <div className="wrapper">
        <h1 className="title">Oops!</h1>
        <p className="description">The page you're looking for doesn't exist.</p>
        <Link className="styled-link" to="/">Go back to home</Link>
  </div>
  );
};

export default NotFoundPage;
