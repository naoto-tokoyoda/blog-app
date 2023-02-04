import React from 'react'

import {Link} from "react-router-dom";

import "./post.css"

const Post = ({ post }) => {
    const PF = "http://localhost:5001/images/";

    console.log(post.categories);

  return (
    <div className="post">
        <span className="postDate">
            {new Date(post.createdAt).toDateString()}
        </span>
        {
            post.photo && (
                <img
                    className="postImg"
                    src={PF + post.photo}
                    alt=""
                />
            )
        }

       
        <div className="postInfo">
            
            <Link to={`/post/${post._id}`} className="link">
                 <span className="postTitle">{post.title}</span>
            </Link>
            <ul className="postCats">
                {
                    post.categories.map((cat) => (
                        <Link to={`/?cat=${cat}`} className="link">
                            <li className="postCat" >{cat}</li>
                        </Link>
                    ))
                }

            </ul>
                

            <hr />
            
        </div>
        <p className="postDesc">
            {post.desc}
        </p>
        <div className="readMoreWrapper">
            <Link to={`/post/${post._id}`} className="link">
                <div className="readmore">
                    <p>Read More</p> 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                </div>
            </Link>
        </div>
        
    </div>
  )
}

export default Post