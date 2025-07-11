import React from 'react';
import { X } from 'lucide-react';

const ServicesModal = ({ open, onClose, services, title = 'All Services' }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end md:items-center justify-center">
      <div className="bg-white w-full md:w-[600px] rounded-t-3xl md:rounded-3xl p-6 md:p-10 shadow-2xl relative animate-fadeIn">
        <button
          className="absolute top-4 right-4 bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
        <div className="grid grid-cols-3 gap-4">
          {services.map((cat) => (
            <div key={cat.name} className="flex flex-col items-center">
              <img src={cat.img} alt={cat.name} className="w-20 h-20 rounded-full object-cover mb-2" />
              <span className="text-sm font-semibold text-gray-800 text-center">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesModal;