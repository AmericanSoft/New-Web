
import React, { useRef } from "react";
import   "../i18";
import { useTranslation } from "react-i18next";


interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  gradient: string;
  backgroundImage?: string;
}

const testimonials: TestimonialProps[] = [{
  content: "Atlas transformed our production line, handling repetitive tasks while our team focuses on innovation. 30% increase in output within three months.",
  author: "Sarah Chen",
  role: "VP of Operations, Axion Manufacturing",
  gradient: "from-blue-700 via-indigo-800 to-purple-900",
  backgroundImage: "/background-section1.png"
}, {
  content: "Implementing Atlas in our fulfillment centers reduced workplace injuries by 40% while improving order accuracy. The learning capabilities are remarkable.",
  author: "Michael Rodriguez",
  role: "Director of Logistics, GlobalShip",
  gradient: "from-indigo-900 via-purple-800 to-orange-500",
  backgroundImage: "/background-section2.png"
}, {
  content: "Atlas adapted to our lab protocols faster than any system we've used. It's like having another researcher who never gets tired and maintains perfect precision.",
  author: "Dr. Amara Patel",
  role: "Lead Scientist, BioAdvance Research",
  gradient: "from-purple-800 via-pink-700 to-red-500",
  backgroundImage: "/background-section3.png"
}, {
  content: "As a mid-size business, we never thought advanced robotics would be accessible to us. Atlas changed that equation entirely with its versatility and ease of deployment.",
  author: "Jason Lee",
  role: "CEO, Innovative Solutions Inc.",
  gradient: "from-orange-600 via-red-500 to-purple-600",
  backgroundImage: "/background-section1.png"
}];

const TestimonialCard = ({
  content,
  author,
  role,
  backgroundImage = "/background-section1.png"
}: TestimonialProps) => {
  return <div className="bg-cover bg-center rounded-lg p-8 h-full flex flex-col justify-between text-white transform transition-transform duration-300 hover:-translate-y-2 relative overflow-hidden" style={{
    backgroundImage: `url('${backgroundImage}')`
  }}>
      <div className="absolute top-0 right-0 w-24 h-24 bg-white z-10"></div>
      
      <div className="relative z-0">
        <p className="text-xl mb-8 font-medium leading-relaxed pr-20">{`"${content}"`}</p>
        <div>
          <h4 className="font-semibold text-xl">{author}</h4>
          <p className="text-white/80">{role}</p>
        </div>
      </div>
    </div>;
};

const Testimonials = () => {

   const { t , i18n } = useTranslation();
          
            const changLang = () => {
              const newLang = i18n.language === "ar" ? "en" : "ar";
              i18n.changeLanguage(newLang);
              localStorage.setItem("lang", newLang);
            };

  const sectionRef = useRef<HTMLDivElement>(null);

  return <section className="py-12 bg-white relative" id="testimonials" ref={sectionRef}> {/* Reduced from py-20 */}
      <div className="section-container opacity-0 animate-on-scroll">
        <div className="flex items-center gap-4 mb-6">
          <div className="pulse-chip gap-1">
            <span className="flex  items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white mr-2">05</span>
            <span>{t("testimonials.test")}</span>
          </div>
        </div>
        
        <h2 className="text-5xl font-display font-bold mb-12">{t("testimonials.whatwesay")}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        </div>
      </div>
    </section>;
};

export default Testimonials;
