import React, { useState } from "react";
import axios from "axios";
import api from "../apis/user";

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData); // Debug

      const res = await api.post("/api/user/register", formData);
      alert("User created successfully");
      console.log(res.data);
    } catch (error) {
      if (error.response) {
        console.error("Backend Error:", error.response.data);
        alert("Error: " + error.response.data.message);
      } else {
        console.error("Error:", error.message);
        alert("Network error or server is down");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create User</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Username:</label>
          <input
            type="text"
            name="userName"
            className="form-control"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Mobile:</label>
          <input
            type="number"
            name="mobile"
            className="form-control"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Create User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
