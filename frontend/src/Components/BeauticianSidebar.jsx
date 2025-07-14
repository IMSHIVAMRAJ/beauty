import React from 'react';
import { Calendar, Clock, Users, LogOut, X } from 'lucide-react';

const BeauticianSidebar = ({ activeTab, setActiveTab, setSidebarOpen, handleLogout }) => (
  <aside className="w-64 bg-white shadow-lg flex flex-col py-8 px-6 min-h-screen">
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-xl font-bold text-gray-800">Beautician Panel</h1>
      <button
        onClick={() => setSidebarOpen(false)}
        className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
    <div className="flex-1 flex flex-col justify-between">
      <nav className="mb-8">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => {
                setActiveTab('availability');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition ${
                activeTab === 'availability'
                  ? 'bg-pink-100 text-pink-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Clock className="w-5 h-5 mr-3" />
              Set Availability
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setActiveTab('bookings');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition ${
                activeTab === 'bookings'
                  ? 'bg-pink-100 text-pink-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Users className="w-5 h-5 mr-3" />
              My Bookings
            </button>
          </li>
        </ul>
      </nav>
      <div className="border-t border-gray-200 pt-8">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  </aside>
);
export default BeauticianSidebar;