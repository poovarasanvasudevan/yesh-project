import { Badge } from "flowbite-react";
import Dropdown from "../form/dropdown.jsx";


export const StatusRenderer = ({value}) => {
  return (
    <div className={'flex h-full items-center'}>
    <Badge color="warning">{value}</Badge>
    </div>
  )
}

export const JobAuditAction = (params) => {
  return (
    <Dropdown
      options={[
        "Step Audit",
        "Logs",
        "Re-Run",
        "Force Complete",
      ]}
      render={
        <span className={'px-3 py-1 bg-blue-500 text-[11px] text-white rounded'}>Open Action</span>
      }
    />
  )
}