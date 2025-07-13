import React, { useEffect, useState } from "react";
import axios from "axios";
import ServiceCards from "../Components/ServiceCards";

const MakeupAtHome = () => {
  const [allServices, setAllServices] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  useEffect(() => {
    fetchSalonServices();
  }, []);

  const fetchSalonServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/services/allservices");
      const salonServices = res.data.filter(service => service.category === "Makeup At Home");

      setAllServices(salonServices);

      // Unique subcategories with their image
      const uniqueSubCats = {};
      salonServices.forEach(service => {
        if (!uniqueSubCats[service.subcategory]) {
          uniqueSubCats[service.subcategory] = service.categoryImage;
        }
      });

      const finalSubCategories = Object.entries(uniqueSubCats).map(([name, image]) => ({
        name,
        image
      }));

      setSubCategories(finalSubCategories);
      setSelectedSubCategory(finalSubCategories[0]?.name || "");
    } catch (err) {
      console.error("Error fetching services:", err.message);
    }
  };

  const filteredServices = allServices.filter(
    s => s.subcategory === selectedSubCategory
  );

  return (
    <div className="p-4 bg-gray-50 min-h-screen pb-20">
      <h1 className="text-xl font-bold text-center mb-4">Makeup At Home</h1>

      {/* Horizontal Subcategories */}
      <div className="flex overflow-x-auto gap-4 mb-6 scrollbar-hide">
        {subCategories.map((sub, i) => {
          const isActive = selectedSubCategory === sub.name;
          return (
            <button
              key={i}
              onClick={() => setSelectedSubCategory(sub.name)}
              className={`flex-shrink-0 w-24 flex flex-col items-center justify-center border-2 ${
                isActive ? "border-pink-600" : "border-gray-200"
              } rounded-xl p-2`}
            >
              <img
                src={sub.image}
                alt={sub.name}
                className="w-14 h-14 object-cover rounded-lg mb-1"
              />
              <p
                className={`text-sm text-center font-medium ${
                  isActive ? "text-pink-600" : "text-gray-700"
                }`}
              >
                {sub.name}
              </p>
              {isActive && <div className="h-1 w-6 bg-pink-600 rounded-full mt-1" />}
            </button>
          );
        })}
      </div>

      {/* Service Cards */}
      <h2 className="text-lg font-bold mb-2">{selectedSubCategory}</h2>
      <ServiceCards services={filteredServices} />
    </div>
  );
};

export default MakeupAtHome;
