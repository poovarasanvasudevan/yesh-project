import AppSidebar from "../sidebar/sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className={"flex min-h-[100%] flex-1"}>
      <AppSidebar />

      <div className="MainContent overflow-y-auto px-4 flex-1 py-2 flex flex-col min-w-0 h-[100%] gap-1">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
