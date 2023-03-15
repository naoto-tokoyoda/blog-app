import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import "./categories.css"
import { axiosInstance } from '../../config';
const Categories = () => {

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
    <div className="categories">

        <div className="categoryItems">
            {/* box1 */}
           <div className="categoryItem">
                <h1 className="categoryTitle">
                    Categories
                </h1>
           </div>

           {/* box2 */}
           <div className="categoryItem">
                <ul className="categoryList">
                    {
                        cats.map((c) => (
                            <li className="categoryListItem">
                                <Link to={`/?cat=${c.name}`} className="link">
                                    {c.name}
                                </Link>
                            </li>
                            
                        ))
                    }
                </ul>
            </div> 
        </div>
    </div>
  )
}

export default Categories