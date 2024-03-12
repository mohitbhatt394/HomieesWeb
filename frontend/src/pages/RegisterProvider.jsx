import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { State } from "country-state-city";
import { useAuth } from "../store/auth";
import {toast} from "react-toastify"

const RegisterProvider = () => {
  const [provider, setProvider] = useState({
    email: "",
    selectedCountry: "",
    selectedState: "",
    district: "",
    zipCode: "",
    streetAddress: "",
    phoneNumber: "",
    category: ""
  });

  

  const [userData, setUserData] = useState(true);
  const { user } = useAuth();

  const navigate = useNavigate();
  const { storeProviderTokenInLS } = useAuth();

  if (userData && user) {
    setProvider({
    email: user.email,
    selectedCountry: "IN",
    selectedState: "",
    district: "",
    zipCode: "",
    streetAddress: "",
    phoneNumber: "",
    category: ""
    });

    setUserData(false);
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === 'phoneNumber' && value.length > 10) {
      updatedValue = value.slice(0, 10);

    }

    setProvider({
      ...provider,
      [name]: updatedValue
    });
  };


  const statesOfSelectedCountry = provider.selectedCountry
    ? State.getStatesOfCountry(provider.selectedCountry)
    : [];

  const handleStateChange = (event) => {
    const stateCode = event.target.value;
    setProvider({
      ...provider,
      selectedState: stateCode,
      // district: "" 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const addressData = [{
        country: 'India', // Since you want only India to be selected, set it directly
        state: provider.selectedState,
        district: provider.district,
        streetAddress: provider.streetAddress,
        zipCode: provider.zipCode // Add a zip code field if necessary, or remove this line if not needed
      }];
  
      const dataToSend = {
        email: provider.email,
        phoneNumber: provider.phoneNumber,
        category: provider.category,
        address: addressData // Assign the array of address objects here
      };
  
      const response = await fetch("http://localhost:8000/api/v1/providers/registerProvider", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (response.ok) {
        const res_data = await response.json();
        console.log(res_data);
        storeProviderTokenInLS(res_data.data.accessToken, "accessToken");
        toast.success(`Registered successfully`);
        
        setProvider({ // Reset form fields after successful registration
          email: "",
          selectedCountry: "IN",
          selectedState: "",
          district: "",
          zipCode:"",
          streetAddress: "",
          phoneNumber: "",
          category: ""
        });
        navigate("/");
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  

  return (
    <>
      <div className="section-contact">
        <div className="container">
          <h2 className="section-common-heading">
            Service Provider Registration
          </h2>
        </div>

        <div className="container">
          <div className="contact-content">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={provider.email}
                  onChange={handleInput}
                  placeholder="Enter Email"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="state">State:</label>
                <select
                  name="selectedState"
                  value={provider.selectedState}
                  onChange={handleStateChange}
                  style={{ width: "100%", padding: "1.2rem 1rem" }}
                  required
                >
                  <option value="">Select State</option>
                  {statesOfSelectedCountry.map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="district">District:</label>
                <input
                  type="text"
                  name="district"
                  value={provider.district}
                  onChange={handleInput}
                  placeholder="Enter District"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="district">Street Address:</label>
                <input
                  type="text"
                  name="streetAddress"
                  value={provider.streetAddress}
                  onChange={handleInput}
                  placeholder="Enter Street Adderess"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="district">zipCode:</label>
                <input
                  type="text"
                  name="zipCode"
                  value={provider.zipCode}
                  onChange={handleInput}
                  placeholder="Enter zipcode"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="category">Category:</label>
                <select
                  name="category"
                  value={provider.category}
                  onChange={handleInput}
                  style={{ width: "100%", padding: "1.2rem 1rem" }}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="plumber">Plumber</option>
                  <option value="electrician">Electrician</option>
                  <option value="cleaner">Cleaner</option>
                  <option value="labour">Labour</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                  type="number"
                  name="phoneNumber"
                  value={provider.phoneNumber}
                  onChange={handleInput}
                  placeholder="Enter Phone Number"
                  required
                />
              </div>

              <div>
                <button type="submit" className="btn btn-submit">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterProvider;