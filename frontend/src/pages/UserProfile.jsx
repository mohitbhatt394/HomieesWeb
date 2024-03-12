import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";

const UserProfile = () => {
    const {user} = useAuth()

  return (

<div className="section-contact">
        <div className="container">
          <h2 className="section-common-heading">user profile</h2>
        </div>

        <div className="container">
          <div className="contact-content">
          <img src={user.avatar} alt="profilePage" style={{width: "130px", height: "130px", borderRadius: "50%"}}/>
          </div>
          <Link to="/userLogout" className="btn">
        log out
      </Link>
        </div>
        
      </div>

      

  );
};

export default UserProfile;
