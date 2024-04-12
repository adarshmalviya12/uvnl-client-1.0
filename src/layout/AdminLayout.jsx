import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import BASE_URL from "../constant";
import AdminHeader from "../components/admin/AdminHeader";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { setUser } = useAuth();
  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/admin-details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.data.user);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className=" bg-meta-2 dark:bg-boxdark-2 dark:text-bodydark ">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <AdminSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <AdminHeader
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main className="">
            <div className=" mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};
export default AdminLayout;
