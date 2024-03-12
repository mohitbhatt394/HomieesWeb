import React from "react";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../static/data";
import { BiDonateHeart } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa6";

const Home = () => {
  const nevigate = useNavigate();
  return (
    <>
      <section className="section-donation">
        <div className="container flex">
          <div data-aos="fade-right" data-aos-delay="300">
            <h3 className="section-common-heading">support us</h3>
            <p className="section-common-subheading">
              show your love by donating us
            </p>
          </div>

          <div>
            <div className="btn" data-aos="fade-left" data-aos-delay="300">
              <a href="donation.html">
                donate us
                <BiDonateHeart className="fa-solid fa-hand-holding-heart"/>
              </a>
            </div>
          </div>
        </div>
      </section>

      <main className="section-category">
        <div className="container" data-aos="fade-right">
          <h2 className="section-common-heading">service categories</h2>
          <p className="section-common-subheading">
            Hassle-Free Service Solutions, Just a Click Away
          </p>
        </div>

        <div className="container grid grid-three--cols">
          {categoriesData &&
            categoriesData.map((i) => {
              const handelSubmit = () => {
                nevigate(`/service?category=${i.title}`);
              };
              return (
                <div className="category" onClick={handelSubmit} key={i.id}>
                  <figure data-aos="fade-up">
                    <img src={i.image_Url} alt="a guy writing code" />
                  </figure>
                  <div className="category-content">
                    <h3 className="section-common--title">{i.title}</h3>
                    <div className="fa-solid "><FaArrowRight className="fa-arrow-right" /></div>
                  </div>
                </div>
              );
            })}
        </div>
      </main>
    </>
  );
};

export default Home;
