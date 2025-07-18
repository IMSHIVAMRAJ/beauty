import React, { useState } from 'react';
import { ArrowLeft, Share2, Search, Menu, X, Plus, Minus } from 'lucide-react';
import ServicesModal from '../Components/ServicesModal';
import ServiceCards from '../Components/ServiceCards';

const MakeYourPackage = () => {
    const [activeCategory, setActiveCategory] = useState('Popular');
    const [activeSubCategory, setActiveSubCategory] = useState('Top Selling');
    const [showAllServices, setShowAllServices] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);

    const categories = [
        { name: 'Popular', img: 'https://picsum.photos/seed/popular/100/100' },
        { name: 'Bridal', img: 'https://picsum.photos/seed/bridal/100/100' },
        { name: 'Party', img: 'https://picsum.photos/seed/party/100/100' },
        { name: 'Wellness', img: 'https://picsum.photos/seed/wellness/100/100' },
        { name: 'Custom', img: 'https://picsum.photos/seed/custom/100/100' },
    ];

    const subCategories = ['Top Selling', 'Popular Packages', 'Custom Packages', 'Wellness Packages'];

    const services = {
        'Top Selling': [
            {
                bestseller: true,
                title: 'Bridal Package',
                time: '4-5 hrs',
                price: 3500,
                originalPrice: 6000,
                discount: '42% OFF',
                bookings: '2K+ people booked this in last 30 days',
                description: 'Complete bridal package with makeup & hair',
                image: 'https://picsum.photos/seed/bridal-package/200/200',
                services: ['Bridal Makeup', 'Hair Styling', 'Nail Art', 'Saree Draping']
            },
            {
                title: 'Party Package',
                time: '2-3 hrs',
                price: 1200,
                originalPrice: 2000,
                discount: '40% OFF',
                details: [
                    'Party makeup and hair styling',
                    'Nail art included'
                ],
                image: 'https://picsum.photos/seed/party-package/200/200',
                services: ['Party Makeup', 'Hair Styling', 'Nail Art']
            }
        ],
        'Popular Packages': [
            {
                mustTry: true,
                title: 'Wellness Package',
                time: '3-4 hrs',
                price: 2000,
                originalPrice: 3500,
                discount: '43% OFF',
                bookings: '1.5K+ people booked this in last 30 days',
                details: [
                    'Complete wellness package',
                    'Spa and massage included'
                ],
                image: 'https://picsum.photos/seed/wellness-package/200/200',
                services: ['Facial', 'Hair Spa', 'Manicure', 'Pedicure']
            }
        ]
    };

    const allServices = [
        { name: 'Popular', img: 'https://images.unsplash.com/photo-1498843053639-170ff2122f35?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: 'Bridal', img: 'https://plus.unsplash.com/premium_photo-1683133990522-4155deaacbbb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: 'Party', img: 'https://images.unsplash.com/photo-1498843053639-170ff2122f35?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: 'Wellness', img: 'https://images.unsplash.com/photo-1498843053639-170ff2122f35?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: 'Custom', img: 'https://images.unsplash.com/photo-1498843053639-170ff2122f35?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    ];

    const addToPackage = (service) => {
        setSelectedServices(prev => [...prev, service]);
    };

    const removeFromPackage = (serviceId) => {
        setSelectedServices(prev => prev.filter(s => s.id !== serviceId));
    };

    const getTotalPrice = () => {
        return selectedServices.reduce((total, service) => total + service.price, 0);
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans pb-14">
            {/* Main Content */}
            <main>
                {/* Categories */}
                <section className="bg-white p-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    <div className="flex gap-x-6">
                        {categories.map((cat) => {
                            const isActive = activeCategory === cat.name;
                            return (
                                <button
                                    key={cat.name}
                                    onClick={() => setActiveCategory(cat.name)}
                                    className="flex flex-col items-center w-24 bg-transparent border-none outline-none focus:outline-none"
                                    style={{ background: 'none', boxShadow: 'none', padding: 0 }}
                                >
                                    <div className="w-20 h-20 flex items-center justify-center">
                                        <img src={cat.img} alt={cat.name} className="w-16 h-16 object-contain rounded-xl" />
                                    </div>
                                    <span className={`mt-2 block text-center text-sm font-semibold whitespace-normal ${isActive ? 'text-pink-700 font-bold' : 'text-gray-700'}`}>{cat.name}</span>
                                    {isActive && <div className="w-10 h-1 bg-pink-700 rounded-full mt-1" />}
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* Sub-categories */}
                <section className="bg-white p-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    <div className="flex gap-3">
                        {subCategories.map(subCat => (
                            <button
                                key={subCat}
                                onClick={() => setActiveSubCategory(subCat)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold ${activeSubCategory === subCat ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                {subCat}
                            </button>
                        ))}
                    </div>
                </section>

                <div className="p-4">
                    {/* Top Selling/Featured Section */}
                    <div className="mb-6">
                        <h2 className="font-bold text-xl mb-2">Top Selling</h2>
                        <ServiceCards services={services['Popular Packages'] || []} />
                    </div>

                    {/* Add On Section */}
                    <div className="mb-4">
                        <h2 className="font-bold text-xl mb-2">Add On</h2>
                        <ServiceCards services={services[activeSubCategory] || []} />
                    </div>

                    {/* Selected Services */}
                    {selectedServices.length > 0 && (
                        <div className="mb-4 bg-white rounded-lg p-4">
                            <h3 className="font-bold text-lg mb-3">Your Package</h3>
                            {selectedServices.map((service, index) => (
                                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                                    <div>
                                        <p className="font-semibold">{service.title}</p>
                                        <p className="text-sm text-gray-600">₹{service.price}</p>
                                    </div>
                                    <button
                                        onClick={() => removeFromPackage(service.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            <div className="mt-3 pt-3 border-t border-gray-200">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-lg">Total:</span>
                                    <span className="font-bold text-lg text-pink-600">₹{getTotalPrice()}</span>
                                </div>
                                <button className="w-full mt-3 bg-pink-500 text-white py-2 rounded-lg font-semibold hover:bg-pink-600">
                                    Book Package
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Search and Menu */}
                <footer className="fixed bottom-0 left-0 right-0 bg-white py-2 px-3 shadow-top z-10 flex items-center justify-between gap-3">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search for 'Package'"
                            className="w-full bg-gray-100 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                        />
                    </div>
                    <button
                        className="bg-black text-white px-6 py-2 rounded-lg flex items-center gap-2 font-semibold"
                        onClick={() => setShowAllServices(true)}
                    >
                        <Menu className="w-5 h-5" />
                        Menu
                    </button>
                </footer>

                {/* All Services Modal */}
                <ServicesModal open={showAllServices} onClose={() => setShowAllServices(false)} services={allServices} title="All Services" />
            </main>
        </div>
    );
}

export default MakeYourPackage; 