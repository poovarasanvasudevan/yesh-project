import { Label } from "flowbite-react";

export const FormControlItem = ({ label, children, id }) => {
  return (
    <div>
      <div className="mb-1 block">
        <Label htmlFor={id} value={label} />
      </div>
      {children}
    </div>
  )
}