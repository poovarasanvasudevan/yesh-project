import { Badge } from "flowbite-react";
import { DropDownMenu } from "../form/dropdown.jsx";


export const StatusRenderer = ({value}) => {
  return (
    <div className={'flex h-full items-center'}>
    <Badge color="warning">{value}</Badge>
    </div>
  )
}

export const JobAuditAction = (params) => {
  return (
    <DropDownMenu
      options={[
        {id: 'step-audit', label: 'Step Audit'},
        {id: 'logs', label: 'Logs'},
        {id: 're-run', label: 'Re-Run'},
        {id: 'force-complete', label: 'Force Complete'},
      ]}
      render={
        <span className={'px-3 py-1 bg-blue-500 text-[11px] text-white rounded'}>Open Action</span>
      }
    />
  )
}