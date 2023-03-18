import React, { useContext } from 'react'

import { Link, useNavigate } from "react-router-dom";

import './topbar.css'
import { Context } from '../../context/Context';


const Topbar = () => {
  const {user, dispatch} = useContext(Context);
  const PF = "https://naoto-blog.herokuapp.com/images/"
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch({type:"LOGOUT"});
    navigate("/", { replace: true })
  }

  return (
    <div className='top' >
      <div className="topWrapper">
        
        {/* box1 */}
        <div className="topLeft">
            <ul className="topList">
                <li className="topListItem">
                  <Link to="/" className="link">
                    NOW.DEV
                  </Link>
                </li>
                {/* <li className="topListItem">
                  <Link to="/about" className="link">
                    ABOUT
                  </Link>
                </li> */}
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
                    (user && "LOGOUT")
                    
                  }
                </li>
            </ul>    

        {/* <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} /> */}
        </div>

        {/* box2 */}
        <div className="topRight">
        {/* {
          user ? (
            <Link to="/settings">
              <img className="topImg" src={PF + user.profilePic} alt="" />
            </Link>

          ) : (
            <></>
          )
        } */}
        </div>
      </div>
        
    </div>
  )
}

export default Topbar