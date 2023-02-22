import React, { useEffect } from 'react'

import "./pagenation.css"



const Pagination = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
    const lastPage = Math.ceil(totalPosts/postsPerPage);
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }

    const incrementPageHandler = () => {
        setCurrentPage( currentPage + 1);
        anchorLinkHandler();
    }

    const decrementPageHandler = () => {
        setCurrentPage( currentPage - 1);
        anchorLinkHandler();
    }


    const anchorLinkHandler = () => {
        window.scrollTo(0,0);
    }
    useEffect(() => {
        anchorLinkHandler();
    }, [])
    

    console.log(currentPage);
    
    return (
        <div className='pagination'>
            <button
                disabled={currentPage === 1 ? true : false}
                style={currentPage === 1 ? {opacity:0.2, cursor: 'default',} : {}}
                onClick={decrementPageHandler}
            >
               Previous
            </button>

            <span>
                {currentPage} of {lastPage}
            </span>

            <button
                disabled={currentPage === lastPage ? true : false}
                style={currentPage === lastPage ? {opacity:0.2, cursor: 'default'} : {}}
                onClick={incrementPageHandler}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
