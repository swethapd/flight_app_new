import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import './EditRecord.css'

const EditRecord = () => {
  const { id } = useParams(); // Get the record ID from URL params
  const navigate = useNavigate();

  // State for form data, initialize with empty strings or other default values
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    date: "",
    passengerCount: 1,
  });

  const [passengerDetails, setPassengerDetails] = useState([]);

  // Fetch the record data by ID when component mounts
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        // Fetch the record by ID
        const response = await axios.get(
          `http://localhost/my_project/php/getRecordById.php?id=${id}`
        );
        const data = response.data;

        console.log("Fetched Record:", data); // Check the response structure

        if (data) {
          // Set the main record form data
          setFormData({
            origin: data.origin || "",
            destination: data.destination || "",
            date: data.traveldate || "",
            passengerCount: data.passengerCount || 1,
          });

          // Set the passenger details
          if (data.passengerDetails && Array.isArray(data.passengerDetails)) {
            setPassengerDetails(data.passengerDetails);
          }
        }
      } catch (error) {
        console.error("Error fetching record data:", error);
      }
    };

    fetchRecord();
  }, [id]);

  // Handle input field changes for form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle passenger details changes
  const handlePassengerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPassengers = [...passengerDetails];
    updatedPassengers[index][name] = value;
    setPassengerDetails(updatedPassengers);
  };

  // Handle form submission to update record
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the updated data to the backend
      const response = await axios.put(
        "http://localhost/my_project/php/editRecord.php",
        {
          id, // Include the ID of the record being edited
          ...formData, // Spread the form data
          passengerDetails, // Include the updated passenger details
        }
      );

      if (response.data.status === "success") {
        navigate("/RecordList"); // Navigate to the record list after saving changes
      } else {
        console.error("Error updating record:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  return (
    <div className="editDetails">
      <div className="edit-record-container">
      <h2 id="edit-record-header">Edit Record</h2>
      <form id="edit-record-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            id="origin"
            className="form-input"
            placeholder="Origin"
            type="text"
            name="origin"
            value={formData.origin || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            id="destination"
            className="form-input"
            placeholder="Destination"
            type="text"
            name="destination"
            value={formData.destination || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            id="date"
            className="form-input"
            placeholder="Date"
            type="date"
            name="date"
            value={formData.date || ""}
            onChange={handleChange}
            required
          />
        </div>

        {/* Render passenger details inputs */}
        {passengerDetails.map((passenger, index) => (
          <div key={index} className="passenger-details-group">
            <div className="form-group">
              <input
                id={`firstName-${index}`}
                className="form-input"
                placeholder="First Name"
                type="text"
                name="firstName"
                value={passenger.firstName || ""}
                onChange={(e) => handlePassengerChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                id={`lastName-${index}`}
                className="form-input"
                placeholder="Last Name"
                type="text"
                name="lastName"
                value={passenger.lastName || ""}
                onChange={(e) => handlePassengerChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                id={`age-${index}`}
                className="form-input"
                placeholder="Age"
                type="number"
                name="age"
                value={passenger.age || ""}
                onChange={(e) => handlePassengerChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <select
                id={`gender-${index}`}
                className="form-select"
                name="gender"
                value={passenger.gender || ""}
                onChange={(e) => handlePassengerChange(index, e)}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        ))}

        <div className="form-group">
          <button id="save-changes-btn" type="submit" className="form-btn">
            Save Changes
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default EditRecord;
