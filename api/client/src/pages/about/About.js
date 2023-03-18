import React from 'react'

import "./about.css";
import BlogImage from "../../images/blog-image.png"
import Footer from '../../components/footer/Footer';

export const About = () => {

  return (
    <>
    <div className="about">

        <div className="aboutWrapper">
            <div className="aboutTitle">
                <h1>About</h1>
                <hr />
            </div>
            
            <div className="aboutInfosWrapper">
                <div className="aboutProfile">
                    <img src={BlogImage} alt="" className="aboutProfileImg"/>
                    <h1>NOW.DEV</h1>
                    <h3>Full-Stack Web Developer | JavaScript | React.js | Node.js | Building web applications that users love</h3>
                </div>
            </div>
        </div>
       
        
    </div>
    <Footer />
    </>
  )
}
