import { DatatableComponent } from "../../components/table/DatatableComponent";
import { getBaseURL } from "../../core/api/api-values.jsx";
import { useEnv } from "../../core/states/env-store.jsx";
import { useEffect } from "react";
import { useSetState } from "ahooks";
import { JobAuditAction } from "../../components/table/cell-renderer.jsx";
import { Button } from "flowbite-react";
import { IoIosRefresh } from "react-icons/io";
import { CommonFunc } from "../../core/utils.jsx";
import { useLoginStore } from "../../core/states/login-store.jsx";
import { render } from "react-dom";
import LogInfo from "../../components/utils/log-info.jsx";
import { useModal } from "@saimin/react-modal-manager";
import RerunConfirmModal from "../../components/dialogs/rerun-confirm-modal.jsx";

const JobAudit = () => {
  const sampleRecords = [
    {
      "aplctn_cd": "CUST",
      "job_id": "CUST_001",
      "job_nm": "Customer Data Load",
      "edl_run_id": "EDL_001",
      "job_strt_tm_utc": "2021-10-01T01:00:00",
      "job_end_tm_utc": "2021-10-01T01:10:00",
      "processing_time": "10 mins",
      "job_stts": "FAILED"

    }
  ]

  const {env, appCode} = useEnv()
  const { isLoggedIn } =useLoginStore()
  const { open} = useModal()

  const onClickMenu = ({ selection, rowData }) => {
    console.log(selection, rowData)
    if(selection === 'Logs') {
      showLogs(rowData)
    }
    if(selection === 'Re-Run') {
      open('Re-Run', {
        content: <RerunConfirmModal rowData={rowData} handleStateUpdate={() =>{}} screenName={'re-run'} name={'Re-Run'} />,
        hideOnClickBackDrop: false,
      })
    }
  }

  const showLogs = ( row ) => {
    if(isLoggedIn) {
      let errorLog = row.err_log === undefined || row.err_log === null
          ? row.err_log
          : row.err_log.replace("#", "%23");
      let api_url = getBaseURL(env) +
        "geterrorloginfo?env=" +
        env +
        "&queryType=jobAudt&job_id=" +
        row.job_id +
        "&edl_run_id=" +
        row.edl_run_id +
        "&job_strt_tm=" +
        row.job_strt_tm_utc +
        "&job_end_tm=" +
        row.job_end_tm_utc +
        "&err_rsn_desc=" +
        row.err_rsn_desc +
        "&err_log=" +
        errorLog;

      row.page = "Job Audit";
      row.api_url = api_url;
      row.env = env;

      let nextDiv = document.body.appendChild(document.createElement("div"));
      nextDiv.setAttribute("id", "child-root" + this.state.tabCount);

      console.log(nextDiv);

      render(<LogInfo data={row} />,  document.getElementById("child-root"));
    } else {
      CommonFunc.openInNewTab(row.err_log);
    }
  }


  const [state, setState] = useSetState({
    result: sampleRecords,
    loading: false,
    columns: [
      {headerName: "hidden", field: "jobMetadata", width: 0, hide: true},
      {
        headerName: "Application Code",
        field: "aplctn_cd",
        width: 200,
        filterParams: {apply: true, newRowsAction: 'keep'}
      },
      {
        headerName: "Job ID",
        field: "job_id",
        width: 120,
        cellRenderer: "viewRenderer",
        filterParams: {apply: true, newRowsAction: 'keep'}
      },
      {
        headerName: "Job Name",
        field: "job_nm",
        width: 320,
        filterParams: {apply: true, newRowsAction: 'keep'}
      },
      {
        headerName: "EDL Run ID",
        field: "edl_run_id",
        width: 320,
        filterParams: {apply: true, newRowsAction: 'keep'}
      },
      {
        headerName: "Job Start Time (EST)",
        field: "job_strt_tm_utc",
        width: 240,
        cellRenderer: (p) => {
          return CommonFunc.convertTZ(p.value)
        },
        filterParams: {apply: true, newRowsAction: 'keep'}
      },
      {
        headerName: "Job End Time (EST)",
        field: "job_end_tm_utc",
        width: 240,
        cellRenderer: (p) => {
          return CommonFunc.convertTZ(p.value)
        },
        filterParams: {apply: true, newRowsAction: 'keep'}
      },
      {
        headerName: "Processed Time",
        field: "processing_time",
        width: 175,
        filterParams: {apply: true, newRowsAction: 'keep'}
      },
      {
        headerName: "Job Status",
        field: "job_stts",
        cellStyle: function (params) {
          return CommonFunc.SetColor(params);
        },
        pinned: "right",
        suppressMovable: true,
        filterParams: {apply: true, newRowsAction: 'keep'}
      },
      {
        flex: 1, field: "id", headerName: "Action",
        cellRenderer: JobAuditAction,
        cellRendererParams: {
          onClick: onClickMenu
        },
        pinned: "right",
        suppressMovable: true,
        sorting: false,
        filter: false,
      },
    ]
  })



  const callAPI = async (env, appCode, dateFilter = undefined) => {
    setState({loading: true})
    const data = await fetch(getBaseURL(env) + `getauditdetails?env=${env}&app_cd=${appCode}&queryType=jobAudt${dateFilter ? `&dt_fltr=${dateFilter}` : ''}`).then(x => x.json())
    setState({result: [...data, state.result], loading: false})
  }

  useEffect(() => {
    callAPI(env, appCode)
  }, [env, appCode]);

  const loadMore = () => {
    callAPI(env, appCode, state.result[0].load_end_tm)
  }

  const refresh = () => {
    callAPI(env, appCode)
  }

  return (
    <>
      <div className={'flex p-4 items-center'}>
        <div className={'flex-1'}>
          <h3 className={'font-semibold text-[18px]'}> Job Audit</h3>
        </div>


        <div className={'flex flex-col flex-end'}>
          {state.result.length > 0 && state.result[0].load_end_tm &&
            <div className={'text-[12px] text-gray-600 mb-1'}>Display data over {state.result[0].load_end_tm}</div>
          }
          <div className={'flex gap-1'}>
            <Button color="blue" size="xs" onClick={refresh}>
              Refresh &nbsp;
              <IoIosRefresh/>
            </Button>
            <Button color="success" size="xs" onClick={loadMore}>
              Load More
            </Button>
          </div>
        </div>
      </div>
      <div className={'flex-1 flex w-[100%]  px-4 overflow-y-auto'}>
        <DatatableComponent
          loading={state.loading}
          rows={state.result}
          columns={state.columns}/>
      </div>
    </>
  );
};

export default JobAudit;
