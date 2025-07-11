import React, { useState } from "react";
import BeauticianManagement from "./BeauticianManagement";
import ServiceApproval from "./ServiceApproval";
import LocationManagement from "./LocationManagement";
import CouponManagement from "./CouponManagement";
import BookingControl from "./BookingControl";

const sections = [
  { name: "Beautician Management" },
  { name: "Service Approval" },
  { name: "Location Management" },
  { name: "Coupon Management" },
  { name: "Booking Control" },
  { name: "Skin Problem" },
  { name: "Hair Problem" },
];

const mockSkinProblems = [
  { name: "Aarti Sharma", number: "9876543210", problem: "Acne and pigmentation" },
  { name: "Priya Singh", number: "9123456780", problem: "Dry skin and redness" },
  { name: "Meena Kumari", number: "9988776655", problem: "Dark spots" },
];

const mockHairProblems = [
  { name: "Rohit Verma", number: "9876501234", problem: "Hair fall and dandruff" },
  { name: "Sonal Jain", number: "9001122334", problem: "Split ends" },
  { name: "Kiran Patel", number: "9876123450", problem: "Premature greying" },
];

const AdminDashboard = () => {
  const [active, setActive] = useState(sections[0].name);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#E90000] to-[#FAA6FF]">
      {/* Sidebar */}
      <aside className="w-64 bg-white/90 shadow-lg flex flex-col py-8 px-4 min-h-screen">
        <h2 className="text-2xl font-extrabold text-black mb-8 text-center">Admin Dashboard</h2>
        <nav className="flex flex-col gap-2">
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
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-start p-8">
        <div className="bg-white/90 rounded-2xl shadow-xl p-10 w-full min-h-[300px] flex flex-col items-start h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] overflow-y-auto">
          {active === "Beautician Management" && <BeauticianManagement />}
          {active === "Service Approval" && <ServiceApproval />}
          {active === "Location Management" && <LocationManagement />}
          {active === "Coupon Management" && <CouponManagement />}
          {active === "Booking Control" && <BookingControl />}
          {active === "Skin Problem" && (
            <div className="w-full">
              <h3 className="text-xl font-bold mb-4">Skin Problem Submissions</h3>
              <table className="w-full bg-white rounded-xl shadow border">
                <thead>
                  <tr className="bg-pink-100 text-pink-800">
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Number</th>
                    <th className="py-2 px-4 text-left">Problem</th>
                  </tr>
                </thead>
                <tbody>
                  {mockSkinProblems.map((row, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="py-2 px-4">{row.name}</td>
                      <td className="py-2 px-4">{row.number}</td>
                      <td className="py-2 px-4">{row.problem}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {active === "Hair Problem" && (
            <div className="w-full">
              <h3 className="text-xl font-bold mb-4">Hair Problem Submissions</h3>
              <table className="w-full bg-white rounded-xl shadow border">
                <thead>
                  <tr className="bg-pink-100 text-pink-800">
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Number</th>
                    <th className="py-2 px-4 text-left">Problem</th>
                  </tr>
                </thead>
                <tbody>
                  {mockHairProblems.map((row, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="py-2 px-4">{row.name}</td>
                      <td className="py-2 px-4">{row.number}</td>
                      <td className="py-2 px-4">{row.problem}</td>
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