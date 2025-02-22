import { useSetState } from "ahooks";
import { useLoginStore } from "../../core/states/login-store.jsx";
import { CommonFunc } from "../../core/utils.jsx";
import { getBaseURL } from "../../core/api/api-values.jsx";
import { useEnv } from "../../core/states/env-store.jsx";


const StepAudit = () => {
  const {isLoggedIn} = useLoginStore();
  const {env} = useEnv()

  const [state, setState] = useSetState({
    loading: false,
    disableReRun: true,
    appCode: '',
    edlRunId: '',
    show: false,
    tabCount: 0,
    jobName: '',
    rowData: [],
    columnDefs: [
      {headerName: 'hidden', field: 'stepMetadata', width: 0, hide: true,},
      {
        headerName: 'Job ID', field: 'job_id', cellStyle: {'text-align': "center"}, width: 150,
        headerCheckboxSelection: isLoggedIn,
        checkboxSelection: isLoggedIn,

        headerCheckboxSelectionFilteredOnly: true, cellRenderer: 'viewRenderer'
      },
      {headerName: 'EDL Run ID', field: 'edl_run_id', cellStyle: {'text-align': "center"}, width: 320},
      {headerName: 'Step Sequence No', field: 'etl_stp_sqnc_nbr', cellRenderer: 'viewRenderer', cellStyle: {'text-align': "center"}, width: 200},
      {
        headerName: 'Step Start Time',
        cellRenderer: (p) => {
          return CommonFunc.convertTZ(p.value)
        },
        field: 'etl_stp_strt_tm_utc', cellStyle: {'text-align': "center"}, width: 175
      },
      {
        headerName: 'Step End Time',
        cellRenderer: (p) => {
          return CommonFunc.convertTZ(p.value)
        },
        field: 'etl_stp_end_tm_utc', cellStyle: {'text-align': "center"}, width: 170
      },
      {headerName: 'Processed Time', field: 'processing_time', cellStyle: {'text-align': "center"}, width: 175},
      {
        headerName: 'Step Status', field: 'job_stts', minWidth: 140, maxWidth: 140,
        cellStyle: function (params) {
          return {...CommonFunc.SetColor(params), 'text-align': "center"}
        }, pinned: 'right', suppressMovable: true,
      },
      {
        headerName: 'Action', field: 'Action', sorting: false, filter: false, cellRenderer: 'actionRenderer',
        minWidth: 90, maxWidth: 90, pinned: 'right', suppressMovable: true,
      },
    ],
  })

  const loadStepAudits = (edlRunId) => {
    if (edlRunId && edlRunId !== "") {
      //fetch(api.partialURL + 'getauditdetails?env=' + this.props.currentEnv + '&queryType=stepAudt&edl_run_id='
      fetch(getBaseURL(env) + `getauditdetails?env=${env}&queryType=stepAudt&edl_run_id=${edlRunId}`)
        .then(res => res.json())
        .then(result => {
          if (result === 'No Steps associated for this edl run id') {

          } else {
            this.setState({ rowData: result });
          }
          this.setState({ loading: false });
        })
        .catch(err => console.log(err));
    }
  }
  return (
    <div>
      <h1>Step Audit</h1>
    </div>
  )
}