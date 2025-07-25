import React, { useEffect, useState } from "react";
import axios from "axios";

const ServiceApproval = () => {
  const [services, setServices] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    category: '',
    subcategory: '',
    price: '',
    discount: '',
    descriptionPoints: '',
    precautionsAndAftercare: '',
    ingredients: '',
    mainImage: null,
    subImages: [],
    categoryImage: null,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("https://beauty-backend-dc5m.onrender.com/api/admin/getservices", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fetched = res.data.services || res.data;
      setServices(fetched);
    } catch (err) {
      console.error("Fetch error: ", err.response?.data || err.message);
    }
  };

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.patch(`https://beauty-backend-dc5m.onrender.com/api/admin/service/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(prev =>
        prev.map(s =>
          s._id === id ? { ...s, isApproved: true } : s
        )
      );
      alert("Service approved ✅");
    } catch (err) {
      console.error("Approval error:", err.response?.data || err.message);
      alert("Failed to approve service ❌");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`https://beauty-backend-dc5m.onrender.com/api/admin/service/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(prev => prev.filter(s => s._id !== id));
      alert("Service deleted ✅");
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      alert("Failed to delete service ❌");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "mainImage") {
      setForm(prev => ({ ...prev, mainImage: files[0] }));
    } else if (name === "subImages") {
      setForm(prev => ({ ...prev, subImages: Array.from(files) }));
    } else if (name === "categoryImage") {
      setForm(prev => ({ ...prev, categoryImage: files[0] }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("category", form.category);
    formData.append("subcategory", form.subcategory);
    formData.append("price", form.price);
    formData.append("discount", form.discount);
    formData.append("descriptionPoints", JSON.stringify(form.descriptionPoints.split(",")));
    formData.append("precautionsAndAftercare", JSON.stringify(form.precautionsAndAftercare.split(",")));
    formData.append("ingredients", JSON.stringify(form.ingredients.split(",")));
    formData.append("mainImage", form.mainImage);
    form.subImages.forEach(file => formData.append("subImages", file));
    if (form.categoryImage) {
      formData.append("categoryImage", form.categoryImage);
    }

    try {
      const token = localStorage.getItem("adminToken");
      await axios.post("https://beauty-backend-dc5m.onrender.com/api/admin/add-service", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Service added ✅");
      setShowAddModal(false);
      fetchServices();
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to add service ❌");
    }
  };

  const getFinalPrice = (price, discount) => {
    return price - (price * discount) / 100;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-black">Admin - Service Panel</h2>
        <button
          className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md font-medium"
          onClick={() => setShowAddModal(true)}
        >
          Add Service
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-pink-100 text-pink-700 font-semibold">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Subcategory</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Discount</th>
              <th className="py-3 px-4 text-left">Final Price</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.length > 0 ? services.map((s) => (
              <tr key={s._id} className="border-b hover:bg-pink-50">
                <td className="py-2 px-4">{s.name}</td>
                <td className="py-2 px-4">{s.category}</td>
                <td className="py-2 px-4">{s.subcategory}</td>
                <td className="py-2 px-4">₹{s.price}</td>
                <td className="py-2 px-4">{s.discount}%</td>
                <td className="py-2 px-4">₹{getFinalPrice(s.price, s.discount)}</td>
                <td className="py-2 px-4 capitalize">
                  {s.isApproved ? "Approved" : "Pending"}
                </td>
                <td className="py-2 px-4 text-center space-x-2">
                  {!s.isApproved && (
                    <button
                      onClick={() => handleApprove(s._id)}
                      className="text-green-600 hover:underline font-medium text-xs"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="text-red-600 hover:underline font-medium text-xs ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">No services found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowAddModal(false)}
          />
          <form
            onSubmit={handleFormSubmit}
            className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg max-h-[80vh] overflow-y-auto relative"
            encType="multipart/form-data"
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute top-3 right-4 w-8 h-8 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:text-pink-600 hover:border-pink-400 text-xl font-bold transition-colors"
              onClick={() => setShowAddModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4 text-black">Add New Service</h3>

            {["name", "category", "subcategory", "price", "discount"].map((field) => (
              <div className="mb-3" key={field}>
                <label className="block mb-1 font-medium capitalize">{field}</label>
                <input
                  type={field === "price" || field === "discount" ? "number" : "text"}
                  name={field}
                  value={form[field]}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
                  required
                />
              </div>
            ))}

            <div className="mb-3">
              <label className="block mb-1 font-medium">Description Points (comma separated)</label>
              <textarea
                name="descriptionPoints"
                value={form.descriptionPoints}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-pink-300"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1 font-medium">Precautions & Aftercare (comma separated)</label>
              <textarea
                name="precautionsAndAftercare"
                value={form.precautionsAndAftercare}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-pink-300"
                placeholder="e.g. No sun, Avoid bleach, Hydrate"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1 font-medium">Ingredients (comma separated)</label>
              <textarea
                name="ingredients"
                value={form.ingredients}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-pink-300"
                placeholder="e.g. Aloe Vera, Vitamin C"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1 font-medium">Main Image</label>
              <label className="inline-block cursor-pointer bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md font-medium transition mr-2">
                Choose File
                <input
                  type="file"
                  name="mainImage"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                  required
                />
              </label>
              {form.mainImage && (
                <span className="text-sm text-gray-700">{form.mainImage.name}</span>
              )}
            </div>

            <div className="mb-3">
              <label className="block mb-1 font-medium">Sub Images</label>
              <label className="inline-block cursor-pointer bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md font-medium transition mr-2">
                Choose Files
                <input
                  type="file"
                  name="subImages"
                  onChange={handleFileChange}
                  multiple
                  accept="image/*"
                  className="hidden"
                />
              </label>
              {form.subImages.length > 0 && (
                <span className="text-sm text-gray-700">{form.subImages.map(f => f.name).join(', ')}</span>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Category Image (Optional)</label>
              <label className="inline-block cursor-pointer bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md font-medium transition mr-2">
                Choose File
                <input
                  type="file"
                  name="categoryImage"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </label>
              {form.categoryImage && (
                <span className="text-sm text-gray-700">{form.categoryImage.name}</span>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-md text-black font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-pink-600 text-white px-4 py-2 rounded-md font-semibold"
              >
                Add Service
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ServiceApproval;
