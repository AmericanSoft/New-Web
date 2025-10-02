import ContactUs from "../components/Contact/ContactUs";
import Hero from "../components/Hero";
import ProjectsCarousel from "../components/Projects/ProjectsCarousel";
import OurServices from "../components/Services/OurServices";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
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
