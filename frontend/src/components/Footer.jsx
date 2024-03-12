import React from 'react'
import { Link } from 'react-router-dom'
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="container flex-around">
        <div className="footer-1--div">
          <div className="logo-brand">
            <Link to="/" className="footer-subheading">Homiees</Link>
          </div>
          <p>
            Your One-Stop Solution for Home Services: Hassle-Free Repairs,
            Effortless Solutions
          </p>
          <p>follow us on</p>

          <div className="social-footer--icons">
            <Link
              to="https://discord.gg/fDuFEXfyyH"
              target="_blank"
              alt="my discord server link"
              rel="noreferrer"
              title="discordLink"
            >
              <i className="fa-brands fa-discord"></i>
            </Link>
            <Link
              to="https://www.youtube.com/thapatechnical"
              target="_blank"
              alt="my youtube channel link"
              rel="noreferrer"
              title="youtubeLink"
            >
              <div className='fa-brands'>
              <FaInstagram className="fa-youtube" />
              </div>
            </Link>
            <Link
              to="https://www.instagram.com/thapatechnical/"
              target="_blank"
              alt="my instagram profile link"
              rel="noreferrer"
              title="instagramLink"
              
            >
              <i className="fa-brands fa-instagram"></i>
            </Link>
          </div>
        </div>

        <div className="footer-3--div">
          <p className="footer-subheading">Links</p>
          <ul>
            <li><Link to="/about"> about </Link></li>
            <li><Link to="/contact"> contact  </Link></li>
            <li><Link to="/donate"> donate </Link></li>
            <li><Link to="/providerRegister"> service provider sign-up </Link></li>
            <li><Link to="/userRegister"> sign-up </Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer