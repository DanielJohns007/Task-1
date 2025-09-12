import React, { useState, useEffect } from "react";
import "./EmployeeForm.css"; // make sure you link the CSS

function EmployeeForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    department: ""
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: "", email: "", address: "", department: "" });
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h3>{initialData ? "Edit Employee" : "Add New Employee"}</h3>

      <div className="form-group">
        <label>Name</label>
        <input
          name="name"
          placeholder="Enter employee name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Address</label>
        <input
          name="address"
          placeholder="Enter address"
          value={form.address}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Department</label>
        <input
          name="department"
          placeholder="Enter department"
          value={form.department}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit">
          {initialData ? "Update Employee" : "Create Employee"}
        </button>
        {initialData && (
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default EmployeeForm;
