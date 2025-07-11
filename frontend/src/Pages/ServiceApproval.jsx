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
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    beautician: '',
    category: '',
    price: '',
    description: '',
    image: '',
    status: 'Pending',
  });

  const openAddModal = () => {
    setForm({ name: '', beautician: '', category: '', price: '', description: '', image: '', status: 'Pending' });
    setShowAddModal(true);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setServices([
      ...services,
      { id: Date.now(), ...form },
    ]);
    setShowAddModal(false);
  };

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
        <button
          className="bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white px-5 py-2 rounded-lg font-semibold shadow hover:opacity-90 transition"
          onClick={openAddModal}
        >
          Add Service
        </button>
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
      {showAddModal && (
        <div className="absolute left-0 top-0 w-full h-full z-30 flex items-center justify-center bg-black/30" style={{ minHeight: '100%', minWidth: '100%' }}>
          <form
            onSubmit={handleFormSubmit}
            className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative"
            style={{ maxHeight: '90vh', overflowY: 'auto' }}
          >
            <button
              type="button"
              className="absolute top-3 right-4 text-gray-400 hover:text-pink-500 text-xl"
              onClick={() => setShowAddModal(false)}
            >
              &times;
            </button>
            <h4 className="text-lg font-bold mb-4 text-black">Add Service</h4>
            <div className="mb-4">
              <label className="block font-semibold mb-1 text-black">Service Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleFormChange}
                className="w-full px-4 py-2 rounded-lg border-2 border-pink-200 bg-pink-50 text-black font-medium focus:border-pink-400 focus:outline-none transition"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1 text-black">Beautician</label>
              <input
                name="beautician"
                value={form.beautician}
                onChange={handleFormChange}
                className="w-full px-4 py-2 rounded-lg border-2 border-pink-200 bg-pink-50 text-black font-medium focus:border-pink-400 focus:outline-none transition"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1 text-black">Category</label>
              <input
                name="category"
                value={form.category}
                onChange={handleFormChange}
                className="w-full px-4 py-2 rounded-lg border-2 border-pink-200 bg-pink-50 text-black font-medium focus:border-pink-400 focus:outline-none transition"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1 text-black">Price</label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleFormChange}
                className="w-full px-4 py-2 rounded-lg border-2 border-pink-200 bg-pink-50 text-black font-medium focus:border-pink-400 focus:outline-none transition"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1 text-black">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleFormChange}
                className="w-full px-4 py-2 rounded-lg border-2 border-pink-200 bg-pink-50 text-black font-medium focus:border-pink-400 focus:outline-none transition"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1 text-black">Image</label>
              <div className="flex flex-col gap-2">
                <label htmlFor="service-image-upload" className="inline-block cursor-pointer px-5 py-2 bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white rounded-lg font-semibold shadow hover:opacity-90 transition w-fit">
                  {form.image ? 'Change Image' : 'Choose Image'}
                </label>
                <input
                  id="service-image-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setForm((prev) => ({ ...prev, image: reader.result, imageFileName: file.name }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  required={!form.image}
                />
                {form.imageFileName && (
                  <span className="text-sm text-gray-700 font-medium">Selected: {form.imageFileName}</span>
                )}
                {form.image && (
                  <img src={form.image} alt="Preview" className="mt-2 rounded-lg max-h-32 object-contain border" />
                )}
              </div>
            </div>
            <div className="mb-6">
              <label className="block font-semibold mb-1 text-black">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleFormChange}
                className="w-full px-4 py-2 rounded-lg border-2 border-pink-200 bg-pink-50 text-black font-medium focus:border-pink-400 focus:outline-none transition"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white rounded-lg font-bold text-lg shadow-md tracking-wide transition"
            >
              Add
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ServiceApproval; 