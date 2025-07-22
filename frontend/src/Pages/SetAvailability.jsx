import React, { useState } from 'react';
import axios from 'axios';
import { Clock, Calendar, Save, Check } from 'lucide-react';

const SetAvailability = () => {
  const [availability, setAvailability] = useState({
    monday: { isAvailable: true, startTime: '09:00', endTime: '18:00' },
    tuesday: { isAvailable: true, startTime: '09:00', endTime: '18:00' },
    wednesday: { isAvailable: true, startTime: '09:00', endTime: '18:00' },
    thursday: { isAvailable: true, startTime: '09:00', endTime: '18:00' },
    friday: { isAvailable: true, startTime: '09:00', endTime: '18:00' },
    saturday: { isAvailable: true, startTime: '09:00', endTime: '18:00' },
    sunday: { isAvailable: false, startTime: '09:00', endTime: '18:00' }
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  const handleDayToggle = (day) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        isAvailable: !prev[day].isAvailable
      }
    }));
  };

  const handleTimeChange = (day, field, value) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const slots = Object.entries(availability).map(([day, value]) => ({
        day: day.charAt(0).toUpperCase() + day.slice(1),
        startTime: value.startTime,
        endTime: value.endTime,
        isAvailable: value.isAvailable
      }));

      const token = localStorage.getItem('beauticianToken');
      const res = await axios.post(
        'https://beauty-backend-dc5m.onrender.com/api/beautician/set-availability',
        { slots },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Availability Updated:", res.data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Update failed:", error);
      alert("Something went wrong while saving availability!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Set Availability</h1>

      {days.map(({ key, label }) => (
        <div key={key} className="border p-4 rounded-lg mb-4 shadow">
          <div className="flex justify-between items-center">
            <label className="font-medium text-lg">{label}</label>
            <input
              type="checkbox"
              checked={availability[key].isAvailable}
              onChange={() => handleDayToggle(key)}
            />
          </div>

          {availability[key].isAvailable && (
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <label className="text-sm">Start Time</label>
                <input
                  type="time"
                  value={availability[key].startTime}
                  onChange={(e) => handleTimeChange(key, 'startTime', e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              <div>
                <label className="text-sm">End Time</label>
                <input
                  type="time"
                  value={availability[key].endTime}
                  onChange={(e) => handleTimeChange(key, 'endTime', e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={handleSave}
        disabled={loading}
        className="mt-6 px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
      >
        {loading ? "Saving..." : "Save Availability"}
      </button>

      {success && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded shadow flex items-center gap-2">
          <Check size={18} /> Availability updated successfully!
        </div>
      )}
    </div>
  );
};

export default SetAvailability;
