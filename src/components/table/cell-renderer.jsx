import { Badge, Button, Dropdown } from "flowbite-react";


export const StatusRenderer = ({ value }) => {
  return (
    <Badge color="warning" className={'flex justify-center items-center'}>{value}</Badge>
  )
}

export const JobAuditAction = (params) => {
  return (
    <Dropdown label="Open Action" dismissOnClick={false}>
      <Dropdown.Item>Step Audit</Dropdown.Item>
      <Dropdown.Item>Logs</Dropdown.Item>
      <Dropdown.Item>Re-Run</Dropdown.Item>
      <Dropdown.Item>Force Complete</Dropdown.Item>
    </Dropdown>
  )
}