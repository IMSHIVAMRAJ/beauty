import React, { useState } from 'react';
import { Share2, X } from 'lucide-react';
import { useCart } from './CartContext';

const ServiceCards = ({ services = [] }) => {
  const { addToCart } = useCart();
  const [openModal, setOpenModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleCardClick = (service) => {
    setSelectedService(service);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedService(null);
  };

  return (
    <>
      <div className="flex gap-x-6 overflow-x-auto scrollbar-hide pl-4 pr-4">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white rounded-xl shadow-md mb-4 w-80 min-w-[20rem] flex flex-col cursor-pointer hover:shadow-lg transition"
            onClick={() => handleCardClick(service)}
          >
            <div className="w-full h-40 bg-gray-100 flex items-center justify-center rounded-t-xl overflow-hidden">
              <img
                src={service.mainImage}
                alt={service.name}
                className="object-cover w-full h-full"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/300')}
              />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <h3 className="font-bold text-lg">{service.name}</h3>
              <p className="text-gray-500 text-sm mt-1">
                {service.descriptionPoints?.[0] || service.description || 'No description'}
              </p>
              <div className="flex items-center gap-2 my-2">
                <p className="text-gray-400 line-through">₹{service.price}</p>
                <p className="font-bold text-pink-600">₹{service.finalPrice}</p>
                <p className="text-green-600 font-semibold">{service.discount}</p>
              </div>
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm font-bold text-gray-700 hover:underline">
                  VIEW DETAILS
                </span>
                <Share2 className="w-5 h-5 text-gray-500" />
              </div>
              <button
                className="mt-3 px-6 py-2 bg-white border border-pink-500 text-pink-500 rounded-lg font-bold hover:bg-pink-50 self-end"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart({
                    id: service._id,
                    name: service.name,
                    price: service.finalPrice,
                    originalPrice: service.price,
                    discount: service.discount,
                    description: service.description,
                    image: service.mainImage
                  });
                }}
              >
                ADD
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {openModal && selectedService && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={handleCloseModal}
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={selectedService.mainImage || 'https://via.placeholder.com/300'}
              alt={selectedService.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/300')}
            />

            <h2 className="text-xl font-bold">{selectedService.name}</h2>

            <p className="text-sm text-gray-600 mt-2">
              {selectedService.descriptionPoints?.[0] || selectedService.description || 'No description'}
            </p>

            <div className="mt-4 flex items-center gap-3">
              <p className="text-lg font-bold text-pink-600">₹{selectedService.finalPrice}</p>
              <p className="text-gray-500 line-through">₹{selectedService.price}</p>
              <p className="text-green-600 font-semibold">{selectedService.discount}</p>
            </div>

            <div className="flex w-full gap-3 mt-6">
              <button
                className="flex-1 py-3 rounded-lg font-bold text-white bg-pink-500 hover:bg-pink-600 transition text-lg"
                onClick={() => {
                  addToCart({
                    id: selectedService._id,
                    name: selectedService.name,
                    price: selectedService.finalPrice,
                    originalPrice: selectedService.price,
                    discount: selectedService.discount,
                    description: selectedService.description,
                    image: selectedService.mainImage
                  });
                  handleCloseModal();
                }}
              >
                Add To Cart
              </button>
              <button
                className="flex-1 py-3 rounded-lg font-bold text-gray-400 bg-gray-100 text-lg cursor-not-allowed"
                disabled
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceCards;
