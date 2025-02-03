import { useLoginStore } from "../../core/states/login-store";
import { useSetState } from "ahooks";
import { Alert , Label, Select, TextInput, Button, Textarea } from "flowbite-react";
import { IoIosAdd, IoIosTrash } from "react-icons/io";

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


  const FormControlItem = ({ label, children, id }) => {
    return (
      <div>
        <div className="mb-2 block">
          <Label htmlFor={id} value={label} />
        </div>
        {children}
      </div>
    )
  }

  return (
    <>
      <h4>
        Ad-hoc Updates
      </h4>

      <div className={'flex-1 flex h-[100%]'}>
        {isLoggedIn ? (
          <Alert color="warning">Login to Perform Updates</Alert>
        ) : (
          <div className={'flex px-4 gap-8'}>
            <div className={'flex flex-col gap-1 w-[700px]'}>

              <FormControlItem label="Table Name" id="table-name">
                <Select id="table-name" required>
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
                      <Select id="table-name" required>
                        <option value={'dev'}>DEV</option>
                        <option value={'sit'}>SIT</option>
                        <option value={'uat'}>UAT</option>
                        <option value={'prod'}>PROD</option>
                      </Select>
                    </FormControlItem>

                    <FormControlItem label={'Column Name'} id={'column-name'}>
                      <TextInput id={'column-name'} required />
                    </FormControlItem>



                    <div className={'flex pt-3 gap-1'} >
                      <Button
                        variant="soft"
                        color="primary"
                        size="sm"
                        sx={{ height: 32 }}
                        onClick={onAddColumn}
                      >
                        <IoIosAdd />
                      </Button>

                      {index > 0 && (
                        <Button
                          variant="soft"
                          size="sm"
                          color="danger"
                          onClick={() => onDeleteColumn(index)}
                          sx={{ height: 32 }}
                        >
                          <IoIosTrash />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <FormControlItem label="Query" id="Query">
                  <Textarea id="Query" required  placeholder="Where aplctn_cd='ALL'" className={'w-[680px]'} />
              </FormControlItem>

              <div>
                <Button variant="solid" color="primary" size="sm">
                  Submit
                </Button>
              </div>
            </div>
            <div className={'flex flex-col gap-2 w-[350px]'}>
              <div className={'px-2 py-2 rounded'}>
                <ul>
                  <li>
                    <div >
                      <b>Disclaimer:</b> Update command will be formed as is
                      provided by User
                    </div>
                  </li>
                  <li>
                    <div>
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
