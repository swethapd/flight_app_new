import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router";
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
 
    console.log(updatedPassengers);
  };
 
  const handlePassengerClick = async (e) => {
    e.preventDefault()
    const finalObj = {
      ...formData,
      passengerDetails,
    };

    try {
        const response = await axios.post(
            "http://localhost/my_project/php/passengerDetails.php",
            {
                finalObj,
            },
            {
                headers: {
                    "Content-Type": "application/json", // If you need to specify the content type
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
     <button type="text" className="list-container btn2" onClick={() => navigate("/RecordList")}>
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
 
      {passengerDetails.length > 0 && (
        <form id="passengerdetails" onSubmit={handlePassengerClick}>
          <h2 id="passengerdetailstext">Passenger Details</h2>
          <br />
          {passengerDetails.map((passenger, index) => (
            <div key={index} className="passenger-card">
              <h3>Passenger {index + 1}</h3>
              <input
                required
                type="text"
                name="firstName"
                placeholder="First Name"
                className="inputs"
                value={passenger.firstName}
                onChange={(e) => handlePassengerChange(index, e)}
              />
              <input
                required
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="inputs"
                value={passenger.lastName}
                onChange={(e) => handlePassengerChange(index, e)}
              />
              <input
                required
                type="number"
                name="age"
                placeholder="Age"
                className="inputs"
                value={passenger.age}
                onChange={(e) => handlePassengerChange(index, e)}
              />
              <select
                required
                name="gender"
                className="inputs"
                value={passenger.gender}
                onChange={(e) => handlePassengerChange(index, e)}
              >
                <option value="" id="gender">
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          ))}
          <button type="submit" className="btn1">
            Submit
          </button>
        </form>
      )}
    </>
  );
};
 
export default SearchForm;