import React, { useContext }from 'react';
import { Link } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu';
import { Context } from '../../context/Context';

import "./sidebar.css"




const Sidebar = (props) => {

  const {user, dispatch} = useContext(Context);


  const logoutHandler = () => {
    dispatch({type:"LOGOUT"});
  }
  return (
    <Menu right={true} noOverlay={true}>
      <ul className="topList">
                <li className="topListItem">
                  <Link to="/" className="link">
                    NOW.DEV
                  </Link>
                </li>
                <li className="topListItem">
                  <Link to="/about" className="link">
                    ABOUT
                  </Link>
                </li>
                <li className="topListItem">
                  <Link to="/categories" className="link">
                    CATEGORIES
                  </Link>
                </li>

                <li className="topListItem">
                  {
                    user && 
                    <Link to="/write" className="link">
                      WRITE
                    </Link>
                  }
                </li>
               
                <li className="topListItem" onClick={logoutHandler} >
                  {
                    user && "LOGOUT"
                  }
                </li>
            </ul> 
    </Menu>
  );
};

export default Sidebar;