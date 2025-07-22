import React, { useEffect, useState } from "react";
import axios from "axios";

const BeauticianSlots = () => {
  const [beauticians, setBeauticians] = useState([]);

  useEffect(() => {
    fetchBeauticianSlots();
  }, []);

  const fetchBeauticianSlots = async () => {
    try {
      const { data } = await axios.get("https://beauty-backend-dc5m.onrender.com/api/admin/beauticianslot", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`, // 👈 if protected
        },
      });
      console.log("API Response:", data);
     setBeauticians(data.beauticians);
    } catch (error) {
      console.error("Error fetching beautician slots:", error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Beautician Availability</h2>

      {beauticians.map((beautician, index) => {
        const availableSlots = beautician.availableSlots.filter(slot => slot.isAvailable);

        return (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-6 border">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-pink-600">{beautician.name}</h3>
              <p className="text-gray-600">📧 {beautician.email}</p>
              <p className="text-gray-600">📞 {beautician.phone}</p>
            </div>

            {availableSlots.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableSlots.map((slot, idx) => (
                  <div key={idx} className="border rounded-lg p-4 bg-green-50">
                    <p className="font-medium text-gray-800">{slot.day}</p>
                    <p className="text-gray-600 text-sm">
                      {slot.startTime} - {slot.endTime}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-red-500">No available slots</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BeauticianSlots;
