import OurProject from "../components/OurPorject"; // اسم الملف اللي عندك
import SecNavbar from "@/components/SecNavbar";
import Footer from "@/components/Footer/Footer";

export default function AllProjectsPage() {
  return (
    <>
      <SecNavbar />
      <div className="pt-32"></div>
      <OurProject
        rtl
        mode="wordpress"
        wpBase="https://your-site.com"
        categories={{ web: "web", mobile: "mobile", seo: "seo" }}
        perPage={18}
        useProxy={true}         // في الإنتاج الأفضل تعمل API Route وتخلي false
        internalLinkBase="/project"
        
      />
      <Footer />
    </>
  );
}
