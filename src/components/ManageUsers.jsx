import React, { useState, useEffect } from "react";
import { db } from "/config/firebase"; 
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState(null);


  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
    } catch (err) {
      setError("Error fetching users: " + err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {

        const userRef = doc(db, "users", editingUser.id);
        await updateDoc(userRef, { name, email, role });
        setEditingUser(null); 
        alert("User updated successfully");
      } else {
    
        await addDoc(collection(db, "users"), { name, email, role });
        alert("User created successfully");
      }

      setName("");
      setEmail("");
      setRole("user");
      fetchUsers();
    } catch (err) {
      setError("Error submitting form: " + err.message);
    }
  };


  const handleEdit = (user) => {
    setEditingUser(user);
    setName(user.name|| "");
    setEmail(user.email || "");
    setRole(user.role || "user");
  };


  const handleDelete = async (id) => {
    try {
      const userRef = doc(db, "users", id);
      await deleteDoc(userRef);
      fetchUsers(); 
    } catch (err) {
      setError("Error deleting user: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

  
      {error && <div className="bg-red-500 text-white p-2 mb-4">{error}</div>}


      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">{editingUser ? "Edit User" : "Create User"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="user">User</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            {editingUser ? "Update User" : "Create User"}
          </button>
        </form>
      </div>


      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Users List</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b p-2">Name</th>
              <th className="border-b p-2">Email</th>
              <th className="border-b p-2">Role</th>
              <th className="border-b p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border-b p-2">{user.name}</td>
                <td className="border-b p-2">{user.email}</td>
                <td className="border-b p-2">{user.role}</td>
                <td className="border-b p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;