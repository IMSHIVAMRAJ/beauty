import React, { useEffect, useState } from "react";
import axios from "axios";

const statusColors = {
  Active: "bg-green-100 text-green-700",
  Expired: "bg-pink-100 text-pink-700",
};

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ code: "", discountPercent: "", expiryDate: "" });

  // ✅ Get all coupons on load
  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("http://localhost:5000/api/admin/coupons", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Coupons fetched:", res.data);
      setCoupons(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch coupons:", err);
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.post("http://localhost:5000/api/admin/coupon", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Coupon added ✅");
      setCoupons([...coupons, res.data.coupon]);
      setShowModal(false);
      setForm({ code: "", discountPercent: "", expiryDate: "" });
    } catch (err) {
      console.error("Add coupon failed:", err);
      alert("Failed to add coupon ❌");
    }
  };

  const isExpired = (expiryDate) => {
    return new Date(expiryDate) < new Date();
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-black">Coupon Management</h3>
        <button
          className="bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white px-5 py-2 rounded-lg font-semibold shadow hover:opacity-90 transition"
          onClick={() => setShowModal(true)}
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
            </tr>
          </thead>
          <tbody>
            {coupons.map((c) => {
              const status = isExpired(c.expiryDate) ? "Expired" : "Active";
              return (
                <tr key={c._id} className="border-b last:border-b-0 hover:bg-pink-50/40">
                  <td className="py-3 px-4">{c.code}</td>
                  <td className="py-3 px-4">{c.discountPercent}%</td>
                  <td className="py-3 px-4">{c.expiryDate?.substring(0, 10)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}>
                      {status}
                    </span>
                  </td>
                </tr>
              );
            })}
            {coupons.length === 0 && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-400">
                  No coupons found.
                </td>
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
            <h4 className="text-lg font-bold mb-4 text-black">Add Coupon</h4>

            <div className="mb-4">
              <label className="block font-semibold mb-1 text-black">Code</label>
              <input
                name="code"
                value={form.code}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2 rounded-lg border-2 border-pink-200 bg-pink-50 text-black"
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1 text-black">Discount (%)</label>
              <input
                name="discountPercent"
                type="number"
                min="1"
                value={form.discountPercent}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2 rounded-lg border-2 border-pink-200 bg-pink-50 text-black"
              />
            </div>

            <div className="mb-6">
              <label className="block font-semibold mb-1 text-black">Expiry Date</label>
              <input
                name="expiryDate"
                type="date"
                value={form.expiryDate}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2 rounded-lg border-2 border-pink-200 bg-pink-50 text-black"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white rounded-lg font-bold text-lg shadow-md"
            >
              Add Coupon
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CouponManagement;
