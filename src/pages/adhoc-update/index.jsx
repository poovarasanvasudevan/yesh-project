import { useLoginStore } from "../../core/states/login-store";
import { useSetState } from "ahooks";
import { Alert , Select, TextInput, Button, Textarea } from "flowbite-react";
import { IoIosAdd, IoIosTrash } from "react-icons/io";
import { FormControlItem } from "../../components/form/control.jsx";

const AdhocUpdate = () => {
  const { isLoggedIn } = useLoginStore();

  const [state, setState] = useSetState({
    columns: [
      {
        name: "",
        value: "",
      },
    ],
  });

  const onAddColumn = () => {
    setState((prev) => ({
      columns: [...prev.columns, { name: "", value: "" }],
    }));
  };

  const onDeleteColumn = (index) => {
    setState((prev) => {
      const columns = [...prev.columns];
      columns.splice(index, 1);
      return { columns };
    });
  };


  return (
    <>
      <div className={'p-4'}>
        <div className={'font-semibold text-[20px]'}>Ad-hoc Updates</div>
      </div>

      <div className={'flex-1 flex h-[100%]'}>
        {isLoggedIn ? (
          <Alert color="warning">Login to Perform Updates</Alert>
        ) : (
          <div className={'flex px-4 gap-8'}>
            <div className={'flex flex-col gap-1 w-[700px]'}>

              <FormControlItem label="Table Name" id="table-name">
                <Select id="table-name" required sizing={'sm'}>
                  <option value={'dev'}>DEV</option>
                  <option value={'sit'}>SIT</option>
                  <option value={'uat'}>UAT</option>
                  <option value={'prod'}>PROD</option>
                </Select>
              </FormControlItem>

              <div className={'flex flex-col gap-1 pt-2'}>
                {state.columns.map((column, index) => (
                  <div className={'flex flex-row gap-2'} key={'x' + index}>

                    <FormControlItem label="Column Name" id="column-name">
                      <Select id="table-name" required sizing={'sm'} className={'w-[200px]'}>
                        <option value={'dev'}>DEV</option>
                        <option value={'sit'}>SIT</option>
                        <option value={'uat'}>UAT</option>
                        <option value={'prod'}>PROD</option>
                      </Select>
                    </FormControlItem>

                    <FormControlItem label={'Column Name'} id={'column-name'}>
                      <TextInput id={'column-name'} required sizing={'sm'} className={'w-[300px]'} />
                    </FormControlItem>



                    <div className={'flex pt-3 gap-1 items-end'} >
                      <Button size="xs" onClick={onAddColumn}>
                        <IoIosAdd size={20} />
                      </Button>

                      {index > 0 && (
                        <Button
                          size="xs"
                          color="failure"
                          onClick={() => onDeleteColumn(index)}
                        >
                          <IoIosTrash  size={20} />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <FormControlItem label="Query" id="Query" className={'mt-2'}>
                  <Textarea id="Query" required rows={8} placeholder="Where aplctn_cd='ALL'" className={'w-full'} />
              </FormControlItem>

              <div className={'mt-3'}>
                <Button  size="xs">
                  Submit
                </Button>
              </div>
            </div>
            <div className={'flex flex-col gap-2 w-[350px]'}>
              <div className={'px-2 py-2 rounded'}>
                <ul>
                  <li>
                    <div className={'text-[15px]'}>
                      <b>Disclaimer:</b> Update command will be formed as is
                      provided by User
                    </div>
                  </li>
                  <li>
                    <div className={'text-gray-500 text-[15px]'}>
                      <b> *</b> Wrap column value with (') single quote
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdhocUpdate;
