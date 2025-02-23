import { Badge } from "flowbite-react";
import Dropdown from "../form/dropdown.jsx";
import { useLoginStore } from "../../core/states/login-store.jsx";

export const StatusRenderer = ({value}) => {
  return (
    <div className={'flex h-full items-center'}>
    <Badge color="warning">{value}</Badge>
    </div>
  )
}

export const JobAuditAction = (params) => {

  const  { isLoggedIn } = useLoginStore();

  const status = params.data.job_stts === "IN-PROGRESS";
  const isHide = !isLoggedIn;
  const abandonStatus = !(params.data.job_stts !== "SUCCEEDED" && params.data.job_stts !== "SUCCEEDED_REPROCESSED");
  const access = isLoggedIn
  const isFailedOrAb = params.data.job_stts === "FAILED" || params.data.job_stts === "ABANDONED";
  const rerunShow = params.data.job_stts.endsWith("_REPROCESSED")

  const options = ["Step Audit","Logs"]
  if(!status && access && !isHide && !rerunShow) {
    options.push("Re-Run")
  }

  if(isFailedOrAb && !isHide) {
    options.push("Force Complete")
  }

  const onClick = ( e ) => {
    if (params.onClick instanceof Function) {
      const retParams = {
        event: "click",
        rowData: params.node.data,
        selection: e,
      };
      params.onClick(retParams);
    }
  }

  return (
    <Dropdown
      options={[
        "Step Audit",
        "Logs",
        "Re-Run",
        "Force Complete",
      ]}
      onChange={onClick}
      render={
        <span className={'px-3 py-1 bg-blue-500 text-[11px] text-white rounded'}>Open Action</span>
      }
    />
  )
}