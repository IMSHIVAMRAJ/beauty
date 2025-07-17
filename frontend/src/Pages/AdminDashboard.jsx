import React, { useState, useEffect } from "react";
import BeauticianManagement from "./BeauticianManagement";
import ServiceApproval from "./ServiceApproval";
import LocationManagement from "./LocationManagement";
import CouponManagement from "./CouponManagement";
import BookingControl from "./BookingControl";
import BeauticianSlots from "./BeauticianSlots";
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const sections = [
  { name: "Beautician Management" },
  { name: "Service Approval" },
  { name: "Location Management" },
  { name: "Coupon Management" },
  { name: "Booking Control" },
  { name: "Beautician Slots" },
  { name: "Skin Problem" },
  { name: "Hair Problem" },
];

const AdminDashboard = () => {
  const [active, setActive] = useState(sections[0].name);
  const [hairData, setHairData] = useState([]);
  const [skinData, setSkinData] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  useEffect(() => {
    if (active === "Hair Problem") {
      axios.get("http://localhost:5001/ai/hair-recommend")
        .then(res => setHairData(res.data))
        .catch(err => console.error("Error fetching hair recommendations:", err));
    }

    if (active === "Skin Problem") {
      axios.get("http://localhost:5001/ai/skin-recommend")
        .then(res => setSkinData(res.data))
        .catch(err => console.error("Error fetching skin recommendations:", err));
    }
  }, [active]);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#E90000] to-[#FAA6FF]">
      {/* Sidebar */}
      <aside className="w-64 bg-white/90 shadow-lg flex flex-col py-8 px-4 min-h-screen">
        <h2 className="text-2xl font-extrabold text-black mb-8 text-center">Admin Dashboard</h2>
        <nav className="flex flex-col gap-2 flex-1">
          {sections.map((section) => (
            <button
              key={section.name}
              onClick={() => setActive(section.name)}
              className={`text-left px-4 py-3 rounded-lg font-semibold text-base transition-all duration-150 ${
                active === section.name
                  ? "bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white shadow"
                  : "text-gray-700 hover:bg-pink-50"
              }`}
            >
              {section.name}
            </button>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-4 py-3 rounded-lg text-left text-red-600 font-semibold hover:bg-red-50 transition mt-8"
        >
          <LogOut className="w-5 h-5 mr-2" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-start p-8">
        <div className="bg-white/90 rounded-2xl shadow-xl p-10 w-full min-h-[300px] flex flex-col items-start h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] overflow-y-auto">
          {active === "Beautician Management" && <BeauticianManagement />}
          {active === "Service Approval" && <ServiceApproval />}
          {active === "Location Management" && <LocationManagement />}
          {active === "Coupon Management" && <CouponManagement />}
          {active === "Booking Control" && <BookingControl />}
          {active === "Beautician Slots" && <BeauticianSlots />}

          {/* Hair Problem Section */}
          {active === "Hair Problem" && (
            <div className="w-full">
              <h3 className="text-xl font-bold mb-4">Hair Problem Submissions</h3>
              <table className="w-full bg-white rounded-xl shadow border">
                <thead>
                  <tr className="bg-pink-100 text-pink-800">
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Number</th>
                    <th className="py-2 px-4 text-left">Concerns</th>
              
                  </tr>
                </thead>
                <tbody>
                  {hairData.map((row, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="py-2 px-4">{row.name}</td>
                      <td className="py-2 px-4">{row.phone}</td>
                      <td className="py-2 px-4">
                        {Array.isArray(row.hair_concerns)
                          ? row.hair_concerns.join(", ")
                          : row.hair_concerns}
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Skin Problem Section */}
          {active === "Skin Problem" && (
            <div className="w-full">
              <h3 className="text-xl font-bold mb-4">Skin Problem Submissions</h3>
              <table className="w-full bg-white rounded-xl shadow border">
                <thead>
                  <tr className="bg-pink-100 text-pink-800">
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Number</th>
                    <th className="py-2 px-4 text-left">Concerns</th>
               
                  </tr>
                </thead>
                <tbody>
                  {skinData.map((row, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="py-2 px-4">{row.name}</td>
                      <td className="py-2 px-4">{row.phone}</td>
                      <td className="py-2 px-4">
                        {Array.isArray(row.skin_concerns)
                          ? row.skin_concerns.join(", ")
                          : row.skin_concerns}
                      </td>
                    
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
