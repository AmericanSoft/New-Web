import ContactUs from "../features/Contact/ContactUs";
import Hero from "../components/HeroSection/Hero";
import ProjectsCarousel from "../features/Projects/ProjectsCarousel";
import OurServices from "../features/Services/OurServices";
import WhyChooseUs from "../features/WhyChooseUs/WhyChooseUs";
import AmericanSoftFAQ from "./FAQ";

export default function Home() {


  return (
    <>
      <Hero lang="ar" />
      <OurServices lang="ar" />
      <ProjectsCarousel lang="ar" />
      <WhyChooseUs lang="ar" />
      <ContactUs lang="ar" />
    </>
  );
}
