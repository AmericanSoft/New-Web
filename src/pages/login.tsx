import React, { useEffect, useState } from "react";
import { RiMoonClearLine, RiSunLine } from "react-icons/ri";
import LoginForm from "@/components/Loginform";



/* ================= Layout with Theme Toggle ================= */
const LoginPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-[#161a23] relative overflow-hidden">
      {/* زخرفة خفيفة */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-[40rem] h-[40rem] rounded-full bg-indigo-300/20 dark:bg-indigo-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-[36rem] h-[36rem] rounded-full bg-emerald-300/20 dark:bg-emerald-500/10 blur-3xl" />

      {/* زر تبديل الثيم */}
      <button
        onClick={() => setDark((v) => !v)}
        className="absolute top-4 right-4 p-2 rounded-full text-gray-800 bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 transition"
        aria-label="Toggle theme"
        title="Toggle theme"
      >
        {dark ? <RiSunLine className="text-xl" /> : <RiMoonClearLine className="text-xl" />}
      </button>

      {/* البطاقة */}
      <div className="w-[410px] max-w-[92vw] rounded-2xl bg-white dark:bg-[#252836] text-gray-900 dark:text-white shadow-2xl p-8 relative">
        <LoginForm/>
      </div>
    </div>
  );
};


/* ================= Pages ================= */

export default LoginPage; 


