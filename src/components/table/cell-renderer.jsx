import { Badge } from "flowbite-react";


export const StatusRenderer = ({ value }) => {
  return (
    <Badge color="warning" className={'flex justify-center items-center'}>{value}</Badge>
  )
}