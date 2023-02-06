import React from 'react'

import "./about.css";
import NoImage from "../../images/noImage.jpeg"
import { LinkedinIcon, LinkedinShareButton, } from 'react-share';

export const About = () => {
    const shareUrl = "https://www.linkedin.com/in/naoto-tokoyoda/";



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
                <LinkedinShareButton url="https://www.linkedin.com/in/naoto-tokoyoda/">
                    {/* <i className=" fa-brands fa-linkedin"></i> */}
                    <LinkedinIcon className="socialMediaIcon" />
                </LinkedinShareButton>
                </div>
            </div>

            {/* box2 */}
            <div className="aboutProfileIntroduction">
                <h1>Welcome to My React and Node blog app powered by MongoDB!</h1>    
                        
                <br />
                <br />

                <p>
                    

                    My platform is designed to allow users to create, read, update, and delete blog posts with ease.</p>
                <p> My CRUD system allows you to easily manage your blog posts and includes features such as:</p>
                <ul>
                    <li>User authentication and authorization, ensuring that only authorized users can access and edit their posts.</li>
                    <li>A clean and intuitive user interface for creating and editing posts.</li>
                    <li>The ability to categorize posts and filter based on categories.</li>
                    <li>Real-time updates.</li>
                </ul>

                <br />
                <br />

                <p>We are constantly working to improve our platform, and some areas we are currently focusing on include:</p>
                <br />
                <ul>
                    <li>A search bar for quickly finding specific posts.</li>
                    <li>Responsive user interface that provides an enjoyable experience for all users.</li>
                    <li>Allowed users to see all categories in categories page.</li>
                    <li>Improving load times and overall performance.</li>
                </ul>
                <br />
                <br />
                <p>
                    Thank you for using my React and Node blog app! 
                    <br />
                    I hope you enjoy using it as much as we enjoyed building it.
                </p> 
            </div>
        </div>
    </div>
  )
}
