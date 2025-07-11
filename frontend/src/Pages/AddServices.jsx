import React, { useState } from 'react';
import { ArrowLeft, Share2, Search, Menu, X } from 'lucide-react';
import ServicesModal from '../Components/ServicesModal';
import ServiceCards from '../Components/ServiceCards';

const AddServices = () => {
    const [activeCategory, setActiveCategory] = useState('Waxing');
    const [activeSubCategory, setActiveSubCategory] = useState('Top Selling');
    const [showAllServices, setShowAllServices] = useState(false);

    const categories = [
        { name: 'Make Your Own Package', img: 'https://picsum.photos/seed/package/100/100' },
        { name: 'Weekday Offers', img: 'https://picsum.photos/seed/offers/100/100' },
        { name: 'Waxing', img: 'https://picsum.photos/seed/waxing/100/100' },
        { name: 'Facial', img: 'https://picsum.photos/seed/facial/100/100' },
        { name: 'Manicure', img: 'https://picsum.photos/seed/manicure/100/100' },
    ];

    const subCategories = ['Top Selling', 'Roll On Wax', 'Rica Wax (Tin)', 'Body Polish'];

    const services = {
        'Top Selling': [
            {
                bestseller: true,
                title: 'Eyebrows',
                time: '5 mins',
                price: 30,
                originalPrice: 50,
                discount: '40% OFF',
                bookings: '5K+ people booked this in last 30 days',
                description: 'For maintaining/shaping brows look',
                image: 'https://picsum.photos/seed/eyebrows/200/200'
            },
            {
                title: 'Quick Wax - Roll On Wax',
                time: '1 hr 13 mins',
                price: 795,
                originalPrice: 1600,
                discount: '50% OFF',
                details: [
                    'Jasmine Cirephil Roll-On Wax - Full Arms + Half Legs',
                    'Sokora Korean Bean Wax - Underarms'
                ],
                image: 'https://picsum.photos/seed/quickwax/200/200'
            }
        ],
        'Roll On Wax': [
            {
                mustTry: true,
                title: 'Waxology - Roll On Wax',
                time: '1 hr 22 mins',
                price: 849,
                originalPrice: 1799,
                discount: '52% OFF',
                bookings: '8K+ people booked this in last 30 days',
                details: [
                    'Jasmine Cirepil Roll-On Wax - Full Arms + Full Legs'
                ],
                image: 'https://picsum.photos/seed/waxology/200/200'
            }
        ]
    };

    const allServices = [
        { name: 'Make Your Package', img: 'https://images.unsplash.com/photo-1498843053639-170ff2122f35?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: 'Weekday Offers', img: 'https://images.unsplash.com/photo-1498843053639-170ff2122f35?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: 'Waxing', img: 'https://images.unsplash.com/photo-1498843053639-170ff2122f35?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: 'Facial', img: 'https://plus.unsplash.com/premium_photo-1683133990522-4155deaacbbb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: 'Mani-Pedi', img: 'https://images.unsplash.com/photo-1498843053639-170ff2122f35?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: 'Clean-Up', img: 'https://images.unsplash.com/photo-1498843053639-170ff2122f35?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: 'Bleach & Detan', img: 'https://images.unsplash.com/photo-1498843053639-170ff2122f35?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: 'Hair', img: 'https://images.unsplash.com/photo-1498843053639-170ff2122f35?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: 'Body Polishing', img: 'https://images.unsplash.com/photo-1498843053639-170ff2122f35?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: 'Threading', img: 'https://images.unsplash.com/photo-1498843053639-170ff2122f35?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: 'Insta Light', img: 'https://images.unsplash.com/photo-1498843053639-170ff2122f35?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    ];

    return (
        <div className="bg-gray-50 min-h-screen font-sans pb-14">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10 p-4 flex items-center justify-between">
                <button>
                    <ArrowLeft />
                </button>
                <h1 className="font-bold text-xl">Salon At Home</h1>
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
                {!(activeCategory === 'Make Your Own Package' || activeCategory === 'Weekday Offers') && (
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
                )}

                <div className="p-4">
                    {/* Top Selling/Featured Section */}
                    {!(activeCategory === 'Make Your Own Package' || activeCategory === 'Weekday Offers') && (
                        <div className="mb-6">
                            <h2 className="font-bold text-xl mb-2">Top Selling</h2>
                            <ServiceCards services={services['Roll On Wax'] || []} />
                        </div>
                    )}

                    {/* Add On Section */}
                    <div className="mb-4">
                        <h2 className="font-bold text-xl mb-2">{activeCategory === 'Make Your Own Package' ? 'Your Package' : activeCategory === 'Weekday Offers' ? 'Weekday Offers' : 'Add On'}</h2>
                        {activeCategory === 'Make Your Own Package' ? (
                            <div className="bg-white rounded-xl shadow-md mb-4 w-96 min-w-[24rem] p-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs font-bold">Package</span>
                                    <span className="text-green-700 flex items-center gap-1 text-xs font-bold"><svg width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'><path d='M9 12l2 2 4-4'/><circle cx='12' cy='12' r='10'/></svg> MYOP</span>
                                </div>
                                <h3 className="font-bold text-2xl mb-1">All In One Salon Care</h3>
                                <p className="text-gray-500 mb-2">Combination of Multiple Services</p>
                                <ul className="list-disc list-inside text-black mb-2">
                                    <li><span className="font-semibold">4 hrs 15 mins</span></li>
                                </ul>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl font-bold">₹2,893</span>
                                    <span className="text-gray-400 line-through">₹6,148</span>
                                    <span className="text-green-700 font-bold flex items-center gap-1"><svg width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'><path d='M9 12l2 2 4-4'/><circle cx='12' cy='12' r='10'/></svg> 52% OFF</span>
                                </div>
                                <div className="text-sky-600 font-bold mb-2">34K+ people booked this in last 30 days</div>
                                <hr className="my-2" />
                                <ul className="list-disc list-inside text-gray-800 mb-4">
                                    <li><span className="font-bold">Waxing:</span> Full Arms, Full Legs & Underarms (Rica)</li>
                                    <li><span className="font-bold">Premium Facial:</span> Korean Glow Facial (Korean Glow Facial)</li>
                                    <li><span className="font-bold">Manicure & Pedicure:</span> Mani-Pedi Combo (Korean Luxe Mani & pedi)</li>
                                    <li><span className="font-bold">Facial Hair Removal :</span> Eyebrows (Threading)</li>
                                </ul>
                                <div className="flex gap-2">
                                    <button className="border border-pink-700 text-pink-700 font-bold px-6 py-2 rounded-lg hover:bg-pink-50 transition flex items-center gap-2">EDIT PACKAGE <span>&rarr;</span></button>
                                    <button className="px-8 py-2 bg-white border border-pink-500 text-pink-500 rounded-lg font-bold hover:bg-pink-50">ADD</button>
                                </div>
                            </div>
                        ) : activeCategory === 'Weekday Offers' ? (
                            <ServiceCards services={services[activeSubCategory] || []} horizontal={true} />
                        ) : (
                            <ServiceCards services={services[activeSubCategory] || []} />
                        )}
                    </div>


                    {/* Banner Section */}
                    <div className="bg-blue-50 rounded-lg flex items-stretch shadow-md overflow-hidden my-6 h-32">
                        <div className="w-[30%] min-w-[72px] h-32 flex items-center justify-center">
                            <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Hydra Facials" className="w-full h-full object-cover rounded-l-lg" />
                        </div>
                        <div className="flex-1 flex flex-col justify-center px-2 py-0">
                            <span className="text-base sm:text-lg font-semibold text-gray-700">Explore <span className="font-bold text-blue-900">Dermat Recommended<br/>Hydra Facials</span> <span className="inline-block align-middle ml-1">&rarr;</span></span>
                        </div>
                    </div>
                </div>

                {/* Footer component (not the fixed search/menu) */}
                {/* Removed Navbar and Footer */}

                {/* Bottom Search and Menu */}
                <footer className="fixed bottom-0 left-0 right-0 bg-white py-2 px-3 shadow-top z-10 flex items-center justify-between gap-3">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search for 'Threading'"
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

export default AddServices;
