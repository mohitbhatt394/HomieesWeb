import React, { useState } from "react";
import { useAuth } from "../store/auth";

const Contact = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    subject: "",
    message: "",
  });

  const [userData, setUserData] = useState(true);

  const { user } = useAuth();

  if (userData && user) {
    setContact({
      username: user.username,
      email: user.email,
      subject: "",
      message: "",
    });

    setUserData(false);
  }

  const handelInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="section-contact">
      <div className="container">
        <h2 className="section-common-heading">Contact Us</h2>
        <p className="section-common-subheading">
          Get in touch with us. We are always here to help you.
        </p>
      </div>

      <div className="container">
        <div className="contact-content">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-two--cols mb-3">
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  required
                  autoComplete="on"
                  placeholder="enter your name"
                  value={contact.username}
                  onChange={handelInput}
                />
              </div>

              <div>
                <label htmlFor="email">enter your email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  required
                  placeholder="abc@thapa.com"
                  value={contact.email}
                  onChange={handelInput}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="subject">subject</label>
              <input
                type="text"
                name="subject"
                id="subject"
                placeholder="your main title"
                value={contact.subject}
                onChange={handelInput}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="message">message</label>
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="10"
                placeholder="enter your message"
                value={contact.message}
                onChange={handelInput}
              ></textarea>
            </div>

            <div>
              <button type="submit" className="btn btn-submit">
                send message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
