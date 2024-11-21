import React, { useState, useEffect } from "react";
import "./EmployeeData.css"; // Link your CSS file here

const EmployeePagination = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        alert("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = employees.slice(startIndex, startIndex + rowsPerPage);

  const totalPages = Math.ceil(employees.length / rowsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", color: "#00796b" }}>
        Employee Data Table
      </h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
          {paginatedData.length === 0 && (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination-controls">
        <button onClick={handlePrevious}>Previous</button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeePagination;
