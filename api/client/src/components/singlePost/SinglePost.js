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
      });
      setUpdateMode(false);
      // Update the post object to reflect the changes
      setPost((prevPost) => ({ ...prevPost, title, content: desc }));
    } catch (err) {}
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
          <FacebookShareButton url={shareUrl} quote={title}>
            {/* <i className=" fa-brands fa-square-facebook"></i> */}
            <FacebookIcon  className="socialMediaIcon"/>
          </FacebookShareButton>

          <TwitterShareButton url={shareUrl} quote={title}>
            {/* <i className=" fa-brands fa-square-twitter"></i> */}
            <TwitterIcon className="socialMediaIcon" />
          </TwitterShareButton>

          <LinkedinShareButton url={shareUrl} quote={title}>
            {/* <i className=" fa-brands fa-linkedin"></i> */}
            <LinkedinIcon className="socialMediaIcon" />
          </LinkedinShareButton>
            
        </div>
        <hr />
        
        {updateMode ? (
          <ReactQuill theme="snow" className="singlePostDescInput" value={desc} onChange={setDesc} />
          
        ) : (
          <p className="singlePostDesc" dangerouslySetInnerHTML={{ __html: sanitizeHTML(desc) }}></p>
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