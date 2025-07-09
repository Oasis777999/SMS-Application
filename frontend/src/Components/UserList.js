import React, { useEffect, useState } from "react";
import api from "../apis/user";
import UserEditModal from "./User/userEditModel"; // Import modal
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import UpdateCredit from "./User/UpdateCredit";
import UpdatePassword from "./User/UpdatePassword";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreditModel, setShowCreditModel] = useState(false);
  const [showPasswordModel, setShowPasswordModel] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    credits: "",
    operation:"",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get("/api/user/list");
    setUsers(res.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Update user info
  const handleEditClick = (user) => {
    console.log(user);
    setEditingUser(user);

    setFormData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      password: user.password,
    });
    setShowModal(true);
  };

  const handleUpdateUser = async () => {
    try {
      console.log(editingUser._id, formData);

      await api.put(`/api/user/update/${editingUser._id}`, formData);
      alert("User updated successfully!");
      setShowModal(false);
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Error updating user");
    }
  };

  // Update user creadits
  const handleCreditClick = (user) => {
    console.log(user);
    setEditingUser(user);
    setFormData({
      credits: user.credits,
      operation:user.operation
    });
    setShowCreditModel(true);
  };

  const handleCreditUser = async () => {
    try {
      console.log("User is : ", editingUser._id, formData);

      await api.put(`/api/user/update/credits/${editingUser._id}`, formData);
      alert("Creadits Updated successfully!");
      setShowModal(false);
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Error on Credits Adding");
    }
  };

  // /Update user password
  const handlePasswordClick = (user) => {
    console.log(user);
    setEditingUser(user);
    setFormData({
      password: user.password,
    });
    setShowPasswordModel(true);
  };

  const handlePasswordUser = async () => {
    try {
      console.log("User is : ", editingUser._id, formData);

      await api.put(`/api/user/update/password/${editingUser._id}`, formData);
      alert("Password Updated Successfully!");
      setShowModal(false);
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      alert("Error on Password Adding");
    }
  };

  useEffect(()=>{

  })

  return (
    <div
      className="container mt-5 responsive-margin">
      <h2>User List</h2>

      <table className="table table-bordered table-striped mt-3">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Credits</th>
            <th>Status</th>
            <th>Actions</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.credits}</td>
              <td>{user.status ? "Active" : "Inactive"}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleEditClick(user)}
                >
                  Edit User
                </button>
              </td>
              <td>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Select Section
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleCreditClick(user)}
                      >
                        Update Credits
                      </button>
                    </li>
                    <li>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handlePasswordClick(user)}
                      >
                        Update Password
                      </button>
                    </li>
                    <li>
                      <Link to="/edituser" className="dropdown-item">
                        Edit User
                      </Link>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal component for editing */}
      <UserEditModal
        show={showModal}
        onHide={() => setShowModal(false)}
        user={editingUser}
        formData={formData}
        onChange={handleInputChange}
        onSave={handleUpdateUser}
      />

      {/* Model Component for Credit  */}
      <UpdateCredit
        show={showCreditModel}
        onHide={() => setShowCreditModel(false)}
        user={editingUser}
        formData={formData}
        onChange={handleInputChange}
        onSave={handleCreditUser}
      />

      {/* Model Component for Password */}
      <UpdatePassword
        show={showPasswordModel}
        onHide={() => setShowPasswordModel(false)}
        user={editingUser}
        formData={formData}
        onChange={handleInputChange}
        onSave={handlePasswordUser}
      />
    </div>
  );
};

export default UserList;
