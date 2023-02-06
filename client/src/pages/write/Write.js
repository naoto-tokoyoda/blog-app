import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import NoImage from "../../images/noImage.jpeg"

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cats, setCats] = useState([]);
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      categories: cats,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }

    // you can search on youtube like how to store array in the mongo fro mreact to node 
    if(cats){
      try {
        await axios.post("/categories", {categories: cats});
      } catch (err) {
        console.log(err);
      }
    }


    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };

  

    const putCatHandler = (e) => {
        if(e.keyCode !== 32) return 
        const value = e.target.value;

        if(!value.trim()) return
        setCats([...cats, value])
        
        e.target.value = '';

    }

    const deleteCat = (index) => {
        setCats(cats.filter((cat, i) => i !== index));
    }

  
  return (
    <div className="writeWrapper">
      <div className="write">
        {/* box1 */}
        {/* {file && (
          <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
        )} */}

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
            <div className="catsInputContainer">
                {
                    cats.map((cat, index) => (
                        <div className="catInputItem" key={index}>
                            <span className="text">{cat}</span>
                            <span className="close" onClick={() => deleteCat(index)}>&times;</span>
                        </div>
                    ))
                }
                <input type="text" onKeyDown={putCatHandler} autoCapitalize={true} required={true}  className="catsUserInput" placeholder="Press space key after typing category..." />
            </div>
          </div>

          <div className="writeFormGroup">
            <textarea
              placeholder="Tell your story..."
              type="text"
              className="writeInput writeText"
              onChange={e=>setDesc(e.target.value)}
              required={true}
            ></textarea>
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
