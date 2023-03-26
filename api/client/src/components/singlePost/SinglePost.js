import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

import ReactQuill from "react-quill";

import DOMPurify from "dompurify";

import { FacebookShareButton, FacebookIcon,
         LinkedinShareButton, LinkedinIcon,
         TwitterShareButton, TwitterIcon
} from "react-share";

import Footer from "../footer/Footer";

import "./singlePost.css";
import { axiosInstance } from "../../config";


export default function SinglePost() {
  const location = useLocation();
  const shareUrl = window.location.href;
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "https://naoto-blog.herokuapp.com/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cats, setCats] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);


  useEffect(() => {
    const getPost = async () => {
      const res = await axiosInstance.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setCats(res.data.categories);
    };
    getPost();
  }, [path]);

  const deleteHandler = async () => {
    try {
      await axiosInstance.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };


  const updateHandler = async () => {
    try {
      await axiosInstance.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
        categories: cats,
      });
      setUpdateMode(false);
     // Update the post object to reflect the changes
    setPost((prevPost) => ({ ...prevPost, title, content: desc, categories: cats }));
    } catch (err) {}
  };

  const putCatHandler = (e) => {
    if (e.keyCode !== 32) return;
    const value = e.target.value.trimStart();
    if (!value.trim()) return;
    setCats([...cats, value]);
    e.target.value = "";
  };

  const deleteCat = (index) => {
    setCats(cats.filter((cat, i) => i !== index));
  };


  // This function sanitizes the input HTML and returns a clean version
  function sanitizeHTML(html) {
    return DOMPurify.sanitize(html);
  }


  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <span className="singlePostDate">
          {new Date(post.createdAt).toDateString()}
        </span>
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={deleteHandler}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div
          className="singlePostCategoriesLists"
          style={updateMode ? { flexDirection: "column" } : {}}
        >
          {updateMode ? (
            <>
              <div className="singlePostCat">
                {cats.map((cat, index) => (
                  <div className="postCat" key={index}>
                    <span className="text">{cat}</span>
                    <span className="close" onClick={() => deleteCat(index)}>
                      &times;
                    </span>
                  </div>
                ))}
              </div>
              <div className="singlePostcatsUserInput">
                <input
                  type="text"
                  onKeyDown={putCatHandler}
                  autoCapitalize="true"
                  disabled={cats.length >= 5 ? true : false}
                  className="catsUserInput"
                  style={
                    cats.length >= 5 ? { marginBottom: "15px" } : {}
                  }
                  placeholder="Press space key after typing category..."
                />
                {cats.length >= 5 ? (
                  <span style={{ color: "red" }}>
                    You can put only 5 categories
                  </span>
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            cats.map((cat) => (
              <li className="postCat">
                <Link to={`/?cat=${cat}`} className="link">
                  {cat}
                </Link>
              </li>
            ))
          )}
        </div>
        {updateMode ? (
          <div style={{ marginBottom: "30px" }}></div>
        ) : (
          <div className="singlePostSocialMediaIcons">
            <FacebookShareButton url={shareUrl} quote={title}>
              <FacebookIcon className="socialMediaIcon" />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} quote={title}>
              <TwitterIcon className="socialMediaIcon" />
            </TwitterShareButton>
            <LinkedinShareButton url={shareUrl} quote={title}>
              <LinkedinIcon className="socialMediaIcon" />
            </LinkedinShareButton>
            <hr />
          </div>
        )}
        {updateMode ? (
          <ReactQuill
            theme="snow"
            className="singlePostDescInput"
            value={desc}
            onChange={setDesc}
          />
        ) : (
          <p
            className="singlePostDesc"
            dangerouslySetInnerHTML={{ __html: sanitizeHTML(desc) }}
          ></p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={updateHandler}>
            Update
          </button>
        )}
        </div>
        <Footer/>
      </div>
    );
}


   
