import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";

import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Footer from '../../components/footer/Footer';
import Pagination from '../../components/pagination/Pagination';

import "./home.css"
import { axiosInstance } from '../../config';



const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const {search} = useLocation();


  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axiosInstance.get("/posts" + search);
      //sort posts ordered by createdAt. Whenever user created post, its post will be at the top.
      const sortedData = res.data.sort((a,b) => a.createAt < b.createAt ? 1 : -1);
      setPosts(sortedData);
    }
    fetchPosts();
    
  }, [search]);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = posts.slice(firstPostIndex, lastPostIndex);



  return (
    <>
      <Header />
      <div className="home" >
        {
          posts.length > 0 ? (
          <>
            <Posts 
              posts={currentPosts}
            />
            <Pagination
                totalPosts={posts.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
           <Footer />
          </>
          ) : (
          <h2>Found no post</h2>
          
        )}
        
      </div>

    </>
    
  )
}

export default Home