import React, { useState, useEffect } from "react";
import { useCart } from "../Components/CartContext";
import axios from "axios";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const [selected, setSelected] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [bookings, setBookings] = useState([]);

  // Use finalPrice if available, else price, else 0
  const total = cart.reduce((sum, item) => sum + (item.finalPrice || item.price || 0), 0);
  const allSelected = cart.length > 0 && selected.length === cart.length;

  const toggleSelectAll = () => {
    setSelected(allSelected ? [] : cart.map((item) => item.id));
  };

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const removeSelected = () => {
    selected.forEach((id) => removeFromCart(id));
    setSelected([]);
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) return resolve(true);
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayNow = async () => {
    if (!date || !time || !address) {
      alert("Please fill in address, date, and time.");
      return;
    }

    setLoading(true);
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert("Failed to load Razorpay");
      setLoading(false);
      return;
    }

    try {
      const { data: order } = await axios.post(
        "http://localhost:5000/api/booking/create-payment",
        {
          amount: total,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_1234567890abcdef",
        amount: order.amount,
        currency: "INR",
        name: "Yes Madam",
        description: "Service Payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            await axios.post(
              "http://localhost:5000/api/booking/confirm",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                services: cart.map((item) => ({
                  service: item._id || item.id,
                  quantity: 1,
                })),
                totalAmount: total,
                discount: 0,
                finalAmount: total,
                address,
                date,
                timeSlot: time,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );

            setPaymentSuccess(true);
            alert("Booking Successful!");
            removeSelected();
            fetchBookings();
          } catch (err) {
            console.error("Booking failed", err);
            alert("Booking failed");
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#E90000",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error", error);
      alert("Payment failed. Have you logged in?");
    }

    setLoading(false);
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/booking/my-bookings",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="cart-page min-h-screen py-4 sm:py-8 bg-gradient-to-br from-pink-100 via-[#FAA6FF] to-[#E90000]">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-4 sm:gap-8 px-2 sm:px-4">
        <section className="flex-1 bg-white rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 border border-pink-200">
          <h1 className="text-2xl font-bold mb-4 text-pink-700">Service Cart</h1>

          <div className="flex items-center mb-4 text-pink-600 font-semibold cursor-pointer">
            <input
              type="checkbox"
              className="mr-2 accent-pink-500 w-5 h-5"
              checked={allSelected}
              onChange={toggleSelectAll}
            />
            {allSelected ? "Deselect all" : "Select all"}
          </div>

          {selected.length > 0 && (
            <button
              onClick={removeSelected}
              className="mb-4 bg-gradient-to-r from-[#E90000] to-[#FAA6FF] hover:from-pink-700 hover:to-pink-400 text-white py-2 px-4 rounded-full font-bold shadow"
            >
              Remove Selected
            </button>
          )}

          <hr className="mb-4 border-pink-200" />

          {cart.length === 0 ? (
            <div className="text-center text-gray-500">Your cart is empty.</div>
          ) : (
            cart.map((service) => (
              <div
                key={service.id}
                className="mb-4 w-full bg-white border border-pink-200 rounded-2xl shadow-lg p-4 flex flex-col sm:flex-row items-center gap-4"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(service.id)}
                  onChange={() => toggleSelect(service.id)}
                  className="accent-pink-500 w-5 h-5 self-start"
                />
                {service.image && (
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-24 h-24 object-cover rounded-lg border border-pink-200"
                  />
                )}
                <div className="flex-1 text-left">
                  <h2 className="text-lg font-bold text-pink-700">{service.name}</h2>
                  <div className="mt-1 text-sm text-gray-700">
                    <p>
                      <span className="font-semibold">Price:</span> ₹{service.originalPrice}
                    </p>
                    <p>
                      <span className="font-semibold">Discount:</span>{" "}
                      {service.discount ? `${service.discount}%` : "No discount"}
                    </p>
                    <p>
                      <span className="font-semibold ">Final Price:</span> ₹{service.finalPrice || service.price}
                    </p>
                  </div>
                </div>
                {selected.includes(service.id) && (
                  <span className="inline-block bg-gradient-to-r from-pink-400 to-pink-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow">
                    Selected
                  </span>
                )}
              </div>
            ))
          )}
        </section>

        <aside className="w-full lg:w-80 bg-gradient-to-br from-pink-200 via-white to-pink-100 rounded-2xl shadow-2xl p-6 border border-pink-200 flex flex-col items-center min-h-[220px] justify-center">
          <div className="mt-8 w-full flex flex-col items-center">
            <div className="text-lg font-bold mb-4 text-pink-700">
              Total: <span className="text-2xl">₹{total}</span>
            </div>
            <button
              onClick={handlePayNow}
              disabled={loading || paymentSuccess}
              className="w-full py-3 bg-gradient-to-r from-[#E90000] via-[#FAA6FF] to-pink-400 text-white rounded-full font-bold text-lg shadow-lg hover:from-pink-700 hover:to-pink-400 transition"
            >
              {loading
                ? "Processing..."
                : paymentSuccess
                ? "Success"
                : "Pay Now"}
            </button>
            {paymentSuccess && (
              <div className="mt-4 text-green-600 font-semibold text-center">
                Payment Successful! Thank you.
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Inputs for booking */}
      {cart.length > 0 && (
        <div className="max-w-6xl mx-auto mt-6 bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-4 border border-pink-200">
          <label className="font-semibold text-gray-700">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter delivery address"
            className="border-2 border-pink-200 rounded px-4 py-2 w-full bg-white focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
          />

          <label className="font-semibold text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border-2 border-pink-200 rounded px-4 py-2 w-full max-w-xs bg-white focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
          />

          <label className="font-semibold text-gray-700">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border-2 border-pink-200 rounded px-4 py-2 w-full max-w-xs bg-white focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
          />
        </div>
      )}

      {/* Booking History */}
      {bookings.length > 0 && (
        <div className="max-w-6xl mx-auto mt-10 bg-white rounded-2xl shadow-2xl p-6 border border-pink-200">
          <h2 className="text-xl font-bold mb-4 text-pink-700">Your Bookings</h2>
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-gradient-to-r from-white via-pink-50 to-pink-100 border-2 border-pink-200 rounded-2xl p-4 mb-4 shadow flex flex-col gap-2"
            >
              <div><strong>Order ID:</strong> {booking.razorpay?.orderId || "N/A"}</div>
              <div><strong>Payment ID:</strong> {booking.razorpay?.paymentId || "N/A"}</div>
              <div>
                <strong>Status:</strong>{" "}
                <span className={`font-semibold px-3 py-1 rounded-full shadow text-white bg-gradient-to-r ${
                  booking.status === "pending"
                    ? "from-yellow-400 to-yellow-600"
                    : booking.status === "accepted"
                    ? "from-blue-400 to-blue-600"
                    : booking.status === "completed"
                    ? "from-green-400 to-green-600"
                    : "from-gray-400 to-gray-600"
                }`}>
                  {booking.status}
                </span>
              </div>
              <div><strong>Total:</strong> ₹{booking.totalAmount}</div>
              <div><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</div>
              <div><strong>Time Slot:</strong> {booking.timeSlot}</div>
              <div><strong>Address:</strong> {booking.address}</div>
              <div>
                <strong>Services:</strong>
                <ul className="list-disc list-inside">
                  {booking.services.map((item, idx) => (
                    <li key={idx}>
                      {item.service?.name || "Service"} (Qty: {item.quantity})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
