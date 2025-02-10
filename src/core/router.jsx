import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardLayout from "../components/layout/layout.jsx";
import JobAudit from "../pages/job-audit/index.jsx";
import AdhocUpdate from "../pages/adhoc-update/index.jsx";
import OrchestratorAudit from "../pages/orchestrator-audit/index.jsx";
import AdhocSupport from "../pages/adhoc-support/index.jsx";
import { AdhocJobSubmit } from "../pages/adhoc-jobsubmit/index.jsx";
import { CFXAudit } from "../pages/Auditing/CFXAudit.jsx";
import { FFZAudit } from "../pages/Auditing/FFZAudit.jsx";


const AppRouter = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <DashboardLayout/>,
      children: [
        {
          path: "",
          element: <JobAudit/>,
        },
        {
          path: "adhoc-update",
          element: <AdhocUpdate/>,
        },
        {
          path: "orchestrator-audit",
          element: <OrchestratorAudit/>,
        },
        {
          path: "adhoc-support",
          element: <AdhocSupport/>,
        },
        {
          path: "adhoc-jobsubmit",
          element: <AdhocJobSubmit/>
        }, {
          path: "cfx-audit",
          element: <CFXAudit/>
        },{
          path: "ffz-audit",
          element: <FFZAudit/>
        }
      ],
    },
  ]);

  return (
    <RouterProvider router={router}/>
  )
}

export default AppRouter