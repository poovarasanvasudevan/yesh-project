import { Label } from "flowbite-react";

export const FormControlItem = ({ label, children, id, className, error , required }) => {
  return (
    <div className={className}>
      <div className="mb-0.5 block">
        <Label htmlFor={id} value={label} /> {required && <span className={'text-red-500'}>*</span>}
      </div>
      {children}

      {error && (
        <div className={'text-red-500 text-sm'}>{error}</div>
      )}
    </div>
  )
}