import { DialogSkeleton } from "./dialog-skeleton.jsx";
import { useModal } from "@saimin/react-modal-manager";
import { Button } from "flowbite-react";


export const AlertDialog = ({message, title, name}) => {
  const {close} = useModal();
  return (
    <DialogSkeleton
      title={title}
      footer={
        <div className={'flex justify-end px-2 py-2'}>
          <Button onClick={() => close(name)} color={'failure'} size={'xs'}>Close</Button>
        </div>
      }
      className={'w-[400px] h-[200px]'}
    >
      <div className={'p-4'}>{message}</div>
    </DialogSkeleton>
  )
}


export const useAlertDialog = () => {
  const {open: OpenDialog, close } = useModal();

  return {
    open: ({message, title}) => {
      OpenDialog('alert-dialog', {
        content: <AlertDialog message={message} title={title} name={'alert-dialog'}/>
      })
    },
    close: () => {
      close('alert-dialog')
    }
  }
}