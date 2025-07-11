import React, { useState } from "react";

const mockBeauticians = [
  { id: 1, name: "Aarti Sharma", email: "aarti@example.com", phone: "9876543210", status: "Verified" },
  { id: 2, name: "Priya Singh", email: "priya@example.com", phone: "9123456780", status: "Pending" },
  { id: 3, name: "Neha Verma", email: "neha@example.com", phone: "9988776655", status: "Verified" },
];

const statusColors = {
  Verified: "bg-green-100 text-green-700",
  Pending: "bg-pink-100 text-pink-700",
};

const BeauticianManagement = () => {
  const [beauticians, setBeauticians] = useState(mockBeauticians);
  const [showModal, setShowModal] = useState(false);
  const [editBeautician, setEditBeautician] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", status: "Pending" });

  const openAddModal = () => {
    setEditBeautician(null);
    setForm({ name: "", email: "", phone: "", status: "Pending" });
    setShowModal(true);
  };

  const openEditModal = (b) => {
    setEditBeautician(b);
    setForm({ name: b.name, email: b.email, phone: b.phone, status: b.status });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editBeautician) {
      setBeauticians(beauticians.map(b => b.id === editBeautician.id ? { ...editBeautician, ...form } : b));
    } else {
      setBeauticians([
        ...beauticians,
        { id: Date.now(), ...form },
      ]);
    }
    setShowModal(false);
  };

  const handleRemove = (id) => {
    setBeauticians(beauticians.filter(b => b.id !== id));
  };

  const handleVerify = (id) => {
    setBeauticians(beauticians.map(b => b.id === id ? { ...b, status: "Verified" } : b));
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-black">Beautician Management</h3>
        <button
          className="bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white px-5 py-2 rounded-lg font-semibold shadow hover:opacity-90 transition"
          onClick={openAddModal}
        >
          Add Beautician
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl shadow bg-white/90">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-pink-50 text-pink-700">
              <th className="py-3 px-4 text-left font-semibold">Name</th>
              <th className="py-3 px-4 text-left font-semibold">Email</th>
              <th className="py-3 px-4 text-left font-semibold">Phone</th>
              <th className="py-3 px-4 text-left font-semibold">Status</th>
              <th className="py-3 px-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {beauticians.map((b) => (
              <tr key={b.id} className="border-b last:border-b-0 hover:bg-pink-50/40">
                <td className="py-3 px-4">{b.name}</td>
                <td className="py-3 px-4">{b.email}</td>
                <td className="py-3 px-4">{b.phone}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[b.status] || "bg-gray-100 text-gray-700"}`}>
                    {b.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center space-x-2">
                  <button
                    className="text-blue-600 hover:underline text-xs font-semibold"
                    onClick={() => openEditModal(b)}
                  >
                    Edit
                  </button>
                  {b.status !== "Verified" && (
                    <button
                      className="text-green-600 hover:underline text-xs font-semibold"
                      onClick={() => handleVerify(b.id)}
                    >
                      Verify
                    </button>
                  )}
                  <button
                    className="text-red-600 hover:underline text-xs font-semibold"
                    onClick={() => handleRemove(b.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {beauticians.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-400">No beauticians found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <form
            onSubmit={handleFormSubmit}
            className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative"
          >
            <button
              type="button"
              className="absolute top-3 right-4 text-gray-400 hover:text-pink-500 text-xl"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h4 className="text-lg font-bold mb-4 text-black">
              {editBeautician ? "Edit Beautician" : "Add Beautician"}
            </h4>
            <div className="mb-4">
              <label className="block font-semibold mb-1 text-black">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleFormChange}
                className="w-full px-4 py-2 rounded-lg border-2 border-pink-200 bg-pink-50 text-black font-medium focus:border-pink-400 focus:outline-none transition"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1 text-black">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleFormChange}
                className="w-full px-4 py-2 rounded-lg border-2 border-pink-200 bg-pink-50 text-black font-medium focus:border-pink-400 focus:outline-none transition"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1 text-black">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleFormChange}
                className="w-full px-4 py-2 rounded-lg border-2 border-pink-200 bg-pink-50 text-black font-medium focus:border-pink-400 focus:outline-none transition"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block font-semibold mb-1 text-black">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleFormChange}
                className="w-full px-4 py-2 rounded-lg border-2 border-pink-200 bg-pink-50 text-black font-medium focus:border-pink-400 focus:outline-none transition"
              >
                <option value="Pending">Pending</option>
                <option value="Verified">Verified</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white rounded-lg font-bold text-lg shadow-md tracking-wide transition"
            >
              {editBeautician ? "Update" : "Add"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BeauticianManagement; 