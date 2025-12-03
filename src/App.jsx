import { Routes, Route } from 'react-router-dom'
import { Analytics } from "@vercel/analytics/react"
import LandingPage from '@pages/LandingPage'
import UserSignup from '@pages/UserSignup'
import CounselorSignup from '@pages/CounselorSignup'
import Login from '@pages/Login'
import UserDashboard from '@pages/UserDashboard'
import CounselorDashboard from '@pages/CounselorDashboard'
import AdminDashboard from '@pages/AdminDashboard'
import FindCounselor from '@pages/FindCounselor'
import AboutUs from '@pages/AboutUs'

import ScrollToTop from './components/utils/ScrollToTop'

function App() {
  return (
    <div className="app">
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/signup/user" element={<UserSignup />} />
        <Route path="/signup/counselor" element={<CounselorSignup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected User Routes */}
        <Route path="/dashboard/user" element={<UserDashboard />} />
        <Route path="/find-counselor" element={<FindCounselor />} />

        {/* Protected Counselor Routes */}
        <Route path="/dashboard/counselor" element={<CounselorDashboard />} />

        {/* Protected Admin Routes */}
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
      </Routes>
      <Analytics />
    </div>
  )
}

export default App
