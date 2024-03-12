import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../store/auth";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();
  const { storeUserTokenInLS } = useAuth();

  const handelInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log(response);
      if (response.ok) {
        const res_data = await response.json();
        console.log(res_data.data);
        storeUserTokenInLS(res_data.data.accessToken, "accessToken");
        toast.success(`Logged in successfully`);
        setUser({ email: "", password: "" });
        navigate("/");
      } else {
          toast.error("An error occurred.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <div className="section-contact">
        <div className="container">
          <h2 className="section-common-heading">user login</h2>
        </div>

        <div className="container">
          <div className="contact-content">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email">email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="enter your email"
                  autoComplete="on"
                  required
                  value={user.email}
                  onChange={handelInput}
                />
              </div>

              <div className="mb-3" style={{ position: "relative" }}>
                <label htmlFor="password">password:</label>
                <input
                  // type={visible ? "text" : "password"}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="enter your password"
                  autoComplete="on"
                  required
                  value={user.password}
                  onChange={handelInput}
                />
                {/* {visible ? (
                  <AiOutlineEye
                    style={{
                      position: "absolute",
                      right: "2px",
                      top: "50%",
                      cursor: "pointer",
                    }}
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    style={{
                      position: "absolute",
                      right: "2px",
                      top: "50%",
                      cursor: "pointer",
                    }}
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )} */}
              </div>

              <div className="mb-3">
                <Link to="/" style={{ color: "blue" }}>
                  forgot your password?
                </Link>
              </div>

              <div>
                <button type="submit" className="btn btn-submit">
                  login
                </button>
              </div>

              <div style={{ textAlign: "right" }}>
                <Link style={{ color: "blue" }} to="/userRegister">
                  didn't have account?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;