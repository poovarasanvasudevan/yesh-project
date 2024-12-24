import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardLayout from "../components/layout/layout.jsx";
import JobAudit from "../pages/job-audit/index.jsx";
import AdhocUpdate from "../pages/adhoc-update/index.jsx";
import OrchestratorAudit from "../pages/orchestrator-audit/index.jsx";
import AdhocSupport from "../pages/adhoc-support/index.jsx";


const AppRouter = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          path: "",
          element: <JobAudit />,
        },
        {
          path: "adhoc-update",
          element: <AdhocUpdate />,
        },
        {
          path: "orchestrator-audit",
          element: <OrchestratorAudit />,
        },
        {
          path: "adhoc-support",
          element: <AdhocSupport />,
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={ router } />
  )
}

export default AppRouter