import React from 'react';
import { Share2 } from 'lucide-react';
import { useCart } from './CartContext';

const ServiceCards = ({ services = [] }) => {
  const { addToCart } = useCart();

  return (
    <div className="flex gap-x-6 overflow-x-auto scrollbar-hide pl-4 pr-4">
      {services.map((service) => (
        <div key={service.id || service.title || service.name} className="bg-white rounded-xl shadow-md mb-4 w-80 min-w-[20rem] flex flex-col">
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
              onClick={() => addToCart({
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
              })}
            >
              ADD
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceCards;

