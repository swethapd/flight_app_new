import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import './RecordList.css';

const RecordList = () => {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  // Fetch records on component mount
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get("http://localhost/my_project/php/getRecords.php");
        setRecords(response.data);  // Set the records in the state
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    fetchRecords();
  }, []);
  // console.log(records)

  // Handle editing a record
  const handleEdit = (id) => {
    console.log(id);
    navigate(`/edit/${id}`);  // Navigate to the edit page with the record ID
  };

  // Handle deleting a record
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost/my_project/php/deleteRecord.php?id=${id}`);
      if (response.data.status === "success") {
        // Remove the deleted record from the state
        setRecords((prevRecords) => prevRecords.filter((record) => record.id !== id));
      } else {
        console.error("Error deleting record:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  return (
    <div>
      <h2 className="heading">Flight and Passenger Records</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>Origin</th>
            <th>Destination</th>
            <th>Date</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ? (
            records.map((record) => (
              <tr key={record.id}>
                <td>{record.origin}</td>
                <td>{record.destination}</td>
                <td>{record.traveldate}</td>
                <td>{record.firstName}</td>
                <td>{record.lastName}</td>
                <td>{record.age}</td>
                <td>{record.gender}</td>
                <td>
                  <button onClick={() => handleEdit(record.id)} id="editing">Edit</button>
                  <button onClick={() => handleDelete(record.id)} id="deleting">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No records found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecordList;
