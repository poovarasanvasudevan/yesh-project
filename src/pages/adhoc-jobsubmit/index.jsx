import { Alert, Button, Select, TextInput } from "flowbite-react";
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
      bucketName:'',
      keyName:'',
      srcBucketName:'',
      srcKeyName:'',
      targetBucketName:'',
      targetKeyName:'',
    },
    values: {
      queryIds: '',
      sessionIds: '',
      transactionIds: '',
      bucketName:'',
      keyName:'',
      srcBucketName:'',
      srcKeyName:'',
      targetBucketName:'',
      targetKeyName:'',
      action: 'copy'
    }
  })
  const {isLoggedIn} = useLoginStore()
  const {env, appCode} = useEnv()

  useEffect(() => {
    checkAccess()
  }, [])

  const menus = [
    {id: '', label: ''},
    {id: 'snowFlake', label: 'Kill Snowflake Query'},
    {id: 'deleteS3Files', label: 'Delete S3 Files'},
    {id: 'killEMR', label: 'EMR Operation'},
    {id: 'falconOperation', label: 'Falcon Operation'},
    {id: 'copyS3Files', label: 'Copy S3 Files'},
  ]

  const checkAccess = () => {
    if (isLoggedIn) {
      setState({hasAccess: true})
    }
  }

  const onChangeFormType = (e) => {
    setState({formType: e.target.value})
  }

  const onChangeValues = (id, value) => {
    setState({values: {...state.values, [id]: value}})
  }


  const isJSONValid = (value) => {
    try {
      JSON.parse(value)
      return true
    }
    catch (e) {
      return false
    }
  }

  const isEmptyJSON = (value) => {
    try {
      return JSON.parse(value).length === 0
    }
    catch (e) {
      return false
    }
  }

  const submitForm = () => {
    if(validateForm()) {
      console.log('Form submitted')
    }
  }



  const resetForm = () => {
    setState({
      errors: {
        queryIds: '',
        sessionIds: '',
        transactionIds: '',
        bucketName:'',
        keyName:'',
        srcBucketName:'',
        srcKeyName:'',
        targetBucketName:'',
        targetKeyName:'',
      },
      values: {
        queryIds: '',
        sessionIds: '',
        transactionIds: '',
        bucketName:'',
        keyName:'',
        srcBucketName:'',
        srcKeyName:'',
        targetBucketName:'',
        targetKeyName:'',
        action: 'copy'
      }
    })
  }

  const validateForm = () => {
    setState({
      errors: {
        queryIds: '',
        sessionIds: '',
        transactionIds: '',
        bucketName:'',
        keyName:'',
        srcBucketName:'',
        srcKeyName:'',
        targetBucketName:'',
        targetKeyName:'',
      }
    })


    if(state.formType === 'snowFlake') {
      if (!state.values.queryIds || !isJSONValid(state.values.queryIds) || isEmptyJSON(state.values.queryIds)) {
        setState({errors: {queryIds: 'Invalid Query ID'}})
        return false
      }

      if (!state.values.sessionIds || !isJSONValid(state.values.sessionIds) || isEmptyJSON(state.values.sessionIds)) {
        setState({errors: {sessionIds: 'Invalid Session ID'}})
        return false
      }

      if (!state.values.transactionIds || !isJSONValid(state.values.transactionIds) || isEmptyJSON(state.values.transactionIds)) {
        setState({errors: {transactionIds: 'Invalid Transaction ID'}})
        return false
      }
    }

    if(state.formType === 'deleteS3Files') {
      if (!state.values.bucketName || !state.values.bucketName.trim().length > 0) {
        setState({errors: {bucketName: 'Bucket Name is required'}})
        return false
      }

      if (!state.values.keyName || !state.values.keyName.trim().length > 0) {
        setState({errors: {keyName: 'Key Name is required'}})
        return false
      }
    }

    if(state.formType === 'copyS3Files') {
      if (!state.values.srcBucketName || !state.values.srcBucketName.trim().length > 0) {
        setState({errors: {srcBucketName: 'Source Bucket Name is required'}})
        return false
      }

      if (!state.values.srcKeyName || !state.values.srcKeyName.trim().length > 0) {
        setState({errors: {srcKeyName: 'Source Key Name is required'}})
        return false
      }

      if (!state.values.targetBucketName || !state.values.targetBucketName.trim().length > 0) {
        setState({errors: {targetBucketName: 'Target Bucket Name is required'}})
        return false
      }

      if (!state.values.targetKeyName || !state.values.targetKeyName.trim().length > 0) {
        setState({errors: {targetKeyName: 'Target Key Name is required'}})
        return false
      }
    }
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
          <Alert color={'gray'} className={'mt-2'}>*Note: You should be a part of Admin Group in order to perform Adhoc Job Submission</Alert>
        )}

        <div className={'h-6'}></div>
        {state.formType === 'snowFlake' && (
          <div className={'flex flex-col space-y-2 w-[600px]'}>
            <FormControlItem label={'Application Code'} id={'appcode'}>
              <TextInput id={'appcode'} required sizing={'sm'} value={appCode} disabled className={'w-full'}/>
            </FormControlItem>

            <FormControlItem label={'Environment'} id={'env'}>
              <TextInput id={'env'} required sizing={'sm'} value={env} disabled className={'w-full'}/>
            </FormControlItem>


            <FormControlItem required label={'Query IDS'} id={'queryIds'} error={state.errors.queryIds}>
              <TextInput id={'queryIds'} required sizing={'sm'} value={state.values.queryIds}
                         onChange={(e) => onChangeValues('queryIds', e.target.value)}
                         className={'w-full'}/>
            </FormControlItem>
            <FormControlItem required label={'Session IDS'} id={'sessionIds'} error={state.errors.sessionIds}>
              <TextInput id={'sessionIds'} required sizing={'sm'} value={state.values.sessionIds}
                         onChange={(e) => onChangeValues('sessionIds', e.target.value)}
                         className={'w-full'}/>
            </FormControlItem>
            <FormControlItem required label={'Transaction IDS'} id={'transactionIds'} error={state.errors.transactionIds}>
              <TextInput id={'transactionIds'}  sizing={'sm'} value={state.values.transactionIds}
                         onChange={(e) => onChangeValues('transactionIds', e.target.value)}
                         className={'w-full'}/>
            </FormControlItem>

            <div className={'h-3'}></div>
            <div className={'flex justify-end space-x-3 mt-4'}>
              <Button color="blue" size="xs" onClick={submitForm}>Submit</Button>
              <Button color="gray" size="xs" onClick={resetForm}>Cancel</Button>
            </div>
          </div>
        )}

        {state.formType === 'deleteS3Files' && (
          <div className={'flex flex-col space-y-2 w-[600px]'}>
            <FormControlItem label={'Application Code'} id={'appcode'}>
              <TextInput id={'appcode'} required sizing={'sm'} value={appCode} disabled className={'w-full'}/>
            </FormControlItem>

            <FormControlItem label={'Environment'} id={'env'}>
              <TextInput id={'env'} required sizing={'sm'} value={env} disabled className={'w-full'}/>
            </FormControlItem>

            <FormControlItem required label={'Bucket Name'} id={'bucketName'} error={state.errors.bucketName}>
              <TextInput id={'bucketName'} required sizing={'sm'} value={state.values.bucketName}
                         onChange={(e) => onChangeValues('bucketName', e.target.value)}
                         className={'w-full'}/>
            </FormControlItem>
            <FormControlItem required label={'Key Name'} id={'keyName'} error={state.errors.keyName}>
              <TextInput id={'keyName'} required sizing={'sm'} value={state.values.keyName}
                         onChange={(e) => onChangeValues('keyName', e.target.value)}
                         className={'w-full'}/>
            </FormControlItem>

            <div className={'h-3'}></div>
            <div className={'flex justify-end space-x-3 mt-4'}>
              <Button color="blue" size="xs" onClick={submitForm}>Submit</Button>
              <Button color="gray" size="xs" onClick={resetForm}>Cancel</Button>
            </div>
          </div>
        )}
        {state.formType === 'copyS3Files' && (
          <div className={'flex flex-col space-y-2 w-[600px]'}>
            <FormControlItem label={'Application Code'} id={'appcode'}>
              <TextInput id={'appcode'} required sizing={'sm'} value={appCode} disabled className={'w-full'}/>
            </FormControlItem>

            <FormControlItem label={'Environment'} id={'env'}>
              <TextInput id={'env'} required sizing={'sm'} value={env} disabled className={'w-full'}/>
            </FormControlItem>

            <FormControlItem label={'Action'} id={'env'}>
              <Select id={'action'} required sizing={'sm'} value={state.action}  className={'w-full'}>
                <option value={'copy'}>Copy</option>
                <option value={'move'}>Move</option>
              </Select>
            </FormControlItem>

            <FormControlItem required label={'Source Bucket Name'} id={'srcBucketName'} error={state.errors.srcBucketName}>
              <TextInput id={'srcBucketName'} required sizing={'sm'} value={state.values.srcBucketName}
                         onChange={(e) => onChangeValues('srcBucketName', e.target.value)}
                         className={'w-full'}/>
            </FormControlItem>
            <FormControlItem required label={'Source Key Name'} id={'srcKeyName'} error={state.errors.srcKeyName}>
              <TextInput id={'srcKeyName'} required sizing={'sm'} value={state.values.srcKeyName}
                         onChange={(e) => onChangeValues('srcKeyName', e.target.value)}
                         className={'w-full'}/>
            </FormControlItem>


            <FormControlItem required label={'Target Bucket Name'} id={'targetBucketName'} error={state.errors.targetBucketName}>
              <TextInput id={'targetBucketName'} required sizing={'sm'} value={state.values.targetBucketName}
                         onChange={(e) => onChangeValues('targetBucketName', e.target.value)}
                         className={'w-full'}/>
            </FormControlItem>
            <FormControlItem required label={'Target Key Name'} id={'targetKeyName'} error={state.errors.targetKeyName}>
              <TextInput id={'targetKeyName'} required sizing={'sm'} value={state.values.targetKeyName}
                         onChange={(e) => onChangeValues('targetKeyName', e.target.value)}
                         className={'w-full'}/>
            </FormControlItem>


            <div className={'h-3'}></div>
            <div className={'flex justify-end space-x-3 mt-4'}>
              <Button color="blue" size="xs" onClick={submitForm}>Submit</Button>
              <Button color="gray" size="xs" onClick={resetForm}>Cancel</Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}