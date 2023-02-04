import React from 'react'

import Post from '../post/Post'

import "./posts.css"


const Posts = ({posts}) => {
  
  return (
    <div className="posts">
      {
        //to show the latest post 
        posts
        .sort((a,b) => a.updatedAt < b.updatedAt ? 1 : -1)
        .map((p) => (
          <Post post={p} />
        ))
      }
    </div>
  )
}

export default Posts