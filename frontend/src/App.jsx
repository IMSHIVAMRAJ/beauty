import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import OTPLogin from './Pages/OTPLogin';
import ReferralPage from './Pages/ReferralPage';
import Profile from './Pages/Profile';
import AddServices from './Pages/AddServices';
import Cart from './Pages/Cart';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import AdminLogin from './Pages/AdminLogin';
import AdminDashboard from './Pages/AdminDashboard';
import BeauticianLogin from './Pages/BeauticianLogin';

const App = () => {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/referral' element={<ReferralPage />} />
          <Route path='/add-services' element={<AddServices />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/otp-login' element={<OTPLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/beautician/login" element={<BeauticianLogin />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
