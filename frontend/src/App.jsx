import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import OTPLogin from './Pages/OTPLogin';
import ReferralPage from './Pages/ReferralPage';
import Profile from './Pages/Profile';
import AddServices from './Pages/AddServices';
import Cart from './Pages/Cart';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import BottomNav from './Components/BottomNav';
import AdminLogin from './Pages/AdminLogin';
import AdminDashboard from './Pages/AdminDashboard';
import BeauticianLogin from './Pages/BeauticianLogin';
import BeauticianDashboard from './Pages/BeauticianDashboard';
import OTPVerify from './Pages/OTPVerify';
import SalonAtHome from './Pages/SalonAtHome';
import MakeupAtHome from './Pages/MakeupAtHome';
import PreBridal from './Pages/PreBridal';
import HairStudio from './Pages/HairStudio';
import MakeYourPackage from './Pages/MakeYourPackage';
import AdminPrivateRoute from './utils/AdminPrivateRoute';
import BeauticianPrivateRoute from './utils/BeauticianPrivateRoute';
import FaceDetectionPage from "./pages/FaceDetectionPage";
import SkinAnalysisFormPage from "./pages/SkinAnalysisFormPage";
import ResultPage from "./pages/ResultPage";
import FaceAnalysisPage from "./Pages/FaceAnalysisPage";
import RecommendationForm from "./Pages/RecommendationForm";
import HairRecommendationForm from './Pages/HairRecommendationForm';

const App = () => {
  const location = useLocation();
  // Hide Navbar on admin and beautician dashboard
  const hideNavbar = ["/admin/dashboard", "/beautician/dashboard"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
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
          <Route path="/ai/face-detect" element={<FaceDetectionPage />} />
          <Route path="/ai/analyze" element={<SkinAnalysisFormPage />} />
          <Route path="/ai/result" element={<ResultPage />} />
          <Route path ="/ai/face-analyze" element={<FaceAnalysisPage />} />
          <Route path="/ai/recommend" element={<RecommendationForm />} />
          <Route path="/ai/hair-recommend" element={<HairRecommendationForm />} />
          <Route path="/admin/dashboard" element={
          <AdminPrivateRoute>
            <AdminDashboard />
          </AdminPrivateRoute>
        }
      />
          <Route path="/beautician/login" element={<BeauticianLogin />} />
        <Route
        path="/beautician/dashboard"
        element={
          <BeauticianPrivateRoute>
            <BeauticianDashboard />
          </BeauticianPrivateRoute>
        }
      />
        </Routes>
      </div>
      {!hideNavbar && <BottomNav />}
      <Footer />
    </>
  );
};

export default App;