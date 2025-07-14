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

  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);
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
    console.log("Cart content at payment time:", cart);
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
                  service:  item._id || item.id,
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
            fetchBookings(); // reload booking data
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
      alert("Payment failed");
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
    <div className="cart-page bg-gray-100 min-h-screen py-4 sm:py-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-4 sm:gap-8 px-2 sm:px-4">
        <section className="flex-1 bg-white rounded-xl shadow-lg p-3 sm:p-6 md:p-8">
          <h1 className="text-2xl font-bold mb-4">Service Cart</h1>
          <div className="flex items-center mb-4 text-pink-600 font-semibold cursor-pointer">
            <input
              type="checkbox"
              className="mr-2"
              checked={allSelected}
              onChange={toggleSelectAll}
            />
            {allSelected ? "Deselect all" : "Select all"}
          </div>
          {selected.length > 0 && (
            <button
              onClick={removeSelected}
              className="mb-4 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded"
            >
              Remove Selected
            </button>
          )}
          <hr className="mb-4" />
          {cart.length === 0 ? (
            <div className="text-center text-gray-500">Your cart is empty.</div>
          ) : (
            cart.map((service) => (
              <div key={service.id} className="mb-4 border p-4 rounded shadow">
                <input
                  type="checkbox"
                  checked={selected.includes(service.id)}
                  onChange={() => toggleSelect(service.id)}
                />
                <div>
                  {service.name} - ₹{service.price}
                </div>
              </div>
            ))
          )}
        </section>

        <aside className="w-full lg:w-80 bg-white rounded-xl shadow-lg p-6">
          <div className="mt-8 flex flex-col items-center">
            <div className="text-lg font-bold mb-4">Total: ₹{total}</div>
            <button
              onClick={handlePayNow}
              disabled={loading || paymentSuccess}
              className="w-full py-3 bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white rounded-lg font-bold text-lg"
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

      {cart.length > 0 && (
        <div className="max-w-6xl mx-auto mt-6 bg-white rounded-xl shadow-lg p-4 flex flex-col gap-4">
          <label className="font-semibold text-gray-700">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter delivery address"
            className="border rounded px-4 py-2 w-full"
          />

          <label className="font-semibold text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded px-4 py-2 w-full max-w-xs"
          />

          <label className="font-semibold text-gray-700">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border rounded px-4 py-2 w-full max-w-xs"
          />
        </div>
      )}

      {/* Booking List */}
      {bookings.length > 0 && (
        <div className="max-w-6xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Your Bookings</h2>
          {bookings.map((booking) => (
            <div key={booking._id} className="border rounded p-4 mb-4 shadow">
              <div>
                <strong>Order ID:</strong> {booking.razorpay?.orderId || "N/A"}
              </div>
              <div>
                <strong>Payment ID:</strong>{" "}
                {booking.razorpay?.paymentId || "N/A"}
              </div>
              <div>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    booking.status === "pending"
                      ? "text-yellow-500"
                      : booking.status === "accepted"
                      ? "text-blue-500"
                      : booking.status === "completed"
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
              <div>
                <strong>Total:</strong> ₹{booking.totalAmount}
              </div>
              <div>
                <strong>Date:</strong>{" "}
                {new Date(booking.date).toLocaleDateString()}
              </div>
              <div>
                <strong>Time Slot:</strong> {booking.timeSlot}
              </div>
              <div>
                <strong>Address:</strong> {booking.address}
              </div>
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
