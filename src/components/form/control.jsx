import { Label } from "flowbite-react";

export const FormControlItem = ({ label, children, id, className, error }) => {
  return (
    <div className={className}>
      <div className="mb-1 block">
        <Label htmlFor={id} value={label} />
      </div>
      {children}

      {error && (
        <div className={'text-red-500 text-sm'}>{error}</div>
      )}
    </div>
  )
}