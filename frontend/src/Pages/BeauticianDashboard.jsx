import React, { useState } from 'react';
import { Calendar, Clock, Users, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SetAvailability from './SetAvailability';
import BeauticianBookings from './BeauticianBookings';
import BeauticianSidebar from '../Components/BeauticianSidebar';

const BeauticianDashboard = () => {
  const [activeTab, setActiveTab] = useState('availability');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored beautician data
    localStorage.removeItem('beauticianToken');
    localStorage.removeItem('beauticianData');
    navigate('/beautician/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'availability':
        return <SetAvailability />;
      case 'bookings':
        return <BeauticianBookings />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <BeauticianSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setSidebarOpen={setSidebarOpen}
        handleLogout={handleLogout}
      />
      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto flex flex-col items-start p-8">
        <div className="flex items-center justify-between w-full mb-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Welcome back!</p>
              <p className="text-xs text-gray-500">Beautician</p>
            </div>
            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
              <span className="text-pink-600 font-bold">B</span>
            </div>
          </div>
        </div>
        {renderContent()}
      </main>
    </div>
  );
};

export default BeauticianDashboard;