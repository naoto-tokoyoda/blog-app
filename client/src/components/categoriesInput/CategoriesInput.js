import React, { useState } from 'react'
import "./categoriesInput.css"
const CategoriesInput = () => {
    const [categories, setCategories] = useState(["react", "node"]);
    const putCategoryHandler = (e) => {
        e.preventDefault();
        console.log(categories);
        
    }
    console.log(categories);
    // https://stackoverflow.com/questions/58773537/react-input-form-without-form-component
  return (
    <div className="categoriesInput">
        <div className="categoriesInputContainter">
            {
                // categories.map((category) => (
                //     <div className="categoryInputItem">
                //         <span className="text">{category}</span>
                //         <span className="close">&times;</span>
                //     </div>
                // ))
            }
        </div>

        <div >
            <input type="text" onChange={e=>setCategories(e.target.value)} required={true}  className="categoriesUserInput" placeholder="Type category..." />
            {/* <button className="" type="submit">
              Add
            </button> */}
        </div>
    </div>
  )
}

export default CategoriesInput