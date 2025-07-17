import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, HelpCircle, Home as HomeIcon, Stethoscope, CalendarCheck2, Share2, MessageCircle, Sparkles, Droplets } from 'lucide-react';
import ServicesModal from '../Components/ServicesModal';
import { useNavigate } from "react-router-dom";

const carouselImages = [
  'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

const services = [
  { name: 'Salon At Home', img: 'https://images.unsplash.com/photo-1498843053639-170ff2122f35?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', path: '/salon-at-home' },
  { name: 'Makeup At Home', img: 'https://plus.unsplash.com/premium_photo-1683133990522-4155deaacbbb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', path: '/makeup-at-home' },
  { name: 'Pre Bridal', img: 'https://plus.unsplash.com/premium_photo-1679522617451-30ad4b62cf84?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', path: '/pre-bridal' },
  { name: 'Hair Studio', img: 'https://images.unsplash.com/photo-1498843053639-170ff2122f35?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', path: '/hair-studio' },
  // { name: 'Make your package', img: 'https://plus.unsplash.com/premium_photo-1683133990522-4155deaacbbb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', path: '/make-your-package' },
];

const trendingTabs = ['Trending Services', 'Spa At Home', 'Hydra Facials'];

const navLinks = [
  { name: 'Home', icon: <HomeIcon className="w-6 h-6" />, href: '#' },
  { name: 'Consultation', icon: <Stethoscope className="w-6 h-6" />, href: '#' },
  { name: 'Booking', icon: <CalendarCheck2 className="w-6 h-6" />, href: '#' },
  { name: 'Refer', icon: <Share2 className="w-6 h-6" />, href: '#' },
];

const ServiceCard = ({ img, title, subtitle, price, tag, offer, rating, reviews }) => (
  <div className="bg-gray-100 rounded-xl shadow-sm flex flex-col h-full transition hover:shadow-lg relative">
    <button className="absolute top-3 right-3 p-1 rounded-full bg-white hover:bg-gray-100 shadow text-gray-400">
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
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

const Home = () => {

    const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [activeTrending, setActiveTrending] = useState(0);
  const [trendingServices, setTrendingServices] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/services/trending")
      .then((res) => setTrendingServices(res.data))
      .catch((err) => console.error("Error fetching trending services", err));
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans pb-14 md:pb-0">
      {/* Carousel */}
      <div className="relative w-full h-56 sm:h-72 md:h-[32rem] overflow-hidden mb-4 sm:mb-6">
        {carouselImages.map((img, idx) => (
          <img
            key={img}
            src={img}
            alt={`Slide ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${current === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          />
        ))}
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

      {/* Categories */}
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
          {trendingServices.length === 0 ? (
            <p className="col-span-full text-center text-gray-400">Loading services...</p>
          ) : (
            trendingServices.map((service, idx) => (
              <ServiceCard
                key={idx}
                img={service.mainImage}
                title={service.name}
                subtitle={service.subcategory}
                price={`₹${service.finalPrice}`}
                tag="Add to Cart"
                offer={`${service.discount}% OFF`}
                rating={4.9}
                reviews={120}
              />
            ))
          )}
        </div>
      </section>

      {/* AI-Based Consultant Section */}
      <section className="max-w-6xl mx-auto mt-10 mb-8 px-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-pink-700 mb-6 text-center tracking-tight drop-shadow">AI-Based Consultant</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Skincare Consultant Card */}
          <div className="bg-white/95 rounded-2xl shadow-xl border border-pink-200 p-8 flex flex-col items-center text-center">
            <Droplets className="w-12 h-12 text-[#E90000] mb-4" />
            <h3 className="text-xl font-bold text-pink-700 mb-2">Skincare AI Consultant</h3>
            <p className="text-gray-700 mb-4">Get personalized skincare recommendations using our AI-powered face and skin analysis. Discover the best routine for your unique skin needs!</p>
            <div className="flex justify-center">
              <button
                onClick={() => navigate("/ai/face-analyze")}
                className="bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white font-semibold py-2 px-6 rounded-full shadow hover:from-pink-700 hover:to-pink-400 transition mx-2"
              >
                Start Skincare Consultation
              </button>
            </div>
          </div>
          {/* Haircare Consultant Card */}
          <div className="bg-white/95 rounded-2xl shadow-xl border border-pink-200 p-8 flex flex-col items-center text-center">
            <Sparkles className="w-12 h-12 text-[#FAA6FF] mb-4" />
            <h3 className="text-xl font-bold text-pink-700 mb-2">Haircare AI Consultant</h3>
            <p className="text-gray-700 mb-4">Let our AI analyze your hair concerns and recommend the best products and treatments for healthy, beautiful hair.</p>
            <div className="flex justify-center mt-5">
              <a
                onClick={() => navigate("/ai/hair-recommend")}
                className="bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white font-semibold py-2 px-6 rounded-full shadow hover:from-pink-700 hover:to-pink-400 transition mx-2"
              >
                Start Haircare Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-pink-100 flex justify-around items-center py-2 md:hidden z-30">
        {navLinks.map((link) => (
          <a key={link.name} href={link.href} className="flex flex-col items-center text-pink-600 hover:text-pink-800 transition">
            {link.icon}
            <span className="text-xs mt-0.5">{link.name}</span>
          </a>
        ))}
      </nav>

      {/* AI Assistant Floating Button */}
      <button
        onClick={() => navigate("/ai/face-detect")}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-[#E90000] to-[#FAA6FF] shadow-2xl flex items-center justify-center hover:scale-110 transition-transform border-4 border-white"
        aria-label="Open AI Assistant"
      >
        <span className="text-white text-2xl font-extrabold drop-shadow tracking-widest">AI</span>
      </button>
    </div>
  );
};

export default Home;