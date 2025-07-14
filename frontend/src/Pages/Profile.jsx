import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ fullName: "", email: "" });
  const [editMode, setEditMode] = useState(false);
  const [success, setSuccess] = useState("");

  // ✅ Fetch user data from backend
  const fetchProfile = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/users/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(data);
      setForm({ fullName: data.fullName, email: data.email });
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Save changes to backend
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "http://localhost:5000/api/users/update",
        {
          fullName: form.fullName,
          email: form.email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUser(data);
      setEditMode(false);
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E90000] to-[#FAA6FF] p-4">
      <form
        onSubmit={handleSave}
        className="bg-white/95 rounded-2xl shadow-2xl px-8 py-10 w-full max-w-md flex flex-col gap-6"
      >
        <h2 className="text-2xl font-extrabold text-black mb-2 text-center">My Profile</h2>

        {/* ✅ Full Name */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-black">Name</label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            readOnly={!editMode} // 👈👈 instead of disabled
            className={`w-full px-4 py-2 rounded-lg border-2 ${
              editMode ? "border-pink-400 bg-pink-50" : "border-gray-200 bg-gray-100"
            } text-black font-medium focus:outline-none transition`}
          />
        </div>

        {/* ✅ Email */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-black">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            readOnly={!editMode}
            className={`w-full px-4 py-2 rounded-lg border-2 ${
              editMode ? "border-pink-400 bg-pink-50" : "border-gray-200 bg-gray-100"
            } text-black font-medium focus:outline-none transition`}
          />
        </div>

        {/* ✅ Phone (Non-editable always) */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-black">Phone</label>
          <input
            value={user.phone}
            readOnly
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 bg-gray-100 text-gray-400 font-medium transition"
          />
        </div>

        {/* 🔒 Placeholder Password */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-black">Password</label>
          <input
            type="password"
            value="********"
            disabled
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 bg-gray-100 text-gray-400 font-medium transition"
          />
          <button type="button" className="text-pink-600 text-sm font-semibold text-left hover:underline" disabled>
            Change Password (coming soon)
          </button>
        </div>

        {/* ✅ Success Message */}
        {success && <div className="text-green-600 text-center font-semibold">{success}</div>}

        {/* ✅ Buttons */}
        <div className="flex gap-4 mt-2">
          {editMode ? (
            <>
              <button
                type="submit"
                className="flex-1 py-2 bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white rounded-lg font-bold text-lg shadow-md tracking-wide transition"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setForm({ fullName: user.fullName, email: user.email });
                }}
                className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold text-lg shadow-md tracking-wide transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setEditMode(true)}
              className="w-full py-2 bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white rounded-lg font-bold text-lg shadow-md tracking-wide transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;
