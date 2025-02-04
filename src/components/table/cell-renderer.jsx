import { Badge } from "flowbite-react";


export const StatusRenderer = ({ value }) => {
  return (
    <Badge color="warning">{value}</Badge>
  )
}