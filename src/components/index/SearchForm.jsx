import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./home.css";

const SearchForm = () => {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    date: "",
    passengerCount: 1,
  });
  const [passengerDetails, setPassengerDetails] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset passenger details after submission
    const count = parseInt(formData.passengerCount);
    setPassengerDetails(
      Array.from({ length: count }, () => ({
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
      }))
    );
  };

  const handlePassengerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPassengers = [...passengerDetails];
    updatedPassengers[index][name] = value;
    setPassengerDetails(updatedPassengers);

    // Log passenger details to debug
  };

  const handlePassengerClick = async (e) => {
    e.preventDefault();

    const finalObj = {
      ...formData,
      passengerDetails,
      id: localStorage.getItem("mailId"),
    };
    console.log(finalObj);
    // Log the final object being sent to the server

    try {
      const response = await axios.post(
        "http://localhost/my_project/php/passengerDetails.php", // Make sure the URL is correct
        finalObj, // Send finalObj directly without wrapping it in another object
        {
          headers: {
            "Content-Type": "application/json", // Ensure this matches what your backend expects
          },
        }
      );
      console.log("Response", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="backImage">
        <div id="flight-form">
          <button
            type="text"
            className="list-container btn2"
            onClick={() => navigate("/RecordList")}
          >
            List
          </button>

          <div className="flex body">
            <form onSubmit={handleSubmit}>
              <input
                required
                type="text"
                placeholder="Origin"
                className="inputs"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
              ></input>
              <input
                required
                type="text"
                placeholder="Destination"
                className="inputs"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
              ></input>
              <input
                required
                type="date"
                placeholder="Date"
                className="inputs"
                name="date"
                value={formData.date}
                onChange={handleChange}
              ></input>
              <input
                required
                type="number"
                placeholder="Passenger Details"
                className="inputs"
                name="passengerCount"
                value={formData.passengerCount}
                onChange={handleChange}
                min="1"
              ></input>
              <button type="submit" className="btn1">
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="mainSearchForm">
          {passengerDetails.length > 0 && (
            <form
              id="passenger-details-form"
              onSubmit={handlePassengerClick}
              className="passenger-details-form"
            >
              <h2 id="passenger-details-header">Passenger Details</h2>
              <br />
              {passengerDetails.map((passenger, index) => (
                <div
                  key={index}
                  className="passenger-card"
                  id={`passenger-card-${index}`}
                >
               
                  <div className="passenger-info">
                       <h3
                    id={`passenger-title-${index}`}
                    className="passenger-title"
                  >
                    Passenger {index + 1}:
                  </h3>
                    <input
                      required
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      className="input-field"
                      value={passenger.firstName}
                      onChange={(e) => handlePassengerChange(index, e)}
                      id={`first-name-${index}`}
                    />
                    <input
                      required
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      className="input-field"
                      value={passenger.lastName}
                      onChange={(e) => handlePassengerChange(index, e)}
                      id={`last-name-${index}`}
                    />
                    <input
                      required
                      type="number"
                      name="age"
                      placeholder="Age"
                      className="input-field"
                      value={passenger.age}
                      onChange={(e) => handlePassengerChange(index, e)}
                      id={`age-${index}`}
                    />
                    <select
                      required
                      name="gender"
                      className="input-field"
                      value={passenger.gender}
                      onChange={(e) => handlePassengerChange(index, e)}
                      id={`gender-${index}`}
                    >
                      <option value="" id={`gender-option-${index}`}>
                        Select Gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              ))}
              <button
                type="submit"
                id="submit-passenger-details"
                className="btn-submit"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchForm;
