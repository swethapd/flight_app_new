import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import './RecordList.css';

const RecordList = () => {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();
  const mailId = localStorage.getItem("mailId");  // Set the mailId for which you want to fetch the records


  // const [mailId,setMailId]=useState([]);  // Set the mailId for which you want to fetch the records


  // const storedmailId = localStorage.getItem("mailId"); // Retrieve username from localStorage
  // if (storedmailId) {
  //   setMailId(storedstoredmailIdUsername); // Set the username state
  // }

  // Fetch records based on mailId on component mount
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(`http://localhost/my_project/php/getRecords.php?mailId=${mailId}`);
        setRecords(response.data);  // Set the records in the state
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    fetchRecords();
  }, [mailId]);

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

  // Group records by origin, destination, date, and created_time
  const groupedRecords = records.reduce((acc, record) => {
    const groupKey = `${record.origin}-${record.destination}-${record.traveldate}-${record.created_time}`;
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(record);
    return acc;
  }, {});

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
          {Object.keys(groupedRecords).map((groupKey) => {
            const group = groupedRecords[groupKey];
            const firstRecord = group[0]; // Get the first record to display the group header (origin, destination, etc.)

            return group.map((record, index) => (
              <tr key={record.id}>
                {index === 0 && (
                  <>
                    <td rowSpan={group.length}>{firstRecord.origin}</td>
                    <td rowSpan={group.length}>{firstRecord.destination}</td>
                    <td rowSpan={group.length}>{firstRecord.traveldate}</td>
                  </>
                )}
                <td>{record.firstName}</td>
                <td>{record.lastName}</td>
                <td>{record.age}</td>
                <td>{record.gender}</td>
                <td>
                  <button onClick={() => handleEdit(record.id)} id="editing">Edit</button>
                  <button onClick={() => handleDelete(record.id)} id="deleting">Delete</button>
                </td>
              </tr>
            ));
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RecordList;
