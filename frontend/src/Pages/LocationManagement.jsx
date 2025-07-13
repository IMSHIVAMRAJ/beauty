import React, { useEffect, useState } from "react";
import axios from "axios";

const LocationManagement = () => {
  const [locations, setLocations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ city: "", state: "" });

  // ✅ Fetch locations on load
  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("http://localhost:5000/api/admin/locations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched locations:", res.data);
      setLocations(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message);
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.post("http://localhost:5000/api/admin/location", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Location added ✅");
      setLocations([...locations, res.data.location]);
      setShowModal(false);
      setForm({ city: "", state: "" });
    } catch (err) {
      console.error("Add error:", err.response?.data || err.message);
      alert("Failed to add location ❌");
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-black">Location Management</h3>
        <button
          className="bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white px-5 py-2 rounded-lg font-semibold shadow hover:opacity-90 transition"
          onClick={() => setShowModal(true)}
        >
          Add Location
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl shadow bg-white/90">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-pink-50 text-pink-700">
              <th className="py-3 px-4 text-left font-semibold">City</th>
              <th className="py-3 px-4 text-left font-semibold">State</th>
              <th className="py-3 px-4 text-left font-semibold">Status</th>
              <th className="py-3 px-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((loc) => (
              <tr key={loc._id} className="border-b last:border-b-0 hover:bg-pink-50/40">
                <td className="py-3 px-4">{loc.city}</td>
                <td className="py-3 px-4">{loc.state}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      loc.isActive ? "bg-green-100 text-green-700" : "bg-pink-100 text-pink-700"
                    }`}
                  >
                    {loc.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-3 px-4 text-center text-gray-400 text-xs">N/A</td>
              </tr>
            ))}
            {locations.length === 0 && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-400">
                  No locations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for adding location */}
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
            <h4 className="text-lg font-bold mb-4 text-black">Add Location</h4>

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

            <div className="mb-6">
              <label className="block font-semibold mb-1 text-black">State</label>
              <input
                name="state"
                value={form.state}
                onChange={handleFormChange}
                className="w-full px-4 py-2 rounded-lg border-2 border-pink-200 bg-pink-50 text-black font-medium focus:border-pink-400 focus:outline-none transition"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white rounded-lg font-bold text-lg shadow-md tracking-wide transition"
            >
              Add
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LocationManagement;
