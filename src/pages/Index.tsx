
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import OurPorject from "@/components/OurPorject";
import Whyamerican from "@/components/Whyamerican";
import CEO from "@/components/CEO";
import Contactus from "@/components/Contactus";
import Blog from "@/components/Blog";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import FirstHero from "@/components/First-Hero";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer/Footer";

const Index = () => {

  
  // Initialize intersection observer to detect when elements enter viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    // This helps ensure smooth scrolling for the anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        
        // Increased offset to account for mobile nav
        const offset = window.innerWidth < 768 ? 100 : 80;
        
        window.scrollTo({
          top: targetElement.offsetTop - offset,
          behavior: 'smooth'
        });
      });
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="space-y-4 sm:space-y-8"> {/* Reduced space on mobile */}

        <FirstHero/>
        <Services />
        <HowItWorks/>
        <Whyamerican />
        <OurPorject />
        <Contactus />
        <Blog />
        <Testimonials />
        <Newsletter />
        <Footer/>
        
        
      </main>
   
    </div>
  );
};

export default Index;
