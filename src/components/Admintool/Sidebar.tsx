// Sidebar.tsx
import { NavLink } from "react-router-dom";
import { GoProject } from "react-icons/go";
import { FcBusinessContact } from "react-icons/fc";

export default function Sidebar() {
  const itemBase =
    "flex items-center gap-2 rounded-md px-3 py-2 transition focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <aside className="h-screen w-[250px] bg-gray-900 text-white p-4 sticky top-0">
      <h4 className="mb-6 text-xl font-semibold tracking-wide">Admin Panel</h4>

      <nav className="flex flex-col gap-2">
        <NavLink
          to="/ourprojects"
          className={({ isActive }) =>
            `${itemBase} ${isActive ? "bg-indigo-600 text-white" : "text-gray-200 hover:bg-gray-800 hover:text-white"}`
          }
        >
          <GoProject className="text-lg" />
          <span>Projects</span>
        </NavLink>

        <NavLink
          to="/ourcontacts"
          className={({ isActive }) =>
            `${itemBase} ${isActive ? "bg-indigo-600 text-white" : "text-gray-200 hover:bg-gray-800 hover:text-white"}`
          }
        >
          <FcBusinessContact className="text-lg" />
          <span>Contact Us</span>
        </NavLink>
      </nav>
    </aside>
  );
}
