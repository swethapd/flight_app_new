import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";

const EditRecord = () => {
  const { id } = useParams();  // Get the record ID from URL params
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
        // Fetch the record data by ID
        const response = await axios.get(`http://localhost/my_project/php/getRecordById.php?id=${id}`);
        const data = response.data;

        if (data) {
          setFormData({
            origin: data.origin || "",
            destination: data.destination || "",
            date: data.traveldate || "",
            passengerCount: data.passengerCount || 1,
          });

          // Assuming `data.passengerDetails` is an array of passengers, map through them
          const passengers = data.passengerDetails || [];
          setPassengerDetails(passengers.map(passenger => ({
            id: passenger.id,  // Assuming passenger data has unique IDs
            firstName: passenger.firstName || "",
            lastName: passenger.lastName || "",
            age: passenger.age || "",
            gender: passenger.gender || "",
          })));
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
      const response = await axios.put("http://localhost/my_project/php/editRecord.php", {
        id,  // Include the ID of the record being edited
        ...formData,  // Spread the form data
        passengerDetails,  // Include the updated passenger details
      });

      if (response.data.status === "success") {
        navigate("/RecordList");  // Navigate to the record list after saving changes
      } else {
        console.error("Error updating record:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  return (
    <div>
      <h2>Edit Record</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Origin</label>
          <input
            type="text"
            name="origin"
            value={formData.origin || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Destination</label>
          <input
            type="text"
            name="destination"
            value={formData.destination || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date || ""}
            onChange={handleChange}
            required
          />
        </div>

        {/* Render passenger details inputs */}
        {passengerDetails.map((passenger, index) => (
          <div key={index}>
            <h3>Passenger {index + 1}</h3>
            <div>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={passenger.firstName || ""}
                onChange={(e) => handlePassengerChange(index, e)}
                required
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={passenger.lastName || ""}
                onChange={(e) => handlePassengerChange(index, e)}
                required
              />
            </div>
            <div>
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={passenger.age || ""}
                onChange={(e) => handlePassengerChange(index, e)}
                required
              />
            </div>
            <div>
              <label>Gender</label>
              <select
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

        <div>
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default EditRecord;
