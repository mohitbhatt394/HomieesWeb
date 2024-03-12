import React from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

const About = () => {
  const { user } = useAuth();
  return (
    <div className="section-contact">
      <div className="container" style={{ border: "2px solid red" }}>
        <h3 className="section-common-heading">About Homiees</h3>
        <h3 className="section-common--title">Hii {user.username}</h3>
        <p className="section-common-subheading">
          Welcome to Homiees, your one-stop destination for home services with a
          twist! We're not just another home service provider — we're a
          community-driven platform dedicated to connecting homeowners with
          independent service providers while fostering support and
          collaboration within our network.
        </p>

        <h3 className="section-common-heading">Our Mission</h3>
        <p className="section-common-subheading">
          At Homiees, our mission is twofold: to provide homeowners with
          convenient access to essential home services, and to empower
          independent service providers by giving them a platform to showcase
          their skills and grow their businesses. By bridging the gap between
          homeowners and service professionals, we're creating a win-win
          situation for everyone involved.
        </p>

        <h3 className="section-common-heading">How It Works</h3>
        <p className="section-common-subheading">
          Here's how our unique business model operates:
        </p>
        <p className="section-common-subheading">
          <span style={{ fontWeight: "bolder" }}>1. Free Services:</span> Yes,
          you read that right! We offer select home services such as electrical
          work, plumbing, repairs, and cleaning completely free of charge. These
          services are provided by independent professionals who are part of our
          network.
        </p>
        <p className="section-common-subheading">
          <span style={{ fontWeight: "bolder" }}>
            2. Supporting Local Talent:
          </span>{" "}
          Our platform is designed to support local talent and small businesses.
          We believe in the power of community and strive to create
          opportunities for individuals to thrive in their chosen fields.
        </p>
        <p className="section-common-subheading">
          <span style={{ fontWeight: "bolder" }}>
            3. Empowering Homeowners:
          </span>{" "}
          By offering free services and connecting homeowners with trusted
          professionals, we aim to make home maintenance tasks more accessible
          and affordable for everyone.
        </p>

        <h3 className="section-common-heading">Why Choose Homiees?</h3>
        <p className="section-common-subheading">
          <span style={{ fontWeight: "bolder" }}>
            . Community-Centric Approach:
          </span>{" "}
          Unlike traditional service providers, we prioritize community over
          competition. When you choose Homiees, you're not just getting a
          service — you're becoming part of a supportive network of homeowners
          and service providers.
        </p>
        <p className="section-common-subheading">
          <span style={{ fontWeight: "bolder" }}>. Quality Assurance:</span>{" "}
          While our services are free, quality is never compromised. We
          carefully vet all service providers to ensure they meet our standards
          of excellence.
        </p>
        <p className="section-common-subheading">
          <span style={{ fontWeight: "bolder" }}>. Flexible Solutions: </span>{" "}
          Whether you need a quick fix or a major repair, Homiees has you
          covered. Our diverse network of professionals offers a wide range of
          services to suit your needs.
        </p>

        <h3 className="section-common-heading">Support Us</h3>
        <p className="section-common-subheading">
          If you appreciate our services and would like to support us in our
          mission to provide exceptional home services, consider making a
          donation. Your contribution will help us expand our offerings and
          enhance the quality of our service and supporting local talent.
        </p>
       
          <Link to="/donate" className='btn'>support us</Link>
      

        <h3 className="section-common-heading">Contact Us</h3>
        <p className="section-common-subheading">
          Have questions or feedback? We'd love to hear from you! Get in touch
          with us via email, phone, or through our online contact form. Thank
          you for choosing Homiees for your home service needs.
        </p>

        <Link to="/contact" className="btn">
          contact us
        </Link>
      </div>
    </div>
  );
};

export default About;
