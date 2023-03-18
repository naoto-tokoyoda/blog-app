import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

import { FacebookShareButton, FacebookIcon,
         LinkedinShareButton, LinkedinIcon,
         TwitterShareButton, TwitterIcon
} from "react-share";

import Footer from "../footer/Footer";

import "./singlePost.css";
import { axiosInstance } from "../../config";

// for edit article, you can use this --> https://uiwjs.github.io/react-md-editor/

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
      console.log(res);
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
      });
      setUpdateMode(false)
    } catch (err) {}
  };

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

        <div className="singlePostCategoriesLists">
          {
            cats.map(( cat ) => (
              <li className="postCat">
                <Link to={`/?cat=${cat}`} className="link">
                  {cat}
                </Link>
              </li>
            ))
          }
        </div>

            
        

        <div className="singlePostSocialMediaIcons">
          <FacebookShareButton url={shareUrl}>
            {/* <i className=" fa-brands fa-square-facebook"></i> */}
            <FacebookIcon  className="socialMediaIcon"/>
          </FacebookShareButton>

          <TwitterShareButton url={shareUrl}>
            {/* <i className=" fa-brands fa-square-twitter"></i> */}
            <TwitterIcon className="socialMediaIcon" />
          </TwitterShareButton>

          <LinkedinShareButton url={shareUrl}>
            {/* <i className=" fa-brands fa-linkedin"></i> */}
            <LinkedinIcon className="socialMediaIcon" />
          </LinkedinShareButton>
            
            
            
        </div>
        <hr />
        
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
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
