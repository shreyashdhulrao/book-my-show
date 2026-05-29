import Sidebar from "./sidebar";
import Header from "./header";
import { Outlet } from "react-router-dom"

const Layout = () => {
  
  return (
    <div className="flex min-h-screen font-sfpro">
      {/* Sidebar */}
      <Sidebar />
      {/* Right Section */}
      <div className="flex flex-col flex-1">
        {/* Header (Top) */}
        <Header />
        {/* Page Content */}
        <div className="p-3 bg-zinc-100 dark:bg-zinc-800 flex-1 h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;