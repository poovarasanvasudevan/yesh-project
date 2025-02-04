import { Badge } from "flowbite-react";
import { DropdownMenu } from "../form/dropdown.jsx";


export const StatusRenderer = ({value}) => {
  return (
    <Badge color="warning" className={'flex justify-center items-center'}>{value}</Badge>
  )
}

export const JobAuditAction = (params) => {
  return (
    <DropdownMenu
      options={[
        {id: 'step-audit', label: 'Step Audit'},
        {id: 'logs', label: 'Logs'},
        {id: 're-run', label: 'Re-Run'},
        {id: 'force-complete', label: 'Force Complete'},
      ]}
      render={
        <span className={'px-1 py-1 bg-blue-500 text-[11px] text-white rounded'}>Open Action</span>
      }
    />
  )
}