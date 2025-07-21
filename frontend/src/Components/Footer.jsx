import React from 'react';
import { Mail, HelpCircle, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const socialLinks = [
  { icon: <Instagram className="w-5 h-5" />, href: '#' },
  { icon: <Facebook className="w-5 h-5" />, href: '#' },
  { icon: <Twitter className="w-5 h-5" />, href: '#' },
  { icon: <Youtube className="w-5 h-5" />, href: '#' },
];

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-gray-50 to-gray-200 pt-8 sm:pt-12 pb-0 px-0 mt-8 sm:mt-10 border-t border-gray-200 mb-16 md:mb-0">
      <div className="w-full max-w-xs sm:max-w-2xl mx-auto flex flex-col items-center text-center gap-4 sm:gap-6">
        {/* Tagline */}
        <div className="text-lg sm:text-2xl md:text-3xl font-extrabold text-gray-400 mb-0">India's Most Loved Home Salon And Spa App</div>
        {/* Social Row */}
        <div className="flex flex-col gap-1 sm:gap-2 items-center w-full">
          <div className="text-sm sm:text-base text-gray-700 font-medium">Show us some love <span className="text-pink-500">♥</span> on social media</div>
          <div className="flex gap-2 sm:gap-4 justify-center">
            {socialLinks.map((social, idx) => (
              <a key={idx} href={social.href} className="p-2 rounded-full bg-white hover:bg-pink-100 text-gray-700 hover:text-pink-600 shadow-sm transition" aria-label="Social Link">
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        {/* Email Subscription Row */}
        <form className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 bg-gray-800 rounded-xl p-3 sm:p-4 shadow">
          <div className="flex items-center gap-2 text-white text-sm sm:text-base font-medium mb-1 sm:mb-0">
            <Mail className="w-5 h-5" />
            Get special discount on your inbox
          </div>
          <div className="flex flex-col sm:flex-row flex-1 gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="Your Email"
              className="flex-1 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm border border-white focus:outline-none focus:ring-2 focus:ring-pink-200 text-white placeholder:text-white bg-transparent"
            />
            <button
              type="submit"
              className="bg-pink-500 text-white px-4 sm:px-6 py-2 rounded-full font-bold hover:bg-pink-600 transition w-full sm:w-auto"
            >
              SEND
            </button>
          </div>
        </form>
      </div>
      {/* Help Center Bar */}
      <div className="w-full bg-pink-500 mt-6 sm:mt-8 flex flex-col items-center justify-center py-2 sm:py-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-white" />
          <span className="text-white font-bold text-base sm:text-lg">HELP CENTER</span>
        </div>
      </div>
      {/* Copyright */}
      <div className="w-full text-center text-xs sm:text-sm text-pink-400 font-medium py-2 sm:py-3 bg-pink-50 border-t border-pink-100">&copy; {new Date().getFullYear()} Glowlii. All rights Reserved. Developed by DiGrows.</div>
    </footer>
  );
};

export default Footer;
