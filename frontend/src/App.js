import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/");
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const response = await axios.put("http://127.0.0.1:8000/update", { id: editId, ...formData });
        if (response.data.success) {
          alert("User updated");
        }
      } else {
        const response = await axios.post("http://127.0.0.1:8000/create", formData);
        if (response.data.success) {
          alert("User added");
        }
      }
      setFormData({ name: "", email: "" });
      setEditId(null);
      fetchUsers();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email });
    setEditId(user._id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/delete/${id}`);
      if (response.data.success) {
        alert("User deleted");
        fetchUsers();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  console.log(data)
  return (
    <>
      <div className='container'>
        <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit}>
          <div className='section'>
            <label htmlFor='name'>Enter Name</label>
            <input
              type='text'
              name='name'
              placeholder='Name'
              id='name'
              onChange={handleChange}
              value={formData.name}
            />
          </div>

          <div className='section'>
            <label htmlFor='email'>Enter Email</label>
            <input
              type='email'
              name='email'
              placeholder='Email'
              id='email'
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          <button type='submit' className='btn'>
            {editId ? "Update User" : "Add User"}
          </button>
        </form>
      </div>

      <section>
        <table>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <button className='button' onClick={() => handleEdit(item)}>Edit</button>
                  <button className='button' onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default App;
