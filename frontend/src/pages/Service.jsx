import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai"; // Importing icons
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Service = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { services } = useAuth();
  const { user } = useAuth();
  const [filteredServices, setFilteredServices] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // State to manage modal open/close
  const [selectedItem, setSelectedItem] = useState(null); // State to manage selected item for review
  const [rating, setRating] = useState(0); // State to manage rating
  const [comment, setComment] = useState(""); // State to manage comment
  const [search, setSearch] = useState("");

  const { userToken } = useAuth();

  useEffect(() => {
    if (!categoryData) {
      // If no category filter is applied, show all services
      setFilteredServices(services);
    } else {
      // If a category filter is applied, filter services accordingly
      const filteredData =
        services &&
        services.filter((service) => service.category === categoryData);
      setFilteredServices(filteredData);
    }
  }, [services, categoryData, search]);

  // Function to open the modal and set selected item
  const openModal = (item) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // Function to handle review submission
  // Inside reviewHandler function
  const reviewHandler = async (e) => {
    await axios
      .put(
        "http://localhost:8000/api/v1/providers/create-new-review",
        {
          user,
          rating,
          comment,
          providerId: selectedItem?._id,
        },
        setRating(""),
        setComment(""),
        setIsOpen(false)
      )
      .then((res) => {
        if (res.ok) {
          toast.success("review added successfully");
        } else {
          toast.error("can't submit review");
        }
      })
      .catch((error) => {
        toast.error("Error while adding review");
      });
  };

  return (
    <>
      <div className="section-contact">
        <div className="container">
          <input
            placeholder="search by address / zipcode"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <section className="section-category">
        <div className="container" data-aos="fade-right">
          <h2 className="section-common-heading">Service Providers</h2>
        </div>

        <div className="container grid grid-two--cols">
          {filteredServices.length === 0 ? (
            <p className="section-common-subheading">
              No service provider found for this category
            </p>
          ) : (
            filteredServices
              .filter((service) => {
                return search.toLowerCase() === ""
                  ? service
                  : service.address[0].streetAddress
                      .toLowerCase()
                      .trim()
                      .includes(search);
              })
              .map((service, index) => (
                <div className="category" key={index}>
                  <figure data-aos="fade-up">
                    <img
                      src={service.avatar}
                      alt="a guy writing code"
                      width="50"
                      height="50"
                    />
                  </figure>
                  <div className="category-content">
                    <div className="address-details">
                      <p className="section-common-subheading">
                        Provider name: {service.providername}
                      </p>
                      <p className="section-common-subheading">
                        Country: {service.address[0].country}
                      </p>
                      <p className="section-common-subheading">
                        State: {service.address[0].state}
                      </p>
                      <p className="section-common-subheading">
                        District: {service.address[0].district}
                      </p>
                      <p className="section-common-subheading">
                        Street Address: {service.address[0].streetAddress}
                      </p>
                      <p className="section-common-subheading">
                        Zip Code: {service.address[0].zipCode}
                      </p>
                      <p className="section-common-subheading">
                        Category: {service.category}
                      </p>
                    </div>

                    {/* See Reviews link */}
                    <button onClick={() => openModal(service)} className="btn">
                      See Reviews
                    </button>
                    <Link to={`tel:${service.phoneNumber}`} className="btn">
                      Call Now
                    </Link>
                  </div>
                </div>
              ))
          )}

          {/* Modal */}
          {isOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-close">
                  <RxCross1 size={30} onClick={closeModal} />
                </div>
                <h2 className="modal-heading">Give a Review</h2>
                <br />
                <div className="modal-flex">
                  <img
                    src={selectedItem?.avatar}
                    alt=""
                    className="modal-avatar"
                    style={{ width: "35px" }}
                  />
                  <div>
                    <div className="modal-provider">
                      {selectedItem?.providername}
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <h5 className="modal-rating-heading">
                  Give a Rating <span className="modal-required">*</span>
                </h5>
                <div className="modal-rating">
                  {[1, 2, 3, 4, 5].map((i) =>
                    rating >= i ? (
                      <AiFillStar
                        key={i}
                        className="modal-star cursor-pointer"
                        color="rgb(246,186,0)"
                        size={25}
                        onClick={() => setRating(i)}
                      />
                    ) : (
                      <AiOutlineStar
                        key={i}
                        className="modal-star cursor-pointer"
                        color="rgb(246,186,0)"
                        size={25}
                        onClick={() => setRating(i)}
                      />
                    )
                  )}
                </div>
                <br />
                <div className="modal-comment">
                  <label className="modal-label">
                    Write a comment
                    <span className="modal-optional">(optional)</span>
                  </label>
                  <textarea
                    name="comment"
                    id=""
                    cols="20"
                    rows="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="How was your product? Write your expression about it!"
                    className="modal-textarea"
                  ></textarea>
                </div>
                <div
                  className="modal-submit"
                  onClick={rating > 1 ? reviewHandler : null}
                >
                  Submit
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Service;