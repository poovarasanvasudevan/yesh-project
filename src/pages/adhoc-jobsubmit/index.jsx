import { Alert, Select, TextInput } from "flowbite-react";
import { useSetState } from "ahooks";
import { useLoginStore } from "../../core/states/login-store.jsx";
import { useEffect } from "react";
import { FormControlItem } from "../../components/form/control.jsx";
import { useEnv } from "../../core/states/env-store.jsx";

export const AdhocJobSubmit = () => {

  const [state, setState] = useSetState({
    hasAccess: false,
    formType: '',
    errors: {
      queryIds: '',
      sessionIds: '',
      transactionIds: '',
    }
  })
  const { isLoggedIn } = useLoginStore()
  const { env, appCode} = useEnv()

  useEffect(() => {
    checkAccess()
  }, [])

  const menus = [
    {id: 'snowFlake', label: 'Kill Snowflake Query'},
    {id: 'deleteS3Files', label: 'Delete S3 Files'},
    {id: 'killEMR', label: 'EMR Operation'},
    {id: 'falconOperation', label: 'Falcon Operation'},
    {id: 'copyS3Files', label: 'Copy S3 Files'},
  ]

  const checkAccess = () => {
    if (isLoggedIn) {
      setState({ hasAccess: true })
    }
  }

  const onChangeFormType = (e) => {
    setState({ formType: e.target.value })
  }

  return (
    <>
      <div className={'p-4'}>
        <div className={'font-semibold text-[20px]'}>Adhoc Job Submit</div>
      </div>

      <div className={'flex-1 flex flex-col items-start h-[100%] px-4'}>

        <Select sizing={'sm'} disabled={state.hasAccess} onChange={onChangeFormType}>
          {menus.map((menu) => (
            <option key={menu.id} value={menu.id}>{menu.label}</option>
          ))}
        </Select>

        {isLoggedIn ? (
          <div className={'text-[14px] pt-4'}>You are not logged in. Please login to Perform updates.</div>
        ) : (
          <Alert color={'gray'} className={'mt-2'}>*Note: You should be a part of Admin Group  in order to perform Adhoc Job Submission</Alert>
        )}

        <div className={'h-6'}></div>
        {state.formType === 'snowFlake' && (
          <div className={'flex flex-col space-y-2'}>
            <FormControlItem label={'Application Code'} id={'appcode'}>
              <TextInput id={'appcode'} required sizing={'sm'} value={appCode} disabled className={'w-[500px]'} />
            </FormControlItem>

            <FormControlItem label={'Environment'} id={'env'}>
              <TextInput id={'env'} required sizing={'sm'} value={env} disabled className={'w-[500px]'} />
            </FormControlItem>
          </div>
        )}

      </div>
    </>
  );
}