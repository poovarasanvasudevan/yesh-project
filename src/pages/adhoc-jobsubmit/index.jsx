import { Alert, Button, Select, TextInput } from "flowbite-react";
import { useSetState } from "ahooks";
import { useLoginStore } from "../../core/states/login-store.jsx";
import { useEffect } from "react";
import { FormControlItem } from "../../components/form/control.jsx";
import { useEnv } from "../../core/states/env-store.jsx";
import { getBaseURL } from "../../core/api/api-values.jsx";
import { useAlertDialog } from "../../components/dialogs/alert-dialog.jsx";

export const AdhocJobSubmit = () => {

  const [state, setState] = useSetState({
    hasAccess: false,
    formType: '',
    loading: false,
    errors: {
      queryIds: '',
      sessionIds: '',
      transactionIds: '',
      bucketName: '',
      keyName: '',
      srcBucketName: '',
      srcKeyName: '',
      targetBucketName: '',
      targetKeyName: '',
      falconStatsID: '',
      hostname: '',
      port: '',
      clusterId: '',
      stepId: '',
    },
    values: {
      queryIds: '',
      sessionIds: '',
      transactionIds: '',
      bucketName: '',
      keyName: '',
      srcBucketName: '',
      srcKeyName: '',
      targetBucketName: '',
      targetKeyName: '',
      action: 'copy',
      falconStatsID: '',
      hostname: '',
      port: '',
      clusterId: '',
      stepId: '',
    }
  })
  const {isLoggedIn, loggedInAttributes, userRoles} = useLoginStore()
  const {env, appCode} = useEnv()
  const { open , close } = useAlertDialog()

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
    } catch (e) {
      return false
    }
  }

  const isEmptyJSON = (value) => {
    try {
      return JSON.parse(value).length === 0
    } catch (e) {
      return false
    }
  }

  const submitForm = () => {
    if (validateForm()) {
      if (state.formType === 'snowFlake') {
        callAPI({
          env: env,
          reqstr_id: loggedInAttributes,
          process_type: "killSFQuery",
          aplctn_cd: appCode,
          user_role: userRoles || [],
          etl_stp_parms: {
            env: env,
            aplctn_cd: appCode,
            query_ids: JSON.parse(state.values.queryIds),
            session_ids: JSON.parse(state.values.sessionIds),
            transaction_ids: JSON.parse(state.values.transactionIds)
          }
        })
      }

      if (state.formType === 'deleteS3Files') {
        callAPI({
          env: env,
          reqstr_id: loggedInAttributes,
          process_type: "s3deletefiles",
          aplctn_cd: appCode,
          user_role: userRoles || [],
          etl_stp_parms: {
            bucket_name: state.values.bucketName,
            bucket_key: state.values.keyName
          }
        })
      }

      if (state.formType === 'copyS3Files') {
        callAPI({
          env: env,
          reqstr_id: loggedInAttributes,
          process_type: "s3tos3copy",
          aplctn_cd: appCode,
          user_role: userRoles || [],
          action: state.values.action,
          etl_stp_parms: {
            src_bkt: state.values.srcBucketName,
            src_key: state.values.srcKeyName,
            trgt_bkt: state.values.targetBucketName,
            trgt_key: state.values.targetKeyName
          }
        })
      }

      if (state.formType === 'falconOperation') {
        let input = {
          env: env,
          reqstr_id: loggedInAttributes,
          process_type: "falconOperation",
          aplctn_cd: appCode,
          etl_stp_parms: {}
        }

        if (state.values.action === "checkConnectivity") {
          input.action ='check-connectivity'
          input.etl_stp_parms = {
            hostname: JSON.parse(state.values.hostname.split(",")),
            port: JSON.parse(state.values.port.split(",")),
            cluster_id: JSON.parse(state.values.clusterId.split(","))
          }
        } else {
          input.action = 'kill-falcon-job'
          input.etl_stp_parms = {
            falcon_stats_id: JSON.parse(state.values.falconStatsID.split(","))
          }
        }

        callAPI(input)
      }

      if (state.formType === 'killEMR') {
        let input = {
          env: env,
          reqstr_id: loggedInAttributes,
          process_type: "EmrOperation",
          aplctn_cd: appCode,
          etl_stp_parms: {}
        }

        if (state.values.action === "killjob") {
          input.action = 'killjob'
          input.etl_stp_parms = {
            cluster_id: JSON.parse(state.values.clusterId.split(","))
          }
        } else {
          input.etl_stp_parms.Action='killstep'
          input.etl_stp_parms = {
            cluster_id: JSON.parse(state.values.clusterId.split(",")),
            step_id: JSON.parse(state.values.stepId.split(","))
          }
        }

        callAPI(input)
      }
    }
  }

  const callAPI = (input) => {
    setState({loading: true})
    fetch(getBaseURL(env) + `jobrerun?env=${env}`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(input),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.text())
      .then((result) => {
        setState({loading: false})
        open({title: 'Success', message: result })
      })
      .catch(err => {
        setState({loading: false})
        open({title: 'Error', message: 'Job Submission Failed'})
      })

  }


  const resetForm = () => {
    setState({
      errors: {
        queryIds: '',
        sessionIds: '',
        transactionIds: '',
        bucketName: '',
        keyName: '',
        srcBucketName: '',
        srcKeyName: '',
        targetBucketName: '',
        targetKeyName: '',
        falconStatsID: '',
        hostname: '',
        port: '',
        clusterId: ''

      },
      values: {
        queryIds: '',
        sessionIds: '',
        transactionIds: '',
        bucketName: '',
        keyName: '',
        srcBucketName: '',
        srcKeyName: '',
        targetBucketName: '',
        targetKeyName: '',
        action: 'copy',
        falconStatsID: '',
        hostname: '',
        port: '',
        clusterId: ''
      }
    })
  }

  const validateForm = () => {
    setState({
      errors: {
        queryIds: '',
        sessionIds: '',
        transactionIds: '',
        bucketName: '',
        keyName: '',
        srcBucketName: '',
        srcKeyName: '',
        targetBucketName: '',
        targetKeyName: '',
        falconStatsID: '',
        hostname: '',
        port: '',
        clusterId: ''
      }
    })

    if (state.formType === 'snowFlake') {
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

    if (state.formType === 'deleteS3Files') {
      if (!state.values.bucketName || !state.values.bucketName.trim().length > 0) {
        setState({errors: {bucketName: 'Bucket Name is required'}})
        return false
      }

      if (!state.values.keyName || !state.values.keyName.trim().length > 0) {
        setState({errors: {keyName: 'Key Name is required'}})
        return false
      }
    }

    if (state.formType === 'copyS3Files') {
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

    if (state.formType === 'falconOperation') {
      // validate
      if (state.values.action === 'killfalconStats') {
        if (!state.values.falconStatsID || !state.values.falconStatsID.trim().length > 0) {
          setState({errors: {falconStatsID: 'Falcon Stats ID is required'}})
          return false
        }
      }

      if (state.values.action === 'checkConnectivity') {
        if (!state.values.hostname || !state.values.hostname.trim().length > 0) {
          setState({errors: {hostname: 'Hostname is required'}})
          return false
        }

        if (!state.values.port || !state.values.port.trim().length > 0) {
          setState({errors: {port: 'Port is required'}})
          return false
        }

        if (!state.values.clusterId || !state.values.clusterId.trim().length > 0) {
          setState({errors: {clusterId: 'Cluster ID is required'}})
          return false
        }
      }
    }

    if (state.formType === 'killEMR') {
      if (state.values.action === 'killemrstep') {
        if (!state.values.clusterId || !state.values.clusterId.trim().length > 0) {
          setState({errors: {clusterId: 'Cluster ID is required'}})
          return false
        }

        if (!state.values.stepId || !state.values.stepId.trim().length > 0) {
          setState({errors: {stepId: 'Step ID is required'}})
          return false
        }
      }

      if (state.values.action === 'killjob') {
        if (!state.values.clusterId || !state.values.clusterId.trim().length > 0) {
          setState({errors: {clusterId: 'Cluster ID is required'}})
          return false
        }
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
              <TextInput id={'transactionIds'} sizing={'sm'} value={state.values.transactionIds}
                         onChange={(e) => onChangeValues('transactionIds', e.target.value)}
                         className={'w-full'}/>
            </FormControlItem>

            <div className={'h-3'}></div>
            <div className={'flex justify-end space-x-3 mt-4'}>
              <Button size="xs" onClick={submitForm} disabled={state.loading}>Submit</Button>
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
              <Button size="xs" onClick={submitForm} disabled={state.loading}>Submit</Button>
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
              <Select id={'action'} required sizing={'sm'} value={state.action} className={'w-full'}>
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
              <Button size="xs" onClick={submitForm} disabled={state.loading}>Submit</Button>
              <Button color="gray" size="xs" onClick={resetForm}>Cancel</Button>
            </div>
          </div>
        )}

        {state.formType === 'falconOperation' && (
          <div className={'flex flex-col space-y-2 w-[600px]'}>
            <FormControlItem label={'Application Code'} id={'appcode'}>
              <TextInput id={'appcode'} required sizing={'sm'} value={appCode} disabled className={'w-full'}/>
            </FormControlItem>

            <FormControlItem label={'Environment'} id={'env'}>
              <TextInput id={'env'} required sizing={'sm'} value={env} disabled className={'w-full'}/>
            </FormControlItem>

            <FormControlItem label={'Action'} id={'env'}>
              <Select id={'action'} required sizing={'sm'} value={state.action} className={'w-full'} onChange={(e) => onChangeValues('action', e.target.value)}>
                <option value={''}></option>
                <option value={'killfalconStats'}>Kill Falcon Job</option>
                <option value={'checkConnectivity'}>Check Connectivity</option>
              </Select>
            </FormControlItem>

            {state.values.action === 'checkConnectivity' && (
              <>
                <FormControlItem required label={'Hostname'} id={'hostname'} error={state.errors.hostname}>
                  <TextInput id={'hostname'} required sizing={'sm'} value={state.values.hostname}
                             onChange={(e) => onChangeValues('hostname', e.target.value)}
                             className={'w-full'}/>
                </FormControlItem>

                <FormControlItem required label={'Port'} id={'port'} error={state.errors.port}>
                  <TextInput id={'port'} required sizing={'sm'} value={state.values.port}
                             onChange={(e) => onChangeValues('port', e.target.value)}
                             className={'w-full'}/>
                </FormControlItem>

                <FormControlItem required label={'Cluster ID'} id={'clusterId'} error={state.errors.clusterId}>
                  <TextInput id={'clusterId'} required sizing={'sm'} value={state.values.clusterId}
                             onChange={(e) => onChangeValues('clusterId', e.target.value)}
                             className={'w-full'}/>
                </FormControlItem>
              </>
            )}
            {state.values.action === 'killfalconStats' && (
              <FormControlItem required label={'Falcon stats ID'} id={'falconStatsID'} error={state.errors.falconStatsID}>
                <TextInput id={'falconStatsID'} required sizing={'sm'} value={state.values.falconStatsID}
                           onChange={(e) => onChangeValues('falconStatsID', e.target.value)}
                           className={'w-full'}/>
              </FormControlItem>
            )}


            <div className={'h-3'}></div>
            <div className={'flex justify-end space-x-3 mt-4'}>
              <Button size="xs" onClick={submitForm} disabled={state.loading}>Submit</Button>
              <Button color="gray" size="xs" onClick={resetForm}>Cancel</Button>
            </div>
          </div>
        )}

        {state.formType === 'killEMR' && (
          <div className={'flex flex-col space-y-2 w-[600px]'}>
            <FormControlItem label={'Application Code'} id={'appcode'}>
              <TextInput id={'appcode'} required sizing={'sm'} value={appCode} disabled className={'w-full'}/>
            </FormControlItem>

            <FormControlItem label={'Environment'} id={'env'}>
              <TextInput id={'env'} required sizing={'sm'} value={env} disabled className={'w-full'}/>
            </FormControlItem>

            <FormControlItem label={'Action'} id={'env'}>
              <Select id={'action'} required sizing={'sm'} value={state.action} className={'w-full'} onChange={(e) => onChangeValues('action', e.target.value)}>
                <option value={''}></option>
                <option value={'killjob'}>Kill EMR Cluster</option>
                <option value={'killemrstep'}>Kill EMR Step</option>
              </Select>
            </FormControlItem>

            {state.values.action === 'killemrstep' && (
              <>
                <FormControlItem required label={'Cluster ID'} id={'clusterId'} error={state.errors.clusterId}>
                  <TextInput id={'clusterId'} required sizing={'sm'} value={state.values.clusterId}
                             onChange={(e) => onChangeValues('clusterId', e.target.value)}
                             className={'w-full'}/>
                </FormControlItem>

                <FormControlItem required label={'StepId'} id={'stepId'} error={state.errors.stepId}>
                  <TextInput id={'stepId'} required sizing={'sm'} value={state.values.stepId}
                             onChange={(e) => onChangeValues('stepId', e.target.value)}
                             className={'w-full'}/>
                </FormControlItem>
              </>
            )}
            {state.values.action === 'killjob' && (
              <FormControlItem required label={'Cluster ID'} id={'clusterId'} error={state.errors.clusterId}>
                <TextInput id={'clusterId'} required sizing={'sm'} value={state.values.clusterId}
                           onChange={(e) => onChangeValues('clusterId', e.target.value)}
                           className={'w-full'}/>
              </FormControlItem>
            )}


            <div className={'h-3'}></div>
            <div className={'flex justify-end space-x-3 mt-4'}>
              <Button size="xs" onClick={submitForm} disabled={state.loading}>Submit</Button>
              <Button color="gray" size="xs" onClick={resetForm}>Cancel</Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}