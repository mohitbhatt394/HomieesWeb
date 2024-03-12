import React from 'react'
import { Link } from 'react-router-dom'

const HomeContect = () => {
  return (
    <div className="section-contact--homepage" id="section-contact--homepage">
      <div className="container">
        <div className="contact-content">
          <h2 className="contact-title">
            Your suggestion help us to improve our service
          </h2>
          <p className="section-common-subheading">Feel free to contact us</p>
          <div className="btn">
            <Link to="/contact">
              contact us <i className="fa-solid fa-arrow-circle-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeContect