import React, { useState } from "react";

const mockServices = [
  { id: 1, name: "Facial Glow", beautician: "Aarti Sharma", category: "Facial", status: "Pending" },
  { id: 2, name: "Hair Spa", beautician: "Priya Singh", category: "Hair", status: "Pending" },
  { id: 3, name: "Manicure", beautician: "Neha Verma", category: "Nails", status: "Pending" },
];

const statusColors = {
  Pending: "bg-pink-100 text-pink-700",
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

const ServiceApproval = () => {
  const [services, setServices] = useState(mockServices);
  const [showModal, setShowModal] = useState(false);
  const [modalService, setModalService] = useState(null);

  const handleApprove = (id) => {
    setServices(services.map(s => s.id === id ? { ...s, status: "Approved" } : s));
  };
  const handleReject = (id) => {
    setServices(services.map(s => s.id === id ? { ...s, status: "Rejected" } : s));
  };
  const handleView = (service) => {
    setModalService(service);
    setShowModal(true);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-black">Service Approval</h3>
      </div>
      <div className="overflow-x-auto rounded-xl shadow bg-white/90">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-pink-50 text-pink-700">
              <th className="py-3 px-4 text-left font-semibold">Service Name</th>
              <th className="py-3 px-4 text-left font-semibold">Beautician</th>
              <th className="py-3 px-4 text-left font-semibold">Category</th>
              <th className="py-3 px-4 text-left font-semibold">Status</th>
              <th className="py-3 px-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id} className="border-b last:border-b-0 hover:bg-pink-50/40">
                <td className="py-3 px-4">{s.name}</td>
                <td className="py-3 px-4">{s.beautician}</td>
                <td className="py-3 px-4">{s.category}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[s.status] || "bg-gray-100 text-gray-700"}`}>
                    {s.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center space-x-2">
                  {s.status === "Pending" && (
                    <>
                      <button
                        className="text-green-600 hover:underline text-xs font-semibold"
                        onClick={() => handleApprove(s.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="text-red-600 hover:underline text-xs font-semibold"
                        onClick={() => handleReject(s.id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    className="text-blue-600 hover:underline text-xs font-semibold"
                    onClick={() => handleView(s)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-400">No services found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {showModal && modalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
            <button
              type="button"
              className="absolute top-3 right-4 text-gray-400 hover:text-pink-500 text-xl"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h4 className="text-lg font-bold mb-4 text-black">Service Details</h4>
            <div className="mb-3"><span className="font-semibold text-black">Service Name:</span> {modalService.name}</div>
            <div className="mb-3"><span className="font-semibold text-black">Beautician:</span> {modalService.beautician}</div>
            <div className="mb-3"><span className="font-semibold text-black">Category:</span> {modalService.category}</div>
            <div className="mb-3"><span className="font-semibold text-black">Status:</span> <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[modalService.status]}`}>{modalService.status}</span></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceApproval; 