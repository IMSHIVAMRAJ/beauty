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
            key={service.id || service.title || service.name}
            className="bg-white rounded-xl shadow-md mb-4 w-80 min-w-[20rem] flex flex-col cursor-pointer hover:shadow-lg transition"
            onClick={() => handleCardClick(service)}
          >
            <div className="w-full h-40 bg-gray-100 flex items-center justify-center rounded-t-xl overflow-hidden">
              <img src={service.image || service.img} alt={service.title || service.name} className="object-cover w-full h-full" />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              {service.bestseller && <span className="text-[10px] font-bold text-green-600 rounded-full">BESTSELLER</span>}
              {service.mustTry && <span className="text-[10px] font-bold text-pink-600 rounded-full">MUST TRY</span>}
              <h3 className="font-bold text-lg mt-2">{service.title || service.name}</h3>
              {service.time && <p className="text-gray-500 text-sm">{service.time}</p>}
              <div className="flex items-center gap-2 my-2">
                {service.price && <p className="font-bold text-black">₹{service.price}</p>}
                {service.originalPrice && <p className="text-gray-400 line-through">₹{service.originalPrice}</p>}
                {service.discount && <p className="text-green-600 font-bold">{service.discount}</p>}
              </div>
              {service.bookings && <p className="text-blue-600 text-sm font-semibold">{service.bookings}</p>}
              {service.description && <p className="text-gray-600 text-sm mt-2">• {service.description}</p>}
              {service.details && (
                <ul className="list-disc list-inside text-gray-600 text-sm mt-2">
                  {service.details.map((d) => <li key={d}>{d}</li>)}
                </ul>
              )}
              <div className="flex justify-between items-center mt-4">
                <a href="#" className="text-sm font-bold text-gray-700 hover:underline">VIEW DETAILS</a>
                <Share2 className="w-5 h-5 text-gray-500" />
              </div>
              <button
                className="mt-2 px-8 py-1 bg-white border border-pink-500 text-pink-500 rounded-lg font-bold hover:bg-pink-50 self-end"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart({
                    id: service.id || service.title || service.name,
                    name: service.title || service.name,
                    price: service.price,
                    duration: service.time || service.duration,
                    originalPrice: service.originalPrice,
                    discount: service.discount,
                    description: service.description,
                    details: service.details,
                    image: service.image || service.img,
                    subtitle: service.subtitle,
                    bestseller: service.bestseller,
                    mustTry: service.mustTry
                  });
                }}
              >
                ADD
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Modal for service details */}
      {openModal && selectedService && (() => {
        // Inject fake data for demo if missing
        const fakeService = { ...selectedService };
        if (!fakeService.subtitle) fakeService.subtitle = '9 Steps Facial | Includes Free Silicone Facial Brush';
        if (!fakeService.keyIngredients) fakeService.keyIngredients = [
          { name: 'YUZU', img: 'https://cdn-icons-png.flaticon.com/512/415/415733.png', desc: 'Evens out skin tone' },
          { name: 'GINSENG', img: 'https://cdn-icons-png.flaticon.com/512/415/415734.png', desc: 'Promotes collagen production in skin' },
          { name: 'BIRCH JUICE', img: 'https://cdn-icons-png.flaticon.com/512/415/415735.png', desc: 'Brightens the skin & restores natural glow' },
          { name: 'LICORICE ROOT', img: 'https://cdn-icons-png.flaticon.com/512/415/415736.png', desc: 'Helps with dark spots, hyperpigmentation & sun damage' },
        ];
        if (!fakeService.benefits) fakeService.benefits = [
          'Brightens & lightens skin tone.',
          'Improves skin texture.',
          'Gives smooth, clear & glowing skin.',
          'Promotes hydrated and healthy skin.'
        ];
        if (!fakeService.description) fakeService.description = 'A luxurious facial treatment for glowing, healthy skin.';
        return (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
            <div className="bg-white rounded-3xl shadow-2xl relative animate-fadeIn max-w-lg w-full mx-4 p-8 flex flex-col items-center" style={{minWidth: 320}}>
              <button
                className="absolute top-6 right-6 bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition"
                onClick={handleCloseModal}
                aria-label="Close"
              >
                <X className="w-7 h-7" />
              </button>
              <h2 className="text-2xl font-extrabold mb-2 text-center w-full">{fakeService.title || fakeService.name}</h2>
              {fakeService.subtitle && <div className="text-gray-500 text-base mb-1 w-full text-left">{fakeService.subtitle}</div>}
              {fakeService.time && <div className="text-gray-400 text-base mb-2 w-full text-left">{fakeService.time}</div>}
              <div className="flex items-center gap-3 mb-6 w-full text-left">
                <span className="text-2xl font-bold text-black">₹{fakeService.price}</span>
                {fakeService.originalPrice && <span className="text-gray-400 line-through text-lg">₹{fakeService.originalPrice}</span>}
                {fakeService.discount && <span className="text-green-600 font-bold text-lg">{fakeService.discount}</span>}
              </div>
              {/* Key Ingredients */}
              {fakeService.keyIngredients && (
                <div className="w-full mb-4">
                  <div className="font-bold text-base mb-2">KEY INGREDIENTS</div>
                  <div className="grid grid-cols-2 gap-3 mb-2">
                    {fakeService.keyIngredients.map((ing, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <img src={ing.img} alt={ing.name} className="w-10 h-10 rounded-full object-cover border" />
                        <div>
                          <div className="font-bold text-xs text-pink-700 uppercase">{ing.name}</div>
                          <div className="text-xs text-gray-700">{ing.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Benefits */}
              {fakeService.benefits && (
                <div className="w-full mb-4">
                  <div className="font-bold text-base mb-1">Benefits</div>
                  <ul className="list-disc list-inside text-gray-700 text-sm">
                    {fakeService.benefits.map((b, idx) => <li key={idx}>{b}</li>)}
                  </ul>
                </div>
              )}
              {/* Description */}
              {fakeService.description && (
                <div className="w-full mb-4">
                  <div className="font-bold text-base mb-1">Description</div>
                  <div className="text-gray-700 text-sm">{fakeService.description}</div>
                </div>
              )}
              <div className="flex w-full gap-3 mt-2">
                <button
                  className="flex-1 py-3 rounded-lg font-bold text-white bg-pink-500 hover:bg-pink-600 transition text-lg"
                  onClick={() => {
                    addToCart({
                      id: fakeService.id || fakeService.title || fakeService.name,
                      name: fakeService.title || fakeService.name,
                      price: fakeService.price,
                      duration: fakeService.time || fakeService.duration,
                      originalPrice: fakeService.originalPrice,
                      discount: fakeService.discount,
                      description: fakeService.description,
                      details: fakeService.details,
                      image: fakeService.image || fakeService.img,
                      subtitle: fakeService.subtitle,
                      bestseller: fakeService.bestseller,
                      mustTry: fakeService.mustTry
                    });
                    handleCloseModal();
                  }}
                >
                  Add To Cart
                </button>
                <button className="flex-1 py-3 rounded-lg font-bold text-gray-400 bg-gray-100 cursor-not-allowed text-lg" disabled>Done</button>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
};

export default ServiceCards;

