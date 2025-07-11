import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, HelpCircle, Home as HomeIcon, Stethoscope, CalendarCheck2, Share2, Instagram, Facebook, Twitter, Youtube, Star, Heart, ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import ServicesModal from '../Components/ServicesModal';

// Carousel Images
const carouselImages = [
  'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

const promoImg = 'https://plus.unsplash.com/premium_photo-1684407616442-8d5a1b7c978e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

// Service Categories
const services = [
  { name: 'Salon At Home', img: 'https://images.unsplash.com/photo-1498843053639-170ff2122f35?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', path: '/salon-at-home' },
  { name: 'Makeup At Home', img: 'https://plus.unsplash.com/premium_photo-1683133990522-4155deaacbbb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', path: '/makeup-at-home' },
  { name: 'Pre Bridal', img: 'https://plus.unsplash.com/premium_photo-1679522617451-30ad4b62cf84?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', path: '/pre-bridal' },
  { name: 'Hair Studio', img: 'https://images.unsplash.com/photo-1498843053639-170ff2122f35?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', path: '/hair-studio' },
  { name: 'Make your package', img: 'https://plus.unsplash.com/premium_photo-1683133990522-4155deaacbbb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', path: '/make-your-package' },
];

// Trending Services
const trendingTabs = ['Trending Services', 'Spa At Home', 'Hydra Facials'];
const trendingServices = [
  { title: 'Swedish Stress Relief Massage', subtitle: 'Stress Relief Care', price: '₹880', img: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&w=200', tag: 'Add to Cart', offer: '20% OFF', rating: 4.8, reviews: 120 },
  { title: 'Hydra Facial', subtitle: 'Glow & Hydrate', price: '₹1200', img: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&w=200', tag: 'Add to Cart', offer: '', rating: 4.9, reviews: 98 },
];

const ServiceCard = ({ img, title, subtitle, price, tag, offer, rating, reviews }) => (
  <div className="bg-gray-100 rounded-xl shadow-sm flex flex-col h-full transition hover:shadow-lg relative">
    <button className="absolute top-3 right-3 p-1 rounded-full bg-white hover:bg-gray-100 shadow text-gray-400">
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
    </button>
    <img src={img} alt={title} className="w-full h-40 object-contain p-4" />
    <div className="flex-1 flex flex-col px-4 pb-4">
      <div className="font-semibold text-base mt-2">{title}</div>
      <div className="text-xs text-gray-500 mb-1">{subtitle}</div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-pink-600 font-bold">{price}</span>
        {offer && <span className="text-xs text-green-500 font-semibold">{offer}</span>}
      </div>
      <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
        <span className="text-pink-600 font-bold">★ {rating}</span>
        <span>({reviews})</span>
      </div>
      <button className="mt-1 self-start bg-pink-500 hover:bg-pink-600 text-white text-xs font-semibold px-4 py-1 rounded-full transition shadow-sm">
        {tag}
      </button>
    </div>
  </div>
);

// Contact/Social
const navLinks = [
  { name: 'Home', icon: <HomeIcon className="w-6 h-6" />, href: '#' },
  { name: 'Consultation', icon: <Stethoscope className="w-6 h-6" />, href: '#' },
  { name: 'Booking', icon: <CalendarCheck2 className="w-6 h-6" />, href: '#' },
  { name: 'Refer', icon: <Share2 className="w-6 h-6" />, href: '#' },
];

// Add this array for all services (replace images as needed)
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

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [activeTrending, setActiveTrending] = useState(0);
  const [showAllServices, setShowAllServices] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans pb-14 md:pb-0">
      {/* Carousel Section */}
      <div className="relative w-full h-56 sm:h-72 md:h-[32rem] overflow-hidden mb-4 sm:mb-6">
        {carouselImages.map((img, idx) => (
          <img
            key={img}
            src={img}
            alt={`Slide ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${current === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            style={{ transition: 'opacity 1s' }}
          />
        ))}
        {/* Carousel indicators as underscores */}
        <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-4 flex gap-1 z-20">
          {carouselImages.map((_, idx) => (
            <span
              key={idx}
              className={`text-lg sm:text-2xl md:text-3xl leading-none select-none transition-all ${current === idx ? 'text-pink-500 font-extrabold' : 'text-gray-300 font-bold'}`}
            >
              _
            </span>
          ))}
        </div>
      </div>

      {/* Service Categories */}
      <section className="mt-0 px-2 sm:px-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-base sm:text-lg font-semibold text-pink-800">What are you looking for?</h3>
          <button className="text-xs text-pink-500 hover:underline">See More</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
          {services.map((service) => (
            <Link
              to={service.path}
              key={service.name}
              className="flex flex-col items-center cursor-pointer group"
            >
              <img
                src={service.img}
                alt={service.name}
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover rounded-2xl mb-2 sm:mb-4 group-hover:scale-105 transition"
              />
              <span className="text-base sm:text-xl font-bold text-pink-700 group-hover:text-pink-900 transition text-center">{service.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Promotional Section */}
      <section className="mt-6 sm:mt-8 px-2 sm:px-4 pb-4 sm:pb-6">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg">
          <img src={promoImg} alt="Promo" className="w-full h-32 sm:h-40 md:h-56 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-pink-500/80 via-pink-500/50 to-transparent flex items-center justify-center">
            <h2 className="w-full text-center text-base sm:text-lg md:text-2xl font-extrabold text-white drop-shadow-lg">MAKE-UP ITEMS THAT YOU<br /> MUST HAVE</h2>
          </div>
        </div>
      </section>

      {/* Trending Services */}
      <section className="w-full max-w-[1400px] mx-auto bg-white rounded-2xl shadow p-2 sm:p-4 md:p-6 mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <h3 className="text-base font-semibold">Trending Services</h3>
          <span className="text-pink-500 text-xl sm:text-2xl font-bold select-none">↷</span>
        </div>
        <div className="flex gap-1 sm:gap-2 mb-2 sm:mb-4 overflow-x-auto scrollbar-hide">
          {trendingTabs.map((tab, idx) => (
            <button
              key={tab}
              onClick={() => setActiveTrending(idx)}
              className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold transition ${activeTrending === idx ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
          {trendingServices.map((service, idx) => (
            <ServiceCard key={idx} {...service} />
          ))}
        </div>
      </section>

      {/* Promo Card (standalone, wider and visually balanced) */}
      <section className="w-full flex justify-center mt-8 sm:mt-12 mb-6 sm:mb-8 px-2">
        <div className="w-full max-w-2xl sm:max-w-4xl rounded-2xl shadow-lg bg-white overflow-hidden flex flex-col md:flex-row items-center p-4 sm:p-8 gap-4 sm:gap-8 relative">
          <div className="flex-1 min-w-[120px] sm:min-w-[220px]">
            <div className="text-xs font-bold text-pink-500 mb-1">NEW</div>
            <div className="text-lg sm:text-2xl font-extrabold text-pink-800 leading-tight mb-2">Strip-less Korean wax for intimate area waxing</div>
            <ul className="text-xs sm:text-sm text-pink-700 mb-2 list-disc list-inside">
              <li>Softens & Lightens</li>
              <li>Ultra-Luxurious Formula</li>
              <li>Infused with Goji Berry & Oatmeal</li>
            </ul>
          </div>
          <div className="flex-shrink-0">
            <img src="https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Promo" className="w-24 h-24 sm:w-40 sm:h-40 object-cover rounded-xl" />
          </div>
          <button className="absolute right-4 sm:right-6 top-4 sm:top-6 md:static md:ml-4 bg-pink-500 text-white rounded-full p-2 shadow hover:bg-pink-600 transition">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        </div>
      </section>
      {/* Bottom Navigation (mobile only) */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-pink-100 flex justify-around items-center py-2 md:hidden z-30">
        {navLinks.map((link) => (
          <a key={link.name} href={link.href} className="flex flex-col items-center text-pink-600 hover:text-pink-800 transition">
            {link.icon}
            <span className="text-xs mt-0.5">{link.name}</span>
          </a>
        ))}
      </nav>

      {/* All Services Modal */}
      <ServicesModal open={showAllServices} onClose={() => setShowAllServices(false)} services={allServices} title="All Services" />
    </div>
  );
};

export default Home;