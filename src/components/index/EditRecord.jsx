import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import "./EditRecord.css";

const EditRecord = () => {
  const { id } = useParams(); // Get the created_time from URL params
  const navigate = useNavigate();

  // State for form data (including single passenger)
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    date: "",
    passengerCount: 1,
  });

  const [passenger, setPassenger] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
  });

  // Fetch the record data by created_time when component mounts
  useEffect(() => {
    if (!id) {
      console.error("No id provided");
      return;
    }

    const fetchRecord = async () => {
      try {
        const response = await axios.get(
          `http://localhost/my_project/php/getRecordById.php?id=${id}`
        );
        const data = response.data;

        console.log('data',data);
        

        if (data && data.passengerDetails && data.passengerDetails.length > 0) {
          // Set the main record form data
          setFormData({
            origin: data.origin || "",
            destination: data.destination || "",
            date: data.traveldate || "",
            passengerCount: data.passengerCount || 1,
          });

          // Set the first passenger's details (assuming only one passenger)
          const firstPassenger = data.passengerDetails[0];
          setPassenger({
            firstName: firstPassenger.firstName || "",
            lastName: firstPassenger.lastName || "",
            age: firstPassenger.age || "",
            gender: firstPassenger.gender || "",
          });
        } else {
          console.error("No passenger details found.");
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

  // Handle passenger details change (single passenger)
  const handlePassengerChange = (e) => {
    const { name, value } = e.target;
    setPassenger((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission to update record
  const handleSubmit = async (e) => {
    console.log('e',e);
    
    e.preventDefault();

    if (!id) {
      console.error("No id provided");
      return; // Prevent form submission if created_time is not available
    }

    try {
      // Send the updated data to the backend
      const response = await axios.put(
        "http://localhost/my_project/php/editRecord.php",
        {
          id, // Pass created_time instead of id
          ...formData, // Spread the form data
          passengerDetails: [passenger], // Include the updated passenger details (as an array)
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
              value={formData.origin}
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
              value={formData.destination}
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
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          {/* Render the single passenger details inputs */}
          <div className="form-group">
            <input
              id="firstName"
              className="form-input"
              placeholder="First Name"
              type="text"
              name="firstName"
              value={passenger.firstName}
              onChange={handlePassengerChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              id="lastName"
              className="form-input"
              placeholder="Last Name"
              type="text"
              name="lastName"
              value={passenger.lastName}
              onChange={handlePassengerChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              id="age"
              className="form-input"
              placeholder="Age"
              type="number"
              name="age"
              value={passenger.age}
              onChange={handlePassengerChange}
              required
            />
          </div>
          <div className="form-group">
            <select
              id="gender"
              className="form-select"
              name="gender"
              value={passenger.gender}
              onChange={handlePassengerChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <button type="submit" className="form-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecord;
