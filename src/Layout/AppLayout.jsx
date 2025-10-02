import Footer from "../components/Footer/Footer.jsx";
import Header from "../components/Header.jsx";
import { Outlet } from "react-router-dom"; 

export default function AppLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
     </div>
  );
}
