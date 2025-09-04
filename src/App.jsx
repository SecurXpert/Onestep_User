import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import MyAppointment from "./pages/MyAppointment";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import ContacUs from "./pages/ContacUs";
import Confirmation from "./pages/Confirmation";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DoctorLogin from "./pages/DoctorLogin";
import DoctorDashboard from "./pages/admin/DoctorDashboard";
import PharmacyDashboard from "./pages/admin/PharmacyDashboard";
import UserDashboardMock from "./pages/UserDashboardMock";
import RazorpayPayment from "./pages/RazorpayPayment";
import RazorpayEmergency from "./pages/RazorpayEmergency";
import ProfilePage from "./pages/ProfilePage";
import Myorder from "./pages/Myorder";
import LoginRegister from "./pages/LoginRegister";
import MyConsultations from "./pages/Myconsultations";
import Blog from "./pages/Blog";
import NeedHelp from "./pages/NeedHelp";
import Awards from "./pages/RewardsPage";
import HealthPlansPage from "./pages/Healthplans";
import HealthRecords from "./pages/HealthRecords";
import RateConsultant from "./pages/ConsultationRating";
import HealthRecord from "./pages/HealthRecord";
import HealthPlan from "./pages/Healthplan";
import Blogs from "./pages/Blogs";
import Rate from "./pages/Rate";
import Need from "./pages/need";
import About from "./pages/About";
import Reward from "./pages/Reward";
import ArticlesPage from "./pages/Articles";
import DoctorsHeader from "./components/DoctorsHeader";
import Pharmacy from "./pages/Pharmacy";
import Labtest from "./pages/LabTest";
import Department from "./pages/Department";
import DoctorProfileWrapper from "./components/DoctorProfileWrapper";
import Individualarticle from "./pages/Individualarticle";
import Dashboard_Admin from "./pages/Dashborad_Admin";
import Doctorsdata from "./pages/Doctorsdata";
import CaseStudyForm from "./pages/CaseStudyForm";
import Emergencyappointment from "./pages/EmergencyAppointment";
import Terms from "./pages/Terms";
import Private from "./pages/policy";

// ScrollToTop component to handle scrolling to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

const App = () => {
  return (
    <div className="pt-20 w-full mx-auto">
      <Navbar />
      <ScrollToTop /> {/* Moved outside of Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:specialty" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/emergency" element={<Emergencyappointment />} />
        <Route path="/myappointment" element={<MyAppointment />} />
        <Route path="/appointment/:id" element={<Appointment />} />
        <Route path="/contact" element={<ContacUs />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/pharmacy-dashboard" element={<PharmacyDashboard />} />
        <Route path="/user-dash" element={<UserDashboardMock />} />
        <Route path="/razorpay-payment" element={<RazorpayPayment />} />
        <Route path="/razorpay-emergency" element={<RazorpayEmergency />} />
        <Route path="/profilepage" element={<ProfilePage />} />
        <Route path="/myorder" element={<Myorder />} />
        <Route path="/login-register" element={<LoginRegister />} />
        <Route path="/myconsultations" element={<MyConsultations />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/needhelp" element={<NeedHelp />} />
        <Route path="/my-rewards" element={<Awards />} />
        <Route path="/health-plans" element={<HealthPlansPage />} />
        <Route path="/health-records" element={<HealthRecords />} />
        <Route path="/rate-consultation" element={<RateConsultant />} />
        <Route path="/health-record" element={<HealthRecord />} />
        <Route path="/healthplan" element={<HealthPlan />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/rate" element={<Rate />} />
        <Route path="/need" element={<Need />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/reward" element={<Reward />} />
        <Route path="/article" element={<ArticlesPage />} />
        <Route path="/doctors-header" element={<DoctorsHeader />} />
        <Route path="/pharmacy" element={<Pharmacy />} />
        <Route path="/lab" element={<Labtest />} />
        <Route path="/department/:specialtyName" element={<Department />} />
        <Route path="/doctor/:doctor_id" element={<DoctorProfileWrapper />} />
        <Route path="/article/:name" element={<Individualarticle />} />
        <Route path="/super_dashboard" element={<Dashboard_Admin />} />
        <Route path="/doctorsdata" element={<Doctorsdata />} />
        <Route path="/casestudy" element={<CaseStudyForm />} />
        <Route path="/private" element={<Private />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;