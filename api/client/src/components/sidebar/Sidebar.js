import React, { useEffect, useState } from 'react'
import "./sidebar.css"
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../config';

const Sidebar = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axiosInstance.get("/categories");
      setCats(res.data);
      console.log(res);
    }

    getCats();
  }, [])
  
  
  



  return (
    <div className="sidebar">
        <div className="sidebarItem">
          <span className="sidebarTitle">
            ABOUT ME
          </span>
            <img
              src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
            <p>
              Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
              amet ex esse.Sunt eu ut nostrud id quis proident.
            </p>
        </div>

        <div className="sidebarItem">
          <span className="sidebarTitle">
            Categories
          </span>
          <ul className="sidebarList">
            {
              cats.map((c) => (
                <Link to={`/?cat=${c.name}`} className="link">
                  <li className="sidebarListItem">{c.name}</li>
                </Link>
              ))
            }
            
          </ul>
          
        </div>
        <div className="sidebarItem">
          <span className="sidebarTitle">FOLLOW US</span>
          <div className="sidebarSocial">
            <i className="sidebarIcon fa-brands fa-square-facebook"></i>
            <i className="sidebarIcon fa-brands fa-square-twitter"></i>
            <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
            <i className="sidebarIcon fa-brands fa-square-instagram"></i>
          </div>
        </div>
       
    </div>
  )
}

export default Sidebar