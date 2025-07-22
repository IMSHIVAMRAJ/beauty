import React, { useEffect, useState } from "react";
import axios from "axios";

const BeauticianManagement = () => {
  const [beauticians, setBeauticians] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    profileImage: null,
  });

  useEffect(() => {
    fetchBeauticians();
  }, []);

  const fetchBeauticians = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("https://beauty-backend-dc5m.onrender.com/api/admin/beauticians", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBeauticians(res.data);
    } catch (err) {
      console.error("Error fetching beauticians:", err);
    }
  };

  const openAddModal = () => {
    setForm({ name: "", email: "", phone: "", password: "", profileImage: null });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, profileImage: e.target.files[0] });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("password", form.password);
    if (form.profileImage) {
      formData.append("profileImage", form.profileImage);
    }

    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.post("https://beauty-backend-dc5m.onrender.com/api/admin/beautician/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Beautician added:", res.data);
      setShowModal(false);
      fetchBeauticians();
    } catch (error) {
      console.error("Error adding beautician:", error.response?.data || error);
      alert("Failed to add beautician. Please check console for error.");
    }
  };

  const handleRemove = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`https://beauty-backend-dc5m.onrender.com/api/admin/beautician/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchBeauticians();
    } catch (err) {
      console.error("Error removing beautician:", err);
    }
  };

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-black">Beautician Management</h3>
        <button
          className="bg-gradient-to-r from-red-500 to-pink-400 text-white px-5 py-2 rounded-lg font-semibold shadow hover:opacity-90 transition"
          onClick={openAddModal}
        >
          Add Beautician
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl shadow bg-white">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-pink-50 text-pink-700">
              <th className="py-3 px-4 text-left font-semibold">Name</th>
              <th className="py-3 px-4 text-left font-semibold">Email</th>
              <th className="py-3 px-4 text-left font-semibold">Phone</th>
              <th className="py-3 px-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {beauticians.map((b) => (
              <tr key={b._id} className="border-b hover:bg-pink-50/40">
                <td className="py-3 px-4">{b.name}</td>
                <td className="py-3 px-4">{b.email}</td>
                <td className="py-3 px-4">{b.phone}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    className="text-red-600 hover:underline text-xs font-semibold"
                    onClick={() => handleRemove(b._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {beauticians.length === 0 && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-400">No beauticians found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <form
            onSubmit={handleFormSubmit}
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
          >
            <button
              type="button"
              className="absolute top-2 right-4 text-gray-400 hover:text-red-500 text-2xl"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h2 className="text-lg font-bold mb-4 text-black">Add Beautician</h2>

            <label className="block mb-2 font-medium text-black">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleFormChange}
              className="w-full mb-4 px-4 py-2 border border-pink-300 rounded-lg"
              required
            />

            <label className="block mb-2 font-medium text-black">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleFormChange}
              className="w-full mb-4 px-4 py-2 border border-pink-300 rounded-lg"
              required
            />

            <label className="block mb-2 font-medium text-black">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleFormChange}
              className="w-full mb-4 px-4 py-2 border border-pink-300 rounded-lg"
              required
            />

            <label className="block mb-2 font-medium text-black">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleFormChange}
              className="w-full mb-4 px-4 py-2 border border-pink-300 rounded-lg"
              required
            />

            <label className="block mb-2 font-medium text-black">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full mb-6"
            />

            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-2 rounded-lg font-semibold hover:bg-pink-700"
            >
              Add Beautician
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BeauticianManagement;
