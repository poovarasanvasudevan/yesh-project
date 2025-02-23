import { useSetState } from "ahooks";
import { getBaseURL } from "../../core/api/api-values.jsx";
import { useEnv } from "../../core/states/env-store.jsx";
import { useEffect } from "react";
import { useLoginStore } from "../../core/states/login-store.jsx";

const RerunConfirmModal = ({rowData, screenName, handleStateUpdate}) => {
  const {env} = useEnv()
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
    setState({show: false});
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

}

export default RerunConfirmModal;