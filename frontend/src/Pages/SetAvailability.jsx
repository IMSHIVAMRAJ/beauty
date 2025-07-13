import React, { useState } from 'react';
import { Clock, Calendar, Save, Check, X } from 'lucide-react';

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
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Set Availability</h1>
          <p className="text-gray-600">Configure your working hours for each day of the week</p>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center mb-6">
            <Clock className="w-6 h-6 text-pink-600 mr-3" />
            <h2 className="text-xl font-bold text-gray-800">Working Hours</h2>
          </div>

          <div className="space-y-4">
            {days.map((day) => (
              <div key={day.key} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={day.key}
                      checked={availability[day.key].isAvailable}
                      onChange={() => handleDayToggle(day.key)}
                      className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
                    />
                    <label htmlFor={day.key} className="ml-3 text-lg font-medium text-gray-800">
                      {day.label}
                    </label>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    availability[day.key].isAvailable 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {availability[day.key].isAvailable ? 'Available' : 'Unavailable'}
                  </div>
                </div>

                {availability[day.key].isAvailable && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={availability[day.key].startTime}
                        onChange={(e) => handleTimeChange(day.key, 'startTime', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Time
                      </label>
                      <input
                        type="time"
                        value={availability[day.key].endTime}
                        onChange={(e) => handleTimeChange(day.key, 'endTime', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <p>• Set your availability to control when customers can book appointments</p>
                <p>• You can update these settings anytime</p>
              </div>
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center px-6 py-3 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center z-50">
            <Check className="w-5 h-5 mr-2" />
            Availability updated successfully!
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <div className="flex items-center mb-4">
              <Calendar className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-bold text-gray-800">Quick Presets</h3>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setAvailability({
                    monday: { isAvailable: true, startTime: '09:00', endTime: '18:00' },
                    tuesday: { isAvailable: true, startTime: '09:00', endTime: '18:00' },
                    wednesday: { isAvailable: true, startTime: '09:00', endTime: '18:00' },
                    thursday: { isAvailable: true, startTime: '09:00', endTime: '18:00' },
                    friday: { isAvailable: true, startTime: '09:00', endTime: '18:00' },
                    saturday: { isAvailable: true, startTime: '09:00', endTime: '18:00' },
                    sunday: { isAvailable: false, startTime: '09:00', endTime: '18:00' }
                  });
                }}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
              >
                Standard Week (Mon-Sat)
              </button>
              <button
                onClick={() => {
                  setAvailability({
                    monday: { isAvailable: true, startTime: '10:00', endTime: '20:00' },
                    tuesday: { isAvailable: true, startTime: '10:00', endTime: '20:00' },
                    wednesday: { isAvailable: true, startTime: '10:00', endTime: '20:00' },
                    thursday: { isAvailable: true, startTime: '10:00', endTime: '20:00' },
                    friday: { isAvailable: true, startTime: '10:00', endTime: '20:00' },
                    saturday: { isAvailable: true, startTime: '10:00', endTime: '20:00' },
                    sunday: { isAvailable: true, startTime: '10:00', endTime: '20:00' }
                  });
                }}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
              >
                Full Week (10 AM - 8 PM)
              </button>
              <button
                onClick={() => {
                  setAvailability({
                    monday: { isAvailable: false, startTime: '09:00', endTime: '18:00' },
                    tuesday: { isAvailable: false, startTime: '09:00', endTime: '18:00' },
                    wednesday: { isAvailable: false, startTime: '09:00', endTime: '18:00' },
                    thursday: { isAvailable: false, startTime: '09:00', endTime: '18:00' },
                    friday: { isAvailable: false, startTime: '09:00', endTime: '18:00' },
                    saturday: { isAvailable: false, startTime: '09:00', endTime: '18:00' },
                    sunday: { isAvailable: false, startTime: '09:00', endTime: '18:00' }
                  });
                }}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
              >
                Set All Unavailable
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="text-lg font-bold text-gray-800">Availability Summary</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Available Days:</span>
                <span className="font-medium">
                  {Object.values(availability).filter(day => day.isAvailable).length}/7
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Most Common Hours:</span>
                <span className="font-medium">9 AM - 6 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <div className="flex items-center mb-4">
              <Calendar className="w-6 h-6 text-purple-600 mr-3" />
              <h3 className="text-lg font-bold text-gray-800">Tips</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Set realistic hours to avoid overbooking</p>
              <p>• Consider travel time between appointments</p>
              <p>• Update availability for holidays</p>
              <p>• Keep some buffer time for breaks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetAvailability; 