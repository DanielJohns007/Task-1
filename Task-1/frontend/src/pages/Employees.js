import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import EmployeeForm from "./EmployeeForm";
import "./Employees.css"; 

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [editing, setEditing] = useState(null);
  const [activeTab, setActiveTab] = useState("list"); // "list" or "form"
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const { data } = await API.get("/employees");
      setEmployees(data);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleCreate = async (employee) => {
    await API.post("/employees", employee);
    fetchEmployees();
    setActiveTab("list");
  };

  const handleUpdate = async (employee) => {
    await API.put(`/employees/${editing._id}`, employee);
    setEditing(null);
    fetchEmployees();
    setActiveTab("list");
  };

  const handleDelete = async (id) => {
    await API.delete(`/employees/${id}`);
    fetchEmployees();
  };

  // 🔴 Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // clear JWT token
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="employees-container">
      <div className="header">
        <h2 className="title">Employees Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="tabs">
        <button
          className={activeTab === "list" ? "active" : ""}
          onClick={() => {
            setEditing(null);
            setActiveTab("list");
          }}
        >
          Employee List
        </button>
        <button
          className={activeTab === "form" ? "active" : ""}
          onClick={() => setActiveTab("form")}
        >
          {editing ? "Edit Employee" : "Add Employee"}
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "list" && (
          <ul className="employees-list">
            {employees.map((emp) => (
              <li key={emp._id}>
                <span className="employee-info">
                  {emp.name} - {emp.email} ({emp.address}) - {emp.department}
                </span>
                <div className="employee-actions">
                  <button
                    onClick={() => {
                      setEditing(emp);
                      setActiveTab("form");
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(emp._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {activeTab === "form" && (
          <EmployeeForm
            initialData={editing}
            onSubmit={editing ? handleUpdate : handleCreate}
            onCancel={() => {
              setEditing(null);
              setActiveTab("list");
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Employees;
