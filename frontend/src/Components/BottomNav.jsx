import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Stethoscope, CalendarCheck2, Share2 } from 'lucide-react';

const navLinks = [
  { name: 'Home', icon: <HomeIcon className="w-6 h-6" />, href: '/' },
  { name: 'Consultation', icon: <Stethoscope className="w-6 h-6" />, href: '/consultation' },
  { name: 'Booking', icon: <CalendarCheck2 className="w-6 h-6" />, href: '/cart' },
  { name: 'Refer', icon: <Share2 className="w-6 h-6" />, href: '/referral' },
];

const BottomNav = () => {
  const navigate = useNavigate();

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
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-pink-100 flex justify-around items-center py-2 md:hidden z-30">
      {navLinks.map((link) =>
        link.name === 'Consultation' ? (
          <a
            key={link.name}
            href="#ai-consultant-section"
            onClick={handleConsultationClick}
            className="flex flex-col items-center text-pink-600 hover:text-pink-800 transition"
          >
            {link.icon}
            <span className="text-xs mt-0.5">{link.name}</span>
          </a>
        ) : (
          <Link key={link.name} to={link.href} className="flex flex-col items-center text-pink-600 hover:text-pink-800 transition">
            {link.icon}
            <span className="text-xs mt-0.5">{link.name}</span>
          </Link>
        )
      )}
    </nav>
  );
};

export default BottomNav; 