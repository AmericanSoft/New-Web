import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Admintool/Sidebar";

const   AdminDashboard= ()=> {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  }

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-grow-1 p-4 bg-light">
        {/* Header with logout button */}
        <div className="d-flex justify-content-end mb-4">
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>

        {/* Page content */}
        <Outlet />
      </div>
    </div>
  );
}
export default AdminDashboard ;