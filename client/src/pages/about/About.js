import React from 'react'

import "./about.css";
import NoImage from "../../images/noImage.jpeg"
import { LinkedinIcon, LinkedinShareButton, } from 'react-share';

export const About = () => {

  return (
    <div className="about">
        <div className="aboutTitle">
            <h1>About</h1>
            <hr />
        </div>
        
        <div className="aboutInfosWrapper">
            {/* box1 */}
            <div className="aboutProfile">
                <img src={NoImage} alt="" className="aboutProfileImg"/>
                <h1>Naoto Tokoyoda</h1>
                <h3>Full-Stack Web Developer | JavaScript | React.js | Node.js | Building web applications that users love</h3>
                <div className="singlePostSocialMediaIcons">
                    {/* <LinkedinShareButton url="https://www.linkedin.com/in/naoto-tokoyoda/">
                        <LinkedinIcon className="socialMediaIcon" />
                    </LinkedinShareButton> */}
                </div>
            </div>

           
        </div>
    </div>
  )
}
