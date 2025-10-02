import AppLayout from './Layout/AppLayout'
import Policies from './pages/Policies'
import Home from './pages/Home'
import HomeEn from './pages/HomeEn'
import { Routes, Route } from "react-router-dom";
import FAQ from './pages/FAQ';

export default function App() {
  return (
    <Routes>
      {/* عربي (بدون بادئة) */}
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="faq" element={<FAQ />} />
      </Route>

      {/* إنجليزي (/en) */}
      <Route path="/en" element={<AppLayout />}>
        <Route path="/en/policies" element={<Policies />} />
        <Route path="faq" element={<FAQ />} />  
        <Route index element={<HomeEn />} />
      </Route>
    </Routes>  )
}
