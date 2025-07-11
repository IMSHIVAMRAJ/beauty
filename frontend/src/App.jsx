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
import OTPVerify from './Pages/OTPVerify';
import SalonAtHome from './Pages/SalonAtHome';
import MakeupAtHome from './Pages/MakeupAtHome';
import PreBridal from './Pages/PreBridal';
import HairStudio from './Pages/HairStudio';
import MakeYourPackage from './Pages/MakeYourPackage';

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
          <Route path='/otp-verify' element={<OTPVerify />} />
          <Route path='/salon-at-home' element={<SalonAtHome />} />
          <Route path='/makeup-at-home' element={<MakeupAtHome />} />
          <Route path='/pre-bridal' element={<PreBridal />} />
          <Route path='/hair-studio' element={<HairStudio />} />
          <Route path='/make-your-package' element={<MakeYourPackage />} />
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
