import { useLoginStore } from "../../core/states/login-store";
import { useSetState } from "ahooks";
import { FormControlItem } from "../form/control.jsx";
import { Button, Select, TextInput } from "flowbite-react";
import { BiLock } from "react-icons/bi";
import { useModal } from "@saimin/react-modal-manager";

const LoginModal = ( { name }) => {
  const { openLoginDialog, setOpenLoginDialog } = useLoginStore();
  const [state, setState] = useSetState({
    loading: false,
    btnText: "Validate",
  });

  const { close } = useModal()

  const dpValues = Array.from({ length: 150 }, (_, i) => i + 1);
  return (
      <div className={'flex-1 flex w-[400px] bg-white flex-col p-6 rounded-lg'}>
        <div className={'flex items-center justify-center pb-4'}>
          <div className={'bg-blue-500 rounded-full p-2'}>
            <BiLock size={22} color={'white'}/>
          </div>
        </div>

        <FormControlItem label="Username" id="username">
          <TextInput id="username" required sizing={'sm'}/>
        </FormControlItem>

        <FormControlItem label="Password" id="password">
          <TextInput id="password" required sizing={'sm'} />
        </FormControlItem>


        <FormControlItem label="App Code" id="app-code">
          <Select id="app-code" sizing={'sm'}>
            {dpValues.map((val) => (
              <option value={val} key={val}>{val}</option>
            ))}
          </Select>
        </FormControlItem>

        <div className={'flex space-x-2'}>
          <div className={'flex-1'}></div>
          <Button color="blue" size="xs" className={'mt-4'}>{state.btnText}</Button>
          <Button color="failure" size="xs" className={'mt-4'} onClick={() => close(name)}>Cancel</Button>
        </div>
      </div>
  );
};

export default LoginModal;
