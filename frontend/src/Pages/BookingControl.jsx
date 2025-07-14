import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminBookingControl = () => {
  const [bookings, setBookings] = useState([]);
  const [beauticians, setBeauticians] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/admin/allbookings", {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      setBookings(data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const fetchBeauticians = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/admin/beauticians", {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      setBeauticians(data);
    } catch (err) {
      console.error("Error fetching beauticians:", err);
    }
  };

  const assignBeautician = async (bookingId, beauticianId) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/admin/bookings/${bookingId}/assign`,
        { beauticianId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        }
      );
      alert("Beautician assigned!");
      setRefresh((prev) => !prev);
    } catch (err) {
      alert("Failed to assign beautician");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchBeauticians();
  }, [refresh]);

  const pending = bookings.filter((b) => b.status === "pending");
  const approved = bookings.filter((b) => b.status === "approved");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Booking Control</h1>

      {/* ✅ Pending Bookings */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2 text-red-600">Pending Bookings (Needs Approval)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border">
            <thead>
              <tr className="bg-yellow-100">
                <th className="p-2">User</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Service</th>
                <th className="p-2">Date/Time</th>
                <th className="p-2">Assign Beautician</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {pending.length === 0 ? (
                <tr><td colSpan="6" className="text-center p-4">No pending bookings.</td></tr>
              ) : (
                pending.map((b) => (
                  <tr key={b._id} className="border-t">
                    <td className="p-2">{b.user?.name}</td>
                    <td className="p-2">{b.user?.phone || "-"}</td>
                    <td className="p-2">
                      {b.services?.map((s) => s.service?.name).join(", ")}
                    </td>
                    <td className="p-2">{b.date} - {b.timeSlot}</td>
                    <td className="p-2">
                      <select
                        className="border rounded px-2 py-1"
                        onChange={(e) => assignBeautician(b._id, e.target.value)}
                      >
                        <option value="">Select</option>
                        {beauticians.map((bt) => (
                          <option key={bt._id} value={bt._id}>{bt.name}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-2">
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded"
                        onClick={() => assignBeautician(b._id, b.beautician?._id)}
                        disabled={!b.beautician}
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ✅ Approved Bookings */}
      <section>
        <h2 className="text-xl font-semibold mb-2 text-green-600">Approved Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border">
            <thead>
              <tr className="bg-green-100">
                <th className="p-2">User</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Beautician</th>
                <th className="p-2">Service</th>
                <th className="p-2">Date/Time</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {approved.length === 0 ? (
                <tr><td colSpan="6" className="text-center p-4">No approved bookings yet.</td></tr>
              ) : (
                approved.map((b) => (
                  <tr key={b._id} className="border-t">
                    <td className="p-2">{b.user?.name}</td>
                    <td className="p-2">{b.user?.phone || "-"}</td>
                    <td className="p-2">{b.beautician?.name}</td>
                    <td className="p-2">
                      {b.services?.map((s) => s.service?.name).join(", ")}
                    </td>
                    <td className="p-2">{b.date} - {b.timeSlot}</td>
                    <td className="p-2 capitalize">{b.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminBookingControl;
