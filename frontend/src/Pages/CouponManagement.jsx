import React, { useState } from "react";

const mockCoupons = [
  { id: 1, code: "WELCOME10", discount: "10%", validity: "2024-12-31", status: "Active" },
  { id: 2, code: "SUMMER20", discount: "20%", validity: "2024-08-31", status: "Active" },
  { id: 3, code: "EXPIRED5", discount: "5%", validity: "2023-12-31", status: "Expired" },
];

const statusColors = {
  Active: "bg-green-100 text-green-700",
  Expired: "bg-pink-100 text-pink-700",
};

const CouponManagement = () => {
  const [coupons, setCoupons] = useState(mockCoupons);
  const [showModal, setShowModal] = useState(false);
  const [editCoupon, setEditCoupon] = useState(null);
  const [form, setForm] = useState({ code: "", discount: "", validity: "", status: "Active" });

  const openAddModal = () => {
    setEditCoupon(null);
    setForm({ code: "", discount: "", validity: "", status: "Active" });
    setShowModal(true);
  };

  const openEditModal = (coupon) => {
    setEditCoupon(coupon);
    setForm({ code: coupon.code, discount: coupon.discount, validity: coupon.validity, status: coupon.status });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editCoupon) {
      setCoupons(coupons.map(c => c.id === editCoupon.id ? { ...editCoupon, ...form } : c));
    } else {
      setCoupons([
        ...coupons,
        { id: Date.now(), ...form },
      ]);
    }
    setShowModal(false);
  };

  const handleRemove = (id) => {
    setCoupons(coupons.filter(c => c.id !== id));
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-black">Coupon Management</h3>
        <button
          className="bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white px-5 py-2 rounded-lg font-semibold shadow hover:opacity-90 transition"
          onClick={openAddModal}
        >
          Add Coupon
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl shadow bg-white/90">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-pink-50 text-pink-700">
              <th className="py-3 px-4 text-left font-semibold">Code</th>
              <th className="py-3 px-4 text-left font-semibold">Discount</th>
              <th className="py-3 px-4 text-left font-semibold">Validity</th>
              <th className="py-3 px-4 text-left font-semibold">Status</th>
              <th className="py-3 px-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c.id} className="border-b last:border-b-0 hover:bg-pink-50/40">
                <td className="py-3 px-4">{c.code}</td>
                <td className="py-3 px-4">{c.discount}</td>
                <td className="py-3 px-4">{c.validity}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[c.status] || "bg-gray-100 text-gray-700"}`}>
                    {c.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center space-x-2">
                  <button
                    className="text-blue-600 hover:underline text-xs font-semibold"
                    onClick={() => openEditModal(c)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline text-xs font-semibold"
                    onClick={() => handleRemove(c.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {coupons.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-400">No coupons found.</td>
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
              {editCoupon ? "Edit Coupon" : "Add Coupon"}
            </h4>
            <div className="mb-4">
              <label className="block font-semibold mb-1 text-black">Code</label>
              <input
                name="code"
                value={form.code}
                onChange={handleFormChange}
                className="w-full px-4 py-2 rounded-lg border-2 border-pink-200 bg-pink-50 text-black font-medium focus:border-pink-400 focus:outline-none transition"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1 text-black">Discount</label>
              <input
                name="discount"
                value={form.discount}
                onChange={handleFormChange}
                className="w-full px-4 py-2 rounded-lg border-2 border-pink-200 bg-pink-50 text-black font-medium focus:border-pink-400 focus:outline-none transition"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1 text-black">Validity</label>
              <input
                name="validity"
                type="date"
                value={form.validity}
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
                <option value="Expired">Expired</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white rounded-lg font-bold text-lg shadow-md tracking-wide transition"
            >
              {editCoupon ? "Update" : "Add"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CouponManagement; 