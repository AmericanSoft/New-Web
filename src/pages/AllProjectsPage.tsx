import OurProject from "../components/OurPorject"; // اسم الملف اللي عندك
import SecNavbar from "@/components/SecNavbar";
import Footer from "@/components/Footer/Footer";

export default function AllProjectsPage() {
  return (
    <>
      <SecNavbar />
      <div className="pt-32"></div>
      <OurProject
       mode="json"
       jsonUrl="https://american-softwares.com/api/projects"
       internalLinkBase="/project" // لو عندك صفحة تفاصيل داخلية
     />
      <Footer />
    </>
  );
}
