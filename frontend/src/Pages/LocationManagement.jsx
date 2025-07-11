import React, { useState } from "react";

const mockLocations = [
  { id: 1, name: "Gomti Nagar", city: "Lucknow", state: "Uttar Pradesh", status: "Active" },
  { id: 2, name: "Sector 62", city: "Noida", state: "Uttar Pradesh", status: "Active" },
  { id: 3, name: "MG Road", city: "Bengaluru", state: "Karnataka", status: "Inactive" },
];

const statusColors = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-pink-100 text-pink-700",
};

const LocationManagement = () => {
  const [locations, setLocations] = useState(mockLocations);
  const [showModal, setShowModal] = useState(false);
  const [editLocation, setEditLocation] = useState(null);
  const [form, setForm] = useState({ name: "", city: "", state: "", status: "Active" });

  const openAddModal = () => {
    setEditLocation(null);
    setForm({ name: "", city: "", state: "", status: "Active" });
    setShowModal(true);
  };

  const openEditModal = (loc) => {
    setEditLocation(loc);
    setForm({ name: loc.name, city: loc.city, state: loc.state, status: loc.status });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editLocation) {
      setLocations(locations.map(l => l.id === editLocation.id ? { ...editLocation, ...form } : l));
    } else {
      setLocations([
        ...locations,
        { id: Date.now(), ...form },
      ]);
    }
    setShowModal(false);
  };

  const handleRemove = (id) => {
    setLocations(locations.filter(l => l.id !== id));
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-black">Location Management</h3>
        <button
          className="bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white px-5 py-2 rounded-lg font-semibold shadow hover:opacity-90 transition"
          onClick={openAddModal}
        >
          Add Location
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl shadow bg-white/90">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-pink-50 text-pink-700">
              <th className="py-3 px-4 text-left font-semibold">Name</th>
              <th className="py-3 px-4 text-left font-semibold">City</th>
              <th className="py-3 px-4 text-left font-semibold">State</th>
              <th className="py-3 px-4 text-left font-semibold">Status</th>
              <th className="py-3 px-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((loc) => (
              <tr key={loc.id} className="border-b last:border-b-0 hover:bg-pink-50/40">
                <td className="py-3 px-4">{loc.name}</td>
                <td className="py-3 px-4">{loc.city}</td>
                <td className="py-3 px-4">{loc.state}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[loc.status] || "bg-gray-100 text-gray-700"}`}>
                    {loc.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center space-x-2">
                  <button
                    className="text-blue-600 hover:underline text-xs font-semibold"
                    onClick={() => openEditModal(loc)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline text-xs font-semibold"
                    onClick={() => handleRemove(loc.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {locations.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-400">No locations found.</td>
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
              {editLocation ? "Edit Location" : "Add Location"}
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
              <label className="block font-semibold mb-1 text-black">City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleFormChange}
                className="w-full px-4 py-2 rounded-lg border-2 border-pink-200 bg-pink-50 text-black font-medium focus:border-pink-400 focus:outline-none transition"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1 text-black">State</label>
              <input
                name="state"
                value={form.state}
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
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white rounded-lg font-bold text-lg shadow-md tracking-wide transition"
            >
              {editLocation ? "Update" : "Add"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LocationManagement; 