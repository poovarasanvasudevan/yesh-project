import { Badge, Dropdown } from "flowbite-react";


export const StatusRenderer = ({value}) => {
  return (
    <Badge color="warning" className={'flex justify-center items-center'}>{value}</Badge>
  )
}

export const JobAuditAction = (params) => {
  return (
    <Dropdown
      dismissOnClick={false}
      renderTrigger={() => <span className={'px-1 py-1 bg-blue-500'}>Open Action</span>}
    >
      <Dropdown.Item>Step Audit</Dropdown.Item>
      <Dropdown.Item>Logs</Dropdown.Item>
      <Dropdown.Item>Re-Run</Dropdown.Item>
      <Dropdown.Item>Force Complete</Dropdown.Item>
    </Dropdown>
  )
}