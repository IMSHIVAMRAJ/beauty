import React, { useState, useEffect, useRef } from 'react';
import { MapPin, ChevronDown, User2, ShoppingCart, Home, Stethoscope, CalendarCheck2, Share2, Search, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';


const navLinks = [
  { name: 'Home', icon: <Home className="w-5 h-5 mr-1" />, href: '/' },
  { name: 'Consultation', icon: <Stethoscope className="w-5 h-5 mr-1" />, href: '#' },
  { name: 'Booking', icon: <CalendarCheck2 className="w-5 h-5 mr-1" />, href: '/cart' },
  { name: 'Refer', icon: <Share2 className="w-5 h-5 mr-1" />, href: '/referral' },
];

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Navbar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const { cart } = useCart();
  const cartCount = cart.length;
  

const handleResultClick = (item) => {
  const category = item.categorySlug || item.categoryName || 'makeup-at-home'; // fallback
  navigate(`/${category}?highlight=${item._id}`);
  setQuery('');
  setShowResults(false);
};

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      try {
        const res = await fetch(`/api/services/search?query=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
        setShowResults(true);
      } catch (err) {
        console.error('Search error:', err);
        setShowResults(false);
      }
    };

    const delayDebounce = setTimeout(fetchResults, 300); // debounce

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // --------- rest of your states (location dropdown, user dropdown, etc.) ----------
  const [locations, setLocations] = useState([]);
  const [locationDropdown, setLocationDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(() => localStorage.getItem('selectedLocationName') || 'Select Location');
  const dropdownRef = useRef(null);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);
  const [error, setError] = useState("");
  const [profileDropdown, setProfileDropdown] = useState(false);
  const profileRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(localStorage.getItem('token')));
  

  // ---------- Location & Profile Dropdown Effects ----------
  useEffect(() => {
    if (locationDropdown && locations.length === 0) {
      setLoadingLocations(true);
      fetch(`${API_BASE_URL}/api/locations`)
        .then(res => res.json())
        .then(data => data.success ? setLocations(data.locations) : setError(data.message || 'Failed to load locations.'))
        .catch(() => setError('Network error.'))
        .finally(() => setLoadingLocations(false));
    }
  }, [locationDropdown, locations.length]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setLocationDropdown(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setProfileDropdown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem('token')));
  }, []);

  const handleGeoLocate = () => {
    if (!navigator.geolocation) return setError('Geolocation not supported.');
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(`${API_BASE_URL}/api/locations/reverse-geocode`, {
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
          } else setError(data.message || 'Location not supported.');
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

  const handleSelect = (loc) => {
    setSelectedLocation(loc.name);
    localStorage.setItem('selectedLocationId', loc.id);
    localStorage.setItem('selectedLocationName', loc.name);
    setLocationDropdown(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  // Scroll to AI-Based Consultant section on Home
  const handleConsultationClick = (e) => {
    e.preventDefault();
    if (window.location.pathname !== '/') {
      navigate('/', { state: { scrollToConsultant: true } });
    } else {
      const section = document.getElementById('ai-consultant-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="w-full bg-white shadow-md px-2 sm:px-4 py-3 sm:py-5 sticky top-0 z-20">
      <div className="flex items-center justify-between w-full gap-2 sm:gap-4">
        {/* Left: Location Dropdown */}
        <div className="flex items-center min-w-max" ref={dropdownRef}>
          <button
            onClick={() => setLocationDropdown(v => !v)}
            className="flex items-center gap-1 text-sm sm:text-base font-semibold text-gray-700 px-2 py-1 rounded-full hover:bg-pink-50"
          >
            <MapPin className="w-4 h-4 mr-1 text-gray-500" />
            <span className="truncate max-w-[120px] sm:max-w-[160px]">{selectedLocation}</span>
            <ChevronDown className="w-4 h-4 ml-1 text-gray-500" />
          </button>
          {locationDropdown && (
            <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border z-40 p-2">
              <button
                onClick={handleGeoLocate}
                disabled={geoLoading}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-pink-600 hover:bg-pink-50 font-semibold"
              >
                <MapPin className="w-4 h-4" />
                {geoLoading ? 'Detecting...' : 'Use my location'}
              </button>
              <div className="h-px bg-gray-100 my-2" />
              {loadingLocations ? <div className="text-center text-gray-400 py-2 text-sm">Loading...</div> :
                error ? <div className="text-center text-red-500 py-2 text-sm">{error}</div> :
                  <ul className="max-h-56 overflow-y-auto">
                    {locations.map(loc => (
                      <li key={loc.id}>
                        <button onClick={() => handleSelect(loc)} className="w-full text-left px-3 py-2 rounded-lg hover:bg-pink-50 font-medium text-gray-700">
                          {loc.name}
                        </button>
                      </li>
                    ))}
                  </ul>}
            </div>
          )}
        </div>

        {/* Center: Search Bar + Nav Links in a row */}
        <div className="flex flex-1 justify-start items-center gap-3 max-w-3xl mx-2">
          {/* Searchbar: Always hide on mobile, show on sm+ */}
          <div className="relative w-full sm:max-w-md hidden sm:block">
            <input
              type="text"
              placeholder="Search services, salons, offers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:ring-pink-300 text-base sm:text-sm bg-white shadow-sm transition-all duration-200
                sm:px-10 sm:py-2 sm:rounded-full mt-6 sm:mt-0"
              onFocus={() => setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
            />
            <Search className="absolute left-4 top-3.5 sm:left-3 sm:top-2.5 text-gray-400 w-6 h-6 sm:w-5 sm:h-5" />
            {showResults && results.length > 0 && (
              <ul className="absolute bg-white border w-full rounded-md mt-1 max-h-60 overflow-y-auto shadow z-50">
                {results.map((item) => (
                  <li
                    key={item._id}
                    className="px-4 py-2 hover:bg-pink-50 cursor-pointer"
                    onClick={() => handleResultClick(item)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Nav Links in a row, right of search bar */}
          <nav className="hidden sm:flex items-center gap-6 flex-shrink-0">
            {navLinks.map((link) =>
              link.name === 'Consultation' ? (
                <a
                  key={link.name}
                  href="#ai-consultant-section"
                  onClick={handleConsultationClick}
                  className="flex items-center px-2 py-1.5 rounded-full text-pink-500 hover:bg-pink-50 font-medium"
                >
                  {link.icon}
                  <span>{link.name}</span>
                </a>
              ) : (
                <Link key={link.name} to={link.href} className="flex items-center px-2 py-1.5 rounded-full text-pink-500 hover:bg-pink-50 font-medium">
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              )
            )}
          </nav>
        </div>

        {/* Right: Cart & User */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-max">
          {/* Cart & User */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isLoggedIn ? (
              <div className="relative" ref={profileRef}>
                <button onClick={() => setProfileDropdown(v => !v)} className="p-2 rounded-full hover:bg-gray-100">
                  <User2 className="w-6 h-6 text-gray-600" />
                </button>
                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border p-2 z-40">
                    <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-pink-50 text-gray-700 font-semibold">
                      <User2 className="w-4 h-4" /> My Profile
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 font-semibold mt-1">
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/otp-login" className="px-4 py-2 rounded-full bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white font-bold shadow hover:from-pink-700 hover:to-pink-400">
                Login
              </Link>
            )}
            <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
