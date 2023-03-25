import { useContext, useState } from "react";
import "./write.css";
import { Context } from "../../context/Context";
import NoImage from "../../images/noImage.jpeg"
import { axiosInstance } from "../../config";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cats, setCats] = useState([]);
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

console.log(desc);  
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      categories: cats,
    };

    console.log(newPost);

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {
        console.error("Error in /upload route:", err);
      }
    }

    
    if (cats) {
      console.log("Sending categories data:", { name: cats });
    
      // Log request headers and body
      console.log("Request headers:", axiosInstance.defaults.headers);
      console.log("Request body:", JSON.stringify({ name: cats }));

      // capitalize First Letter in cats array
      const capitalizedCats = cats.map(capitalizeFirstLetter);
    
      try {
        // console.log("Full URL for /categories:", axiosInstance.defaults.baseURL + "categories");
        // const response = await axiosInstance.post("/categories", { name: capitalizedCats });
        await axiosInstance.post("/categories", { name: capitalizedCats });
        // console.log("Response from /categories:", response);
      } catch (err) {
        console.error("Error in /categories route:", err);
      }
    }
    

    try {
      const res = await axiosInstance.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };

  

    const putCatHandler = (e) => {
      if(e.keyCode !== 32) return 
      //avoid space key at the first letter
      const value = e.target.value.trimStart();

      //add all element
      if(!value.trim()) return 
      setCats([...cats, value]);
      
      e.target.value = "";
      
    }

    const deleteCat = (index) => {
        setCats(cats.filter((cat, i) => i !== index));
    }

  
  return (
    <div className="writeWrapper">
      <div className="write">
        {/* box1 */}
        {
          !file ? <img className="writeNoImg" src={NoImage} alt="" />
          : <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
        }

        {/* box2 */}
        <form className="writeForm" onSubmit={handleSubmit}>

          <div className="writeFormGroup">
            <input
              type="file"
              id="fileInput"
              onChange={(e) => setFile(e.target.files[0])}
              required={true}
            />
            <input
              type="text"
              placeholder="Title..."
              className="writeInput"
              autoFocus={true}
              onChange={e=>setTitle(e.target.value)}
              required={true}
              autoCapitalize={true}
            />
          </div>

          <div className="writeFormGroup">
                {
                    cats.map((cat, index) => (
                        <div className="catInputItem" key={index}>
                            <span className="text">{cat}</span>
                            <span className="close" onClick={() => deleteCat(index)}>&times;</span>
                        </div>
                    ))
                }
                <input type="text" onKeyDown={putCatHandler} autoCapitalize={true} disabled={cats.length >= 5 ? true : false} required={true}  className="catsUserInput" style={cats.length >= 5 ? {marginBottom:'15px'} : {}} placeholder="Press space key after typing category..."/>
                {
                  cats.length >= 5 ? (<span style={{ color: "red"}}>You can put only 5 categories</span>)
                                   : <></> 
                }
          </div>

          <div className="writeFormGroup">
            {/* <textarea
              placeholder="Tell your story..."
              type="text"
              className="writeInput writeText"
              onChange={e=>setDesc(e.target.value)}
              required={true}
              
            ></textarea> */}
            {/* <ReactQuill theme="snow" className="editor" onChange={e=>setDesc(e.target.value)} required={true}/> */}
            <ReactQuill theme="snow" className="editor" value={desc} onChange={setDesc} />
          </div>
          
          <div className="writeFormGroup">
            <button className="writeSubmit" type="submit">
              Publish
            </button>
          </div>
          
        </form>
      </div>
      
    </div>
  );
}
