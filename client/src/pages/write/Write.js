import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import CategoriesInput from "../../components/categoriesInput/CategoriesInput"
import NoImage from "../../images/noImage.jpeg"

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cats, setcats] = useState(["react", "node"]);
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
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
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };

  
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
              placeholder="Title"
              className="writeInput"
              autoFocus={true}
              onChange={e=>setTitle(e.target.value)}
              required={true}
            />
          </div>

          <div className="writeFormGroup">
          {
            // https://stackoverflow.com/questions/58773537/react-input-form-without-form-component
          }
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
