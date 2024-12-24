import Box from "@mui/joy/Box";
import Sidebar from "../sidebar/sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100%", flex: 1 }}>
      <Sidebar />

      <Box
        component="main"
        className="MainContent"
        sx={{
          px: { xs: 2, md: 4 },
          // pt: {
          //   xs: "calc(12px + var(--Header-height))",
          //   sm: "calc(12px + var(--Header-height))",
          //   md: 3,
          // },
          flex: 1,
          py: 2,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          height: "100%",
          gap: 1,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
