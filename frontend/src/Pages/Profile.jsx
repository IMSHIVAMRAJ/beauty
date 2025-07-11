import React, { useState } from "react";

const mockUser = {
  name: "Riya Patel",
  email: "riya.patel@example.com",
  phone: "9876543210",
};

const Profile = () => {
  const [user, setUser] = useState(mockUser);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(user);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUser(form);
    setEditMode(false);
    setSuccess("Profile updated successfully!");
    setTimeout(() => setSuccess(""), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E90000] to-[#FAA6FF] p-4">
      <form className="bg-white/95 rounded-2xl shadow-2xl px-8 py-10 w-full max-w-md flex flex-col gap-6" onSubmit={handleSave}>
        <h2 className="text-2xl font-extrabold text-black mb-2 text-center">My Profile</h2>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-black">Name</label>
          <input
            name="name"
            value={editMode ? form.name : user.name}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full px-4 py-2 rounded-lg border-2 border-pink-200 bg-pink-50 text-black font-medium focus:border-pink-400 focus:outline-none transition disabled:bg-gray-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-black">Email</label>
          <input
            name="email"
            type="email"
            value={editMode ? form.email : user.email}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full px-4 py-2 rounded-lg border-2 border-pink-200 bg-pink-50 text-black font-medium focus:border-pink-400 focus:outline-none transition disabled:bg-gray-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-black">Phone</label>
          <input
            name="phone"
            value={editMode ? form.phone : user.phone}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full px-4 py-2 rounded-lg border-2 border-pink-200 bg-pink-50 text-black font-medium focus:border-pink-400 focus:outline-none transition disabled:bg-gray-100"
          />
        </div>
        {/* Change Password Placeholder */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-black">Password</label>
          <input
            type="password"
            value="********"
            disabled
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 bg-gray-100 text-gray-400 font-medium focus:outline-none transition"
          />
          <button type="button" className="text-pink-600 font-semibold text-sm text-left mt-1 hover:underline" disabled>
            Change Password (coming soon)
          </button>
        </div>
        {success && <div className="text-green-600 text-center font-semibold">{success}</div>}
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
                className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold text-lg shadow-md tracking-wide transition"
                onClick={() => { setEditMode(false); setForm(user); }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              className="w-full py-2 bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white rounded-lg font-bold text-lg shadow-md tracking-wide transition"
              onClick={() => setEditMode(true)}
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