import React, { useState } from 'react'
import { useCart } from '../Components/CartContext'
import { CalendarCheck2, User2, BadgeCheck, XCircle, Eye } from 'lucide-react'

const mockBookings = [
  { id: 1, service: "Facial Glow", beautician: "Aarti Sharma", datetime: "2024-06-20 10:00", status: "Upcoming" },
  { id: 2, service: "Hair Spa", beautician: "Priya Singh", datetime: "2024-06-18 15:30", status: "Completed" },
  { id: 3, service: "Manicure", beautician: "Neha Verma", datetime: "2024-06-19 12:00", status: "Cancelled" },
];

const statusStyles = {
  Upcoming: {
    color: "bg-pink-100 text-pink-700",
    icon: <CalendarCheck2 className="w-4 h-4 mr-1 text-pink-500 inline" />,
  },
  Completed: {
    color: "bg-green-100 text-green-700",
    icon: <BadgeCheck className="w-4 h-4 mr-1 text-green-500 inline" />,
  },
  Cancelled: {
    color: "bg-red-100 text-red-700",
    icon: <XCircle className="w-4 h-4 mr-1 text-red-500 inline" />,
  },
}

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const [selected, setSelected] = useState([]);
  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  const allSelected = cart.length > 0 && selected.length === cart.length;
  const toggleSelectAll = () => {
    if (allSelected) setSelected([]);
    else setSelected(cart.map((item) => item.id));
  };
  const toggleSelect = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]);
  };
  const removeSelected = () => {
    selected.forEach((id) => removeFromCart(id));
    setSelected([]);
  };

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock total amount (replace with actual cart total)
  const totalAmount = 499;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById('razorpay-script')) return resolve(true);
      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayNow = async () => {
    setLoading(true);
    const res = await loadRazorpayScript();
    if (!res) {
      alert('Failed to load Razorpay SDK.');
      setLoading(false);
      return;
    }
    const options = {
      key: 'rzp_test_1234567890abcdef', // Replace with your Razorpay test key
      amount: totalAmount * 100, // in paise
      currency: 'INR',
      name: 'Yes Madam',
      description: 'Cart Payment',
      image: '/logo.png', // optional, replace with your logo
      handler: function (response) {
        setPaymentSuccess(true);
        setLoading(false);
        // You can handle post-payment logic here
      },
      prefill: {
        name: '',
        email: '',
        contact: '',
      },
      theme: {
        color: '#E90000',
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  };

  return (
    <div className="cart-page bg-gray-100 min-h-screen py-4 sm:py-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-4 sm:gap-8 px-2 sm:px-4">
        {/* Main Cart Section */}
        <section className="flex-1 bg-white rounded-xl shadow-lg p-3 sm:p-6 md:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Service Cart</h1>
          <div className="flex items-center mb-3 sm:mb-4 text-pink-600 text-xs sm:text-sm font-semibold cursor-pointer">
            <input type="checkbox" className="mr-2" checked={allSelected} onChange={toggleSelectAll} />
            {allSelected ? 'Deselect all items' : 'Select all items'}
          </div>
          {selected.length > 0 && (
            <button className="mb-3 sm:mb-4 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg transition w-full sm:w-auto" onClick={removeSelected}>
              Remove Selected
            </button>
          )}
          <hr className="mb-4 sm:mb-6" />

          {/* Cart Items List */}
          <div className="space-y-4 sm:space-y-8">
            {cart.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center text-gray-500 text-lg">Your cart is empty.</div>
            ) : (
              cart.map((service) => (
                <div key={service.id} className={`bg-white rounded-2xl shadow-lg p-3 sm:p-6 mb-2 border ${selected.includes(service.id) ? 'border-pink-400' : 'border-transparent'}` + ' transition-all'}>
                  <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-start gap-3 sm:gap-6">
                    <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                      <input type="checkbox" checked={selected.includes(service.id)} onChange={() => toggleSelect(service.id)} className="mt-1 accent-pink-500 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="font-bold text-base sm:text-xl text-gray-900 mb-1 truncate">{service.title || service.name}</div>
                        <div className="text-gray-500 text-xs sm:text-sm mb-2 truncate">{service.subtitle || service.details?.join(' + ') || ''}</div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-base sm:text-lg font-bold text-gray-900">₹{service.price}</span>
                          {service.originalPrice && (
                            <span className="text-gray-400 line-through text-xs sm:text-base">₹{service.originalPrice}</span>
                          )}
                          {service.discount && (
                            <span className="text-green-600 font-bold text-xs sm:text-base">{service.discount}</span>
                          )}
                          {service.duration && (
                            <span className="text-gray-700 text-xs sm:text-sm ml-2">{service.duration}</span>
                          )}
                        </div>
                        {service.description && <div className="text-gray-600 text-xs sm:text-sm mt-2 break-words">{service.description}</div>}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-end min-w-[80px]">
                      <div className="flex items-center gap-1 sm:gap-2 bg-pink-50 rounded-lg px-2 sm:px-3 py-1 w-fit">
                        <button className="text-pink-500 text-lg sm:text-xl font-bold px-2" onClick={() => removeFromCart(service.id)}>-</button>
                        <span className="font-semibold text-base sm:text-lg">1</span>
                        <button className="text-pink-300 text-lg sm:text-xl font-bold px-2 cursor-not-allowed" disabled>+</button>
                      </div>
                    </div>
                  </div>
                  <hr className="my-3 sm:my-4" />
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-gray-700 font-medium text-xs sm:text-sm">Service Charges</span>
                    <span className="font-bold text-gray-900 text-xs sm:text-base">₹{service.serviceCharges || Math.round((service.price || 0) * 0.6)}</span>
                    <span className="ml-2 border border-gray-300 rounded-full px-2 sm:px-3 py-0.5 text-xs">1 person</span>
                  </div>
                  {service.details && (
                    <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm mt-2">
                      {service.details.map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                  )}
                </div>
              ))
            )}
          </div>
        </section>

        {/* Cart Summary Section */}
        <aside className="w-full lg:w-80 bg-white rounded-xl shadow-lg p-4 sm:p-6 h-fit">
          <div className="text-base sm:text-lg font-semibold mb-2">Subtotal ({cart.length} items): <span className="text-pink-700 font-bold">₹{total}</span></div>
          <div className="mt-8 flex flex-col items-center">
            <div className="text-lg font-bold mb-4">Total: ₹{totalAmount}</div>
            <button
              onClick={handlePayNow}
              className="w-full max-w-xs py-3 bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white rounded-lg font-bold text-lg shadow-md tracking-wide transition disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading || paymentSuccess}
            >
              {loading ? 'Processing...' : paymentSuccess ? 'Payment Successful' : 'Pay Now'}
            </button>
            {paymentSuccess && (
              <div className="mt-4 text-green-600 font-semibold text-center">Payment Successful! Thank you for your order.</div>
            )}
          </div>
        </aside>
      </div>
      {/* Date and Time Selector (outside cards parent div) */}
      {cart.length > 0 && (
        <div className="max-w-6xl mx-auto mt-6 sm:mt-8 bg-white rounded-xl shadow-lg p-4 sm:p-6 flex flex-col gap-4">
          <label className="font-semibold text-gray-700 mb-2">Select Date and Time for Service</label>
          <input type="date" className="border rounded px-4 py-2 w-full max-w-xs" />
          <input type="time" className="border rounded px-4 py-2 w-full max-w-xs" />
        </div>
      )}
      {/* Booking History Section */}
      <div className="mt-12 px-2 sm:px-4">
        <div className="flex items-center gap-2 mb-4">
          <CalendarCheck2 className="w-6 h-6 text-pink-500" />
          <h2 className="text-xl font-bold text-black">Booking History</h2>
        </div>
        <div className="overflow-x-auto rounded-2xl shadow bg-white/95 p-4 max-h-[420px] min-h-[180px] scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-transparent">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-pink-50 text-pink-700">
                <th className="py-3 px-4 text-left font-semibold">Service</th>
                <th className="py-3 px-4 text-left font-semibold">Beautician</th>
                <th className="py-3 px-4 text-left font-semibold">Date/Time</th>
                <th className="py-3 px-4 text-left font-semibold">Status</th>
                <th className="py-3 px-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockBookings.map((b, idx) => (
                <tr key={b.id} className={
                  `border-b last:border-b-0 ${idx % 2 === 0 ? 'bg-white' : 'bg-pink-50/40'} hover:bg-pink-100/40`
                }>
                  <td className="py-3 px-4 flex items-center gap-2">
                    <User2 className="w-4 h-4 text-gray-400 mr-1" />
                    {b.service}
                  </td>
                  <td className="py-3 px-4">{b.beautician}</td>
                  <td className="py-3 px-4">{b.datetime}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[b.status].color}`}>
                      {statusStyles[b.status].icon}
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <button className="inline-flex items-center gap-1 text-blue-600 hover:underline text-xs font-semibold">
                      <Eye className="w-4 h-4" /> View
                    </button>
                    {b.status === "Upcoming" && (
                      <button className="inline-flex items-center gap-1 text-red-600 hover:underline text-xs font-semibold">
                        <XCircle className="w-4 h-4" /> Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {mockBookings.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-400">No bookings found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Cart