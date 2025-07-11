import React, { useState } from 'react';
import { ArrowLeft, Share2, Search, Menu, X } from 'lucide-react';
import ServicesModal from '../Components/ServicesModal';
import ServiceCards from '../Components/ServiceCards';

const HairStudio = () => {
    const [activeCategory, setActiveCategory] = useState('Hair Cut');
    const [activeSubCategory, setActiveSubCategory] = useState('Top Selling');
    const [showAllServices, setShowAllServices] = useState(false);

    const categories = [
        { name: 'Hair Cut', img: 'https://picsum.photos/seed/haircut/100/100' },
        { name: 'Hair Color', img: 'https://picsum.photos/seed/haircolor/100/100' },
        { name: 'Hair Styling', img: 'https://picsum.photos/seed/hairstyling/100/100' },
        { name: 'Hair Treatment', img: 'https://picsum.photos/seed/hairtreatment/100/100' },
        { name: 'Hair Spa', img: 'https://picsum.photos/seed/hairspa/100/100' },
    ];

    const subCategories = ['Top Selling', 'Hair Cuts', 'Hair Colors', 'Hair Treatments'];

    const services = {
        'Top Selling': [
            {
                bestseller: true,
                title: 'Hair Cut & Style',
                time: '1-2 hrs',
                price: 500,
                originalPrice: 800,
                discount: '37% OFF',
                bookings: '3K+ people booked this in last 30 days',
                description: 'Professional hair cut and styling',
                image: 'https://picsum.photos/seed/haircut-style/200/200'
            },
            {
                title: 'Hair Color & Highlights',
                time: '2-3 hrs',
                price: 1200,
                originalPrice: 1800,
                discount: '33% OFF',
                details: [
                    'Professional hair coloring',
                    'Highlights and lowlights'
                ],
                image: 'https://picsum.photos/seed/hair-color/200/200'
            }
        ],
        'Hair Cuts': [
            {
                mustTry: true,
                title: 'Premium Hair Cut',
                time: '1.5-2 hrs',
                price: 800,
                originalPrice: 1200,
                discount: '33% OFF',
                bookings: '2K+ people booked this in last 30 days',
                details: [
                    'Professional hair cut',
                    'Wash and style included'
                ],
                image: 'https://picsum.photos/seed/premium-haircut/200/200'
            }
        ]
    };

    const allServices = [
        { name: 'Hair Cut', img: 'https://images.unsplash.com/photo-1498843053639-170ff2122f35?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: 'Hair Color', img: 'https://plus.unsplash.com/premium_photo-1683133990522-4155deaacbbb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: 'Hair Styling', img: 'https://images.unsplash.com/photo-1498843053639-170ff2122f35?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: 'Hair Treatment', img: 'https://images.unsplash.com/photo-1498843053639-170ff2122f35?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: 'Hair Spa', img: 'https://images.unsplash.com/photo-1498843053639-170ff2122f35?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    ];

    return (
        <div className="bg-gray-50 min-h-screen font-sans pb-14">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10 p-4 flex items-center justify-between">
                <button>
                    <ArrowLeft />
                </button>
                <h1 className="font-bold text-xl">Hair Studio</h1>
                <button>
                    <Share2 />
                </button>
            </header>

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
                        <ServiceCards services={services['Hair Cuts'] || []} />
                    </div>

                    {/* Add On Section */}
                    <div className="mb-4">
                        <h2 className="font-bold text-xl mb-2">Add On</h2>
                        <ServiceCards services={services[activeSubCategory] || []} />
                    </div>
                </div>

                {/* Bottom Search and Menu */}
                <footer className="fixed bottom-0 left-0 right-0 bg-white py-2 px-3 shadow-top z-10 flex items-center justify-between gap-3">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search for 'Hair Cut'"
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

export default HairStudio; 