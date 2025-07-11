import React, { useState } from "react";

const mockBookings = [
  { id: 1, user: "Riya Patel", beautician: "Aarti Sharma", datetime: "2024-06-20 10:00", status: "Upcoming" },
  { id: 2, user: "Anjali Mehra", beautician: "Priya Singh", datetime: "2024-06-18 15:30", status: "Completed" },
  { id: 3, user: "Sneha Gupta", beautician: "Neha Verma", datetime: "2024-06-19 12:00", status: "Cancelled" },
];

const statusColors = {
  Upcoming: "bg-pink-100 text-pink-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const BookingControl = () => {
  const [bookings, setBookings] = useState(mockBookings);
  const [showModal, setShowModal] = useState(false);
  const [modalBooking, setModalBooking] = useState(null);

  const handleCancel = (id) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: "Cancelled" } : b));
  };
  const handleView = (booking) => {
    setModalBooking(booking);
    setShowModal(true);
  };
  // For now, Edit just opens the modal (could be expanded later)
  const handleEdit = (booking) => {
    setModalBooking(booking);
    setShowModal(true);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-black">Booking Control</h3>
      </div>
      <div className="overflow-x-auto rounded-xl shadow bg-white/90">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-pink-50 text-pink-700">
              <th className="py-3 px-4 text-left font-semibold">User</th>
              <th className="py-3 px-4 text-left font-semibold">Beautician</th>
              <th className="py-3 px-4 text-left font-semibold">Date/Time</th>
              <th className="py-3 px-4 text-left font-semibold">Status</th>
              <th className="py-3 px-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b last:border-b-0 hover:bg-pink-50/40">
                <td className="py-3 px-4">{b.user}</td>
                <td className="py-3 px-4">{b.beautician}</td>
                <td className="py-3 px-4">{b.datetime}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[b.status] || "bg-gray-100 text-gray-700"}`}>
                    {b.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center space-x-2">
                  <button
                    className="text-blue-600 hover:underline text-xs font-semibold"
                    onClick={() => handleView(b)}
                  >
                    View
                  </button>
                  <button
                    className="text-green-600 hover:underline text-xs font-semibold"
                    onClick={() => handleEdit(b)}
                  >
                    Edit
                  </button>
                  {b.status !== "Cancelled" && (
                    <button
                      className="text-red-600 hover:underline text-xs font-semibold"
                      onClick={() => handleCancel(b.id)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-400">No bookings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {showModal && modalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
            <button
              type="button"
              className="absolute top-3 right-4 text-gray-400 hover:text-pink-500 text-xl"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h4 className="text-lg font-bold mb-4 text-black">Booking Details</h4>
            <div className="mb-3"><span className="font-semibold text-black">User:</span> {modalBooking.user}</div>
            <div className="mb-3"><span className="font-semibold text-black">Beautician:</span> {modalBooking.beautician}</div>
            <div className="mb-3"><span className="font-semibold text-black">Date/Time:</span> {modalBooking.datetime}</div>
            <div className="mb-3"><span className="font-semibold text-black">Status:</span> <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[modalBooking.status]}`}>{modalBooking.status}</span></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingControl; 