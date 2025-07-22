import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Calendar, Clock, User, Phone, MapPin,
  CheckCircle, Clock as ClockIcon, Search
} from 'lucide-react';

const BeauticianBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // ✅ Fetch bookings on mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get('https://beauty-backend-dc5m.onrender.com/api/beautician/my-bookings', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("beauticianToken")}`
          }
        });
        setBookings(data);
      } catch (err) {
        console.error('Error fetching beautician bookings:', err);
      }
    };

    fetchBookings();
  }, []);

  const filters = [
    { key: 'all', label: 'All Bookings', count: bookings.length },
    { key: 'confirmed', label: 'Confirmed', count: bookings.filter(b => b.status === 'confirmed').length },
    { key: 'pending', label: 'Pending', count: bookings.filter(b => b.status === 'pending').length },
    { key: 'completed', label: 'Completed', count: bookings.filter(b => b.status === 'completed').length }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <ClockIcon className="w-4 h-4" />;
      default: return <ClockIcon className="w-4 h-4" />;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = activeFilter === 'all' || booking.status === activeFilter;
    const userName = booking.user?.fullName || "";
    const serviceNames = booking.services?.map(s => s.service?.name).join(', ') || "";
    const matchesSearch = userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          serviceNames.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">My Bookings</h1>

        {/* Filter & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border p-4 rounded-xl shadow mb-6">
          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  activeFilter === f.key ? 'bg-pink-100 text-pink-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f.label} ({f.count})
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking._id} className="bg-white p-6 rounded-xl shadow border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    {booking.user?.fullName || 'Unknown User'}
                  </h2>
                  <p className="text-gray-600">{booking.services.map(s => s.service?.name).join(', ')}</p>
                </div>
                <span className={`flex items-center gap-1 text-sm px-3 py-1 rounded-full font-medium ${getStatusColor(booking.status)}`}>
                  {getStatusIcon(booking.status)} {booking.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />{booking.date}</div>
                <div className="flex items-center gap-2"><Clock className="w-4 h-4" />{booking.timeSlot}</div>
                <div className="flex items-center gap-2"><Phone className="w-4 h-4" />{booking.user?.phone || "N/A"}</div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4" />{booking.address || "N/A"}</div>
              </div>

              {booking.notes && (
                <p className="text-sm text-gray-500"><strong>Notes:</strong> {booking.notes}</p>
              )}
            </div>
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            <Calendar className="w-10 h-10 mx-auto mb-2" />
            No bookings found.
          </div>
        )}
      </div>
    </div>
  );
};

export default BeauticianBookings;
