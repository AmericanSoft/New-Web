import ContactUs from "../components/Contact/ContactUs";
import Hero from "../components/Hero";
import ProjectsCarousel from "../components/Projects/ProjectsCarousel";
import OurServices from "../components/Services/OurServices";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";

const projects = [
  {
    tag: "Web",
    title: "Container Trend – News & Tech Media Hub",
    desc: "A modern digital media platform delivering the latest technology news, smartphone updates, and product reviews with a fast, responsive, and user-friendly experience.",
    caseHref: "#",
    liveHref: "https://customers-eg.com/",
    mockSrc: "/assets/CT-Web.png",
  },
  {
    tag: "Web",
    title: "Container Trend – News & Tech Media Hub",
    desc: "A modern digital media platform delivering the latest technology news, smartphone updates, and product reviews with a fast, responsive, and user-friendly experience.",
    caseHref: "#",
    liveHref: "https://customers-eg.com/",
    mockSrc: "/assets/CT-Web.png",
  },
];

export default function HomeEn() {
  return (
    <>
      <Hero lang="en" />
      <OurServices lang="en" />
      <ProjectsCarousel lang="en" />
      <WhyChooseUs lang="en" />
      <ContactUs lang="en" />
    </>
  );
}
