import React, { useState, useEffect, useRef } from 'react';
import { MapPin, ChevronDown, User2, ShoppingCart, Home, Stethoscope, CalendarCheck2, Share2, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

const navLinks = [
  { name: 'Home', icon: <Home className="w-5 h-5 mr-1" />, href: '#' },
  { name: 'Consultation', icon: <Stethoscope className="w-5 h-5 mr-1" />, href: '#' },
  { name: 'Booking', icon: <CalendarCheck2 className="w-5 h-5 mr-1" />, href: '/cart' },
  { name: 'Refer', icon: <Share2 className="w-5 h-5 mr-1" />, href: '#' },
];

const Navbar = () => {
  const [searchFocus, setSearchFocus] = useState(false);
  const { cart } = useCart();
  const cartCount = cart.length;

  // Location selection logic
  const [locations, setLocations] = useState([]);
  const [locationDropdown, setLocationDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(() => localStorage.getItem('selectedLocationName') || 'Select Location');
  const dropdownRef = useRef(null);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (locationDropdown && locations.length === 0) {
      setLoadingLocations(true);
      fetch('/api/locations')
        .then(res => res.json())
        .then(data => {
          if (data.success) setLocations(data.locations);
          else setError(data.message || 'Failed to load locations.');
        })
        .catch(() => setError('Network error.'))
        .finally(() => setLoadingLocations(false));
    }
  }, [locationDropdown, locations.length]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLocationDropdown(false);
      }
    }
    if (locationDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [locationDropdown]);

  // Handle geolocation
  const handleGeoLocate = () => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported.');
      return;
    }
    setGeoLoading(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch('/api/locations/reverse-geocode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lat: latitude, lng: longitude }),
          });
          const data = await res.json();
          if (data.success && data.location) {
            setSelectedLocation(data.location.name);
            localStorage.setItem('selectedLocationId', data.location.id);
            localStorage.setItem('selectedLocationName', data.location.name);
            setLocationDropdown(false);
          } else {
            setError(data.message || 'Location not supported.');
          }
        } catch {
          setError('Failed to detect location.');
        }
        setGeoLoading(false);
      },
      () => {
        setError('Permission denied or unavailable.');
        setGeoLoading(false);
      }
    );
  };

  // Handle manual selection
  const handleSelect = (loc) => {
    setSelectedLocation(loc.name);
    localStorage.setItem('selectedLocationId', loc.id);
    localStorage.setItem('selectedLocationName', loc.name);
    setLocationDropdown(false);
  };

  return (
    <header className="w-full bg-white shadow-md px-2 sm:px-4 py-3 sm:py-5 sticky top-0 z-20">
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4 w-full">
        {/* Location Dropdown */}
        <div className="relative min-w-max mb-2 sm:mb-0" ref={dropdownRef}>
          <button
            className="flex items-center gap-1 text-sm sm:text-base font-semibold text-gray-700 cursor-pointer px-2 py-1 rounded-full hover:bg-pink-50 transition"
            onClick={() => setLocationDropdown((v) => !v)}
            type="button"
          >
            <MapPin className="w-4 h-4 mr-1 text-gray-500" />
            <span className="truncate max-w-[120px] sm:max-w-[160px]">{selectedLocation}</span>
            <ChevronDown className="w-4 h-4 ml-1 text-gray-500" />
          </button>
          {locationDropdown && (
            <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-40 p-2">
              <button
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-pink-600 font-semibold hover:bg-pink-50 transition mb-1 disabled:opacity-60"
                onClick={handleGeoLocate}
                disabled={geoLoading}
                type="button"
              >
                <MapPin className="w-4 h-4" />
                {geoLoading ? 'Detecting...' : 'Use my location'}
              </button>
              <div className="h-px bg-gray-100 my-2" />
              {loadingLocations ? (
                <div className="text-center text-gray-400 py-2 text-sm">Loading locations...</div>
              ) : error ? (
                <div className="text-center text-red-500 py-2 text-sm">{error}</div>
              ) : (
                <ul className="max-h-56 overflow-y-auto">
                  {locations.map((loc) => (
                    <li key={loc.id}>
                      <button
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-pink-50 transition text-gray-700 font-medium"
                        onClick={() => handleSelect(loc)}
                        type="button"
                      >
                        {loc.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        {/* Search Bar */}
        <div
          className={`flex-1 flex items-center mx-0 sm:mx-2 max-w-full sm:max-w-xs relative mb-2 sm:mb-0 transition-all duration-200
            ${searchFocus ? 'fixed left-0 top-0 w-full z-30 bg-white px-2 py-2' : ''}`
          }
        >
          <span className="absolute left-3 inset-y-0 flex items-center text-gray-400 pointer-events-none">
            <Search className="w-5 h-5" />
          </span>
          <input
            type="text"
            placeholder="What do you want to shop for today?"
            className="w-full rounded-full pl-10 pr-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-200 text-sm sm:text-base shadow placeholder:text-xs sm:placeholder:text-base"
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
          />
        </div>
        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-2 md:gap-4 flex-shrink-0 mb-2 md:mb-0">
          {navLinks.map((link) => (
            link.href.startsWith('/') ? (
              <Link
                key={link.name}
                to={link.href}
                className="flex items-center px-2 py-1.5 rounded-full text-pink-500 hover:bg-pink-50 hover:text-pink-700 text-base font-medium transition"
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center px-2 py-1.5 rounded-full text-pink-500 hover:bg-pink-50 hover:text-pink-700 text-base font-medium transition"
              >
                {link.icon}
                <span>{link.name}</span>
              </a>
            )
          ))}
        </nav>
        {/* Spacer to push icons to far right */}
        <div className="hidden sm:flex flex-1" />
        {/* User & Cart Icons */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-max">
          <Link to="/profile" className="p-2 rounded-full hover:bg-gray-100 transition">
            <User2 className="w-6 h-6 text-gray-600 hover:scale-110 transition-transform" />
          </Link>
          <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100 transition">
            <ShoppingCart className="w-6 h-6 text-gray-600 hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: 6, right: 6, background: '#d32f2f', color: '#fff', borderRadius: '50%', minWidth: 20, height: 20, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, boxShadow: '0 1px 4px #0002', padding: '0 6px' }}>
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
