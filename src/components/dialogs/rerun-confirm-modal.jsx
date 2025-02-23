import { useSetState } from "ahooks";
import { getBaseURL } from "../../core/api/api-values.jsx";
import { useEnv } from "../../core/states/env-store.jsx";
import { useEffect } from "react";
import { useLoginStore } from "../../core/states/login-store.jsx";
import { CommonFunc } from "../../core/utils.jsx";
import { DialogSkeleton } from "./dialog-skeleton.jsx";
import { FormControlItem } from "../form/control.jsx";
import { Button, Checkbox, Label, Select, Textarea, TextInput } from "flowbite-react";
import { useModal } from "@saimin/react-modal-manager";

const RerunConfirmModal = ({rowData, screenName, handleStateUpdate, name}) => {
  const {env} = useEnv()
  const { close }= useModal()
  const {loggedInAttributes, userRoles} = useLoginStore();
  const [state, setState] = useSetState({
    show: false, job_id: '', etl_stp_nbr_lst: 'na', rerun_type: '', retry: '', edl_run_id: '', etl_sfn_parms: '{}', job_stts: '',
    failed_edl_run_id: '', disableReRunType: false, aplctn_cd: '', processingTypes: [], disableRerunButton: false,
    process_type_etl: false, process_type_ingest: false, enable_process_type: false, loading: false,
    disableParams: false, disableRetry: false, is_process_type_req: true, edl_run_id_ref: '', screen_nm: '',
    title: "",
    cfx: false,
    rowData: rowData,
    screenName: screenName,
    errors: {
      rerun_type: '',
      job_id: '',
      edl_run_id: '',
      etl_stp_nbr_lst: '',
      retry: '',
      etl_sfn_parms: '',
      process_type: '',
    },
  });

  useEffect(() => {

    if (screenName === "cfx_abandoned") {
      rowData.edl_run_id = rowData.trgt_edl_run_id
      setState({cfx: true, screenName: screenName, rowData: rowData});
    }

    if (screenName === "abandoned") {
      setState({
        edl_run_id: rowData.edl_run_id,
        aplctn_cd: rowData.aplctn_cd,
        show: true,
        rowData: rowData,
        title: "Abandon Job"
      });
    } else if (screenName === 'reprocess') {
      setState({
        edl_run_id: rowData.edl_run_id,
        aplctn_cd: rowData.aplctn_cd,
        show: true,
        rowData: rowData,
        title: "Reprocess Job",
        job_id: rowData.job_id,
      });
    } else {
      setState({
        rerun_type: '', retry: '', edl_run_id: '', etl_sfn_parms: '{}',
        failed_edl_run_id: '', process_type_etl: false, process_type_ingest: false, enable_process_type: false,
        show: true, job_id: rowData.job_id, job_stts: rowData.job_stts, aplctn_cd: rowData.aplctn_cd,
        etl_stp_nbr_lst: rowData.etl_stp_sqnc_nbr ? rowData.etl_stp_sqnc_nbr : 'na', title: "Re-Run Job",
        is_process_type_req: rowData.scrn_nm !== 'step_audit', edl_run_id_ref: rowData.edl_run_id
      });

      if (rowData.job_stts === 'SUCCEEDED') {
        setState({rerun_type: 'New', edl_run_id: 'na', disableReRunType: true})
      } else {
        setState({rerun_type: '', failed_edl_run_id: rowData.edl_run_id, edl_run_id: rowData.edl_run_id, disableReRunType: false})
      }

      let errors = state.errors;
      errors.rerun_type = errors.job_id = errors.edl_run_id = errors.edl_sfn_params = errors.etl_stp_nbr_lst = errors.retry = errors.etl_sfn_parms = errors.process_type = '';
      setState({errors: errors})

      if (rowData.scrn_nm !== 'step_audit') {
        loadProcessingType(rowData);
      }
    }


  }, [screenName, rowData]);


  const loadProcessingType = (rowData) => {
    fetch(getBaseURL(env) + `getprocessingtype?env=${env}&job_id=${rowData.job_id}`)
      .then(res => res.json())
      .then(result => {
        if (result.processing_type) {
          if (result.processing_type.length === 2) {
            setState({enable_process_type: true, disableReRunType: true});
          } else if (result.processing_type.length === 1 && result.processing_type[0] === 'etl') {
            setState({process_type_etl: true, disableParams: false, disableRetry: false,});
          } else if (result.processing_type.length === 1 && result.processing_type[0] === 'ingest') {
            setState({
              process_type_ingest: true, rerun_type: 'Reprocess', disableReRunType: true,
              disableParams: true, disableRetry: true, edl_run_id: rowData.edl_run_id, retry: "no"
            });
          } else {
            let errors = this.state.errors;
            errors.process_type = 'No processing type found for this job id. Can not rerun.';
            setState({errors, disableRerunButton: true});
          }
        }
        setState({loading: false});
      })
      .catch(err => console.log(err));
  }

  const handleClose = () => {
   close( name )
  }

  const executeApi = (inputData) => {
    setState({disableRerunButton: true})

    fetch(getBaseURL(env) + `rerunjob?env=${env}`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(inputData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.status !== 200) {
        response.text().then((x) => {
          setState({show: false, disableRerunButton: false})
          handleStateUpdate(x)
        })
      } else {
        response.text()
          .then(x => {
            setState({show: false, disableRerunButton: false});
            handleStateUpdate(x);
          })
      }
    })
  }

  const reProcessJob = () => {
    let abandoneData = {};
    abandoneData.env = env;
    abandoneData.aplctn_cd = state.aplctn_cd;
    abandoneData.reqstr_id = loggedInAttributes;
    abandoneData.usr_role = userRoles;
    abandoneData.process_type = 'stream';

    abandoneData.etl_stp_parms = {
      edl_run_id_lst: state.edl_run_id.split(',').map(id => id.trim()).filter(id => id !== ""),
    }

    executeApi(abandoneData);
  }

  const abandoneJob = () => {
    let abandoneData = {};
    let anthemId = loggedInAttributes;

    if (state.cfx) {

      abandoneData = {
        aplctn_cd: state.aplctn_cd,
        reqstr_id: anthemId,
        env: env,
        usr_role: userRoles,
        "process_type": "cfxjob_abandon",
        "etl_stp_parms": {
          edl_run_id: state.rowData.edl_run_id,
          trl_file_flag_ind: state.rowData.trl_file_flag_ind,
        }
      }
    } else {
      abandoneData.env = env;
      abandoneData.aplctn_cd = state.aplctn_cd;
      abandoneData.reqstr_id = anthemId;
      abandoneData.process_type = 'abandon';
      abandoneData.usr_role = userRoles;
      abandoneData.etl_stp_parms = {
        edl_run_id: state.edl_run_id
      }
    }

    executeApi(abandoneData);
  }


  const validateAllInputs = () => {
    if (!state.rerun_type || !state.job_id || !state.edl_run_id || !state.etl_stp_nbr_lst || !state.retry
      || (!state.process_type_etl && !state.process_type_ingest && state.is_process_type_req)) {
      return false;
    } else {
      return true;
    }
  };

  const rerunJob = () => {
    if (CommonFunc.validateForm(state.errors) && validateAllInputs()) {
      let reRunData = {};
      let etl_stp_nbr_lst = {};
      let edl_run_id_lst = {};
      let etl_sfn_parms_lst = [];
      let etl_sfn_parms = {};
      let anthemId = sessionStorage.getItem('anthem_id');

      reRunData.env = env;
      reRunData.aplctn_cd = state.aplctn_cd;
      reRunData.reqstr_id = anthemId;
      reRunData.usr_role = userRoles;
      if (!state.is_process_type_req)
        reRunData.process_type = 'etl';
      else
        reRunData.process_type = state.process_type_etl ? 'etl' : 'ingest';

      reRunData.etl_stp_parms = {
        trgt_job_id_lst: state.job_id,
        retry: state.retry,
        etl_stp_nbr_lst: {},
        edl_run_id_lst: {},
        etl_sfn_parms_lst: [],
      };
      etl_stp_nbr_lst[state.job_id] = state.etl_stp_nbr_lst;
      edl_run_id_lst[state.job_id] = state.edl_run_id;
      etl_sfn_parms[state.job_id] = state.etl_sfn_parms;
      etl_sfn_parms_lst.push(etl_sfn_parms);

      reRunData.etl_stp_parms.etl_stp_nbr_lst = etl_stp_nbr_lst;
      reRunData.etl_stp_parms.edl_run_id_lst = edl_run_id_lst;
      reRunData.etl_stp_parms.etl_sfn_parms_lst = etl_sfn_parms_lst;

      executeApi(reRunData);
    } else {
      let errors = state.errors;
      if (!state.rerun_type) {
        errors.rerun_type = 'Re-Run Type is required';
      }
      if (!state.retry) {
        errors.retry = 'Retry is required';
      }
      if (!state.job_id) {
        errors.job_id = 'Job ID is required';
      }
      if (!state.edl_run_id) {
        errors.edl_run_id = 'EDL Run ID is required';
      }

      if (!state.etl_stp_nbr_lst) {
        errors.etl_stp_nbr_lst = 'Step Sequence No. is required';
      }
      if (!state.process_type_etl && !state.process_type_ingest && state.is_process_type_req) {
        errors.process_type = 'Choose at least one processing type';
      }
      setState({errors: errors});
    }
  };

  const saveChanges = () => {
    if (state.screen_nm === 'abandoned') {
      abandoneJob();
    } else if (state.screen_nm === 'reprocess') {
      reProcessJob();
    } else {
      rerunJob();
    }
  };


  const handleChange = (event) => {
    event.preventDefault();
    const {name, value, checked} = event.target;
    let errors = state.errors;

    switch (name) {
      case 'rerun_type':
        setState(prevState => ({
          edl_run_id: value === 'New' ? 'na' : state.failed_edl_run_id,
          rerun_type: value,
          errors: {...prevState.errors, rerun_type: value.length <= 0 ? 'Re-Run Type is required' : ''}
        }))
        break;
      case 'retry':
        setState(prevState => ({
          retry: value,
          errors: {...prevState.errors, retry: value.length <= 0 ? 'Retry is required' : ''}
        }));
        break;
      case 'process_type_etl':
        setState({
          process_type_etl: checked,
          process_type_ingest: false,
          disableParams: false,
          disableRetry: false,
          edl_run_id: state.job_stts === 'SUCCEEDED' ? 'na' : state.edl_run_id,
          disableReRunType: state.job_stts === 'SUCCEEDED',
          rerun_type: state.job_stts === 'SUCCEEDED' ? 'New' : state.rerun_type,
        });
        break;
      case 'process_type_ingest':
        setState({
          process_type_ingest: checked,
          process_type_etl: false,
          rerun_type: 'Reprocess',
          disableReRunType: true,
          disableParams: true,
          disableRetry: true,
          retry: "no",
          edl_run_id: state.edl_run_id_ref,
        });
        break;
      default:
        break;
    }
  };

  const isJson = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  const footer = (
    <div className={'flex justify-end space-x-4 px-6 py-4'}>
      <Button disabled={state.disableRerunButton} size="xs" onClick={saveChanges}>{state.title}</Button>
      <Button color="gray" size="xs" onClick={handleClose}>Cancel</Button>
    </div>
  )

  return (
    <DialogSkeleton className={'w-[600px]'} title={state.title} show={state.show} handleClose={handleClose} handleSave={saveChanges} footer={footer}>
      <div className={'flex flex-col p-5 w-full'}>
        {!['abandoned', 'reprocess'].some(v => state.screenName.includes(v)) &&
          <div className={'w-full'}>
            {state.is_process_type_req &&
              <div className={'flex space-x-4'}>
                <div className="flex items-center gap-2">
                  <Checkbox id="process_type_etl" name="process_type_etl" color="secondary" checked={state.process_type_etl}
                            disabled={state.enable_process_type}
                            onChange={handleChange} label="ETL"/>
                  <Label htmlFor={'process_type_etl'} className="text-sm text-gray-500">ETL</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="process_type_ingest" name="process_type_ingest" color="secondary" checked={state.process_type_ingest}
                            disabled={state.enable_process_type}
                            onChange={handleChange} label="Ingest"/>
                  <Label htmlFor={'process_type_ingest'} className="text-sm text-gray-500">Ingest</Label>
                </div>
              </div>
            }

            <div className={'mt-3'}>
              <FormControlItem label="Re-Run Type" id="rerun_type" error={state.errors.rerun_type}>
                <Select id="rerun_type" name="rerun_type" value={state.rerun_type} onChange={handleChange}
                        disabled={state.disableReRunType} sizing={'sm'}
                        className={'w-full'}>
                  <option value=""></option>
                  {state.is_process_type_req ? <option value={'Failed'}>Re-run from point of failure</option>
                    : <option value={'SelectedSteps'}>ReRun only selected steps for same execution</option>}
                  <option value="New">Re-run as new execution</option>
                  <option value="Reprocess">Reprocess</option>
                </Select>
              </FormControlItem>

              <FormControlItem label="Job ID" id="job_id" error={state.errors.job_id} className={'mt-2'}>
                <TextInput id="job_id" name="job_id" value={state.job_id} onChange={(e) => setState({job_id: e.target.value})} sizing={'sm'}/>
              </FormControlItem>
            </div>
          </div>
        }

        <FormControlItem label="EDL Run ID" id="edl_run_id" error={state.errors.edl_run_id} className={'mt-2'}>
          {['reprocess', 'abandoned'].includes(state.screenName) ?
            <Textarea id="edl_run_id" name="edl_run_id" value={state.edl_run_id}
                      disabled={true}
                      onChange={(e) => setState({edl_run_id: e.target.value})} sizing={'sm'}/>
            :
            <TextInput id="edl_run_id" name="edl_run_id" value={state.edl_run_id.replaceAll(",", '\n')}
                       onChange={(e) => setState({edl_run_id: e.target.value})} disabled={true}
                       sizing={'sm'}/>
          }
        </FormControlItem>

        {!['abandoned', 'reprocess'].some(v => state.screenName.includes(v)) &&
          <div>
            <FormControlItem label="Step Sequence No." id="etl_stp_nbr_lst" error={state.errors.etl_stp_nbr_lst} className={'mt-2'}>
              <TextInput id="etl_stp_nbr_lst" name="etl_stp_nbr_lst" value={state.etl_stp_nbr_lst}
                         disabled={true}
                         onChange={(e) => setState({etl_stp_nbr_lst: e.target.value})} sizing={'sm'}/>
            </FormControlItem>

            <FormControlItem label={'etl_sfn_parms'} id={'etl_sfn_parms'} error={!isJson(state.etl_sfn_parms) ? 'Not Valid JSON' : ''} className={'mt-2'}>
              <TextInput id={'etl_sfn_parms'} name={'etl_sfn_parms'} value={state.etl_sfn_parms}
                         disabled={state.disableParams}
                          onChange={(e) => setState({etl_sfn_parms: e.target.value})} sizing={'sm'}
                         />
            </FormControlItem>

            <FormControlItem label="Retry" id="retry" error={state.errors.retry} className={'mt-2'}>
              <Select id="retry" name="retry" value={state.retry} onChange={handleChange} disabled={state.disableRetry} sizing={'sm'}>
                  <option value=""></option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
              </Select>
            </FormControlItem>
          </div>
        }

        {state.cfx && <div className={'text-red-500 font-semibold'}>Abandon jobs cannot be reprocessed for CFX Audit</div>}

      </div>
    </DialogSkeleton>
  )

}

export default RerunConfirmModal;