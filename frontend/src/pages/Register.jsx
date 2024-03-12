import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    avatar: null,
  });

  const navigate = useNavigate();

  const handelInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setUser((prevUser) => ({ ...prevUser, avatar: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      for (const key in user) {
        formData.append(key, user[key]);
      }

      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(response);
      if (response.status === 201) {
        toast.success(`you have successfully register with email: ${response.data.data.createdUser.email}`);
        navigate("/userLogin");
      } else {
        toast.error(`Registration failed: ${response.data}`);
      }
    } catch (error) {
      console.error("Register Error:", error);
      toast.error(`Registration failed. Please try again later. ${error}`);
    }

  };

  return (
    <>
      <div className="section-contact">
        <div className="container">
          <h2 className="section-common-heading">User Registration</h2>
        </div>

        <div className="container">
          <div className="contact-content">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  placeholder="Enter your username"
                  value={user.username}
                  onChange={handelInput}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  value={user.email}
                  onChange={handelInput}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  placeholder="Enter your password"
                  value={user.password}
                  onChange={handelInput}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="avatar">Profile Picture:</label>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </div>

              <div>
                <button type="submit" className="btn btn-submit">
                  Register
                </button>
              </div>

              <div style={{ textAlign: "right" }}>
                <Link style={{ color: "blue" }} to="/userLogin">
                  already have an account?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
