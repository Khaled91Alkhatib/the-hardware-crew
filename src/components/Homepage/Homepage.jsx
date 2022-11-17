import React from 'react';
import "./Homepage.scss";

import homepageImage from "../../site-images/homepage-image.jpg";

const Homepage = () => {
  return (
    <div>
      <div className='homepage-title'>The Hardware Crew</div>
      <div className='main-layout'>
        <img src={homepageImage} alt="homepage" />
      </div>
    </div>
  );
};

export default Homepage;