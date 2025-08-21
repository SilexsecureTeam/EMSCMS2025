import React, { Suspense, lazy, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSpinner from "./components/LoadingSpinner";
import NotfoundPage from "./Pages/NotfoundPage";
import BlogPost from "./Pages/BlogPost";
import Otp from "./components/Otp";
import DashboardPage from "./Pages/DashboardPage";

// Lazy load the page components
const Home2 = lazy(() => import("./Pages/Home2"));
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const AboutPage2 = lazy(() => import("./Pages/AboutPage2"));
const ProgramPage2 = lazy(() => import("./Pages/ProgramPage2"));
const ProgramPage = lazy(() => import("./Pages/ProgramPage"));
const ProgramPage1 = lazy(() => import("./Pages/ProgramPage1"));
const ProgramPage3 = lazy(() => import("./Pages/ProgramPage3"));
const ProgramPage4 = lazy(() => import("./Pages/ProgramPage4"));
const ProgramPage5 = lazy(() => import("./Pages/ProgramPage5"));
const ProgramPage6 = lazy(() => import("./Pages/ProgramPage6"));
const ProgramPage7 = lazy(() => import("./Pages/ProgramPage7"));
const ProgramPage8 = lazy(() => import("./Pages/ProgramPage8"));
const ProPage = lazy(() => import("./Pages/ProPage"));
const ContactPage = lazy(() => import("./Pages/ContactPage"));
const BlogPage = lazy(() => import("./Pages/BlogPage"));
const AddProgramPage = lazy(() => import("./Pages/AddProgram"));
const FormPage = lazy(() => import("./Pages/FormPage"));
const CareerPage = lazy(() => import("./Pages/CareerPage"));
const GalleryPage = lazy(() => import("./Pages/GalleryPage"));
const NewsPage = lazy(() => import("./Pages/NewsPage"));
const HirePage = lazy(() => import("./Pages/HirePage"));
const SuccessPage = lazy(() => import("./Pages/SuccessPage"));
const SubmitPage = lazy(() => import("./Pages/SubmitPage"));
const RegisterPage = lazy(() => import("./Pages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("./Pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./Pages/ResetPasswordPage"));
import DynamicProgramPage from "./Pages/DynamicProgramPage";
// const DashboardPage = lazy(() => import("./Pages/Das"));
// ScrollToTop component
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <Toaster position="top-right" reverseOrder={false} />
        <div className="p">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home2 />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/otp" element={<Otp />} />
              <Route path="/about" element={<AboutPage2 />} />
              <Route path="/house-keeper" element={<ProgramPage />} />
              <Route path="/programs/:slug" element={<DynamicProgramPage />} />
              <Route path="/nanny-training" element={<ProgramPage1 />} />
              <Route path="/social-etiquette" element={<ProgramPage2 />} />
              <Route path="/cultural-competence" element={<ProgramPage3 />} />
              <Route path="/silver-service" element={<ProgramPage4 />} />
              <Route path="/steward-training" element={<ProgramPage5 />} />
              <Route path="/butler-training" element={<ProgramPage6 />} />
              <Route path="/house-manager" element={<ProgramPage7 />} />
              <Route path="/luxury-bed" element={<ProgramPage8 />} />
              <Route path="/programs" element={<ProPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/add-program" element={<AddProgramPage />} />
            

              <Route path="/enroll" element={<FormPage />} />
              <Route path="/career" element={<CareerPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/hire" element={<HirePage />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/submit" element={<SubmitPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/posts/:slug" element={<BlogPost />} />
              <Route path="/dashboard/*" element={<DashboardPage/>} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="*" element={<NotfoundPage />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
