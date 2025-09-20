import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/Register";
import AdminDashboard from "./pages/AdminPages/Admin-Dashboard";
import OurProjects from "./pages/AdminPages/Admin-Project";
import OurContactus from "./pages/AdminPages/Admin-Contacts";
import { QuoteModalProvider } from "./components/QuoteModalContext";
import Popupform from "./components/popupform";
import  SingleProjectDetails from './components/SingleProjectDetails.tsx'
import BlogList from "./pages/BlogPage";
import AmericanSoftFAQ from './pages/Faq.tsx'
import TermsPage from "./pages/Terms.tsx";
import PrivacyPolicyPage from "./pages/privacy.tsx";
import BlogArticleRoute from "./pages/BlogArticleRoute.tsx";
import AboutPage from "./pages/aboutcompany.tsx";
import IOSAppPage from "./pages/IOSAppPage.tsx";
import DesktopAppPage from "./pages/DesktopAppPage.tsx";
import AllProjectsPage from "./pages/AllProjectsPage.tsx";
import AndroidAppPage from "./pages/AndroidAppPage.tsx";
import ContactPage from "./pages/Contactus.tsx";
import ServicesPage from './pages/OurServcies.tsx'

const queryClient = new QueryClient();


function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("isAuthenticated") === "true";
  const role = localStorage.getItem("role");

  if (!isAuth) return <Navigate to="/login" replace />;
  if (role !== "admin") return <Navigate to="/" replace />;

  return children;
}

const App = () => (

  <QueryClientProvider client={queryClient}>

    <QuoteModalProvider>

    <TooltipProvider>

      <Popupform/>


      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegisterPage/>} />

           <Route path="/admindashboard" 
          element={
            <ProtectedRoute>
                 <AdminDashboard/>
            </ProtectedRoute>
            } 
            />
            <Route path="/ourprojects" element={<OurProjects/>} />
            <Route path="/ourcontacts" element={<OurContactus/>}/>
            <Route path="/blog" element={<BlogList/>}/>
            <Route path="/article/:id" element={<BlogArticleRoute />} />


            <Route path="project/:id" element={<SingleProjectDetails />} />
            <Route path="/faq" element={<AmericanSoftFAQ/>}/>
            <Route path="/terms" element={<TermsPage/>}/>

            <Route path="/privacy" element={<PrivacyPolicyPage/>}/>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/android" element={<AndroidAppPage />} />
            <Route path="/ios" element={<IOSAppPage />} />
            <Route path="/desktop" element={<DesktopAppPage />} />
            <Route path="/projects" element={<AllProjectsPage />} />
            <Route path="/contactus" element={<ContactPage />} />
            <Route path="/services" element={<ServicesPage />} />

            


            

            



            

              
    
        </Routes>
      </BrowserRouter>
    </TooltipProvider>

  </QuoteModalProvider>

  </QueryClientProvider>
);

export default App;
