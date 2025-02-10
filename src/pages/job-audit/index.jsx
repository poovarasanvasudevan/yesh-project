import { DatatableComponent } from "../../components/table/DatatableComponent";
import { getBaseURL } from "../../core/api/api-values.jsx";
import { useEnv } from "../../core/states/env-store.jsx";
import { useEffect } from "react";
import { useSetState } from "ahooks";
import { JobAuditAction, StatusRenderer } from "../../components/table/cell-renderer.jsx";
import { Button } from "flowbite-react";
import { IoIosRefresh } from "react-icons/io";
import { CommonFunc } from "../../core/utils.jsx";

const JobAudit = () => {

  const {env, appCode} = useEnv()
  const [state, setState] = useSetState({
    result: [],
    loading: false,
  })

  const columns = [
    { headerName: "hidden", field: "jobMetadata", width: 0, hide: true },
    {
      headerName: "Application Code",
      field: "aplctn_cd",
      cellStyle: { "text-align": "center" },
      width: 200,
      filterParams: { apply: true, newRowsAction: 'keep' }
    },
    {
      headerName: "Job ID",
      field: "job_id",
      cellStyle: { "text-align": "center" },
      width: 120,
      cellRenderer: "viewRenderer",
      filterParams: { apply: true, newRowsAction: 'keep' }
    },
    {
      headerName: "Job Name",
      field: "job_nm",
      cellStyle: { "text-align": "center" },
      width: 320,
      filterParams: { apply: true, newRowsAction: 'keep' }
    },
    {
      headerName: "EDL Run ID",
      field: "edl_run_id",
      cellStyle: { "text-align": "center" },
      width: 320,
      filterParams: { apply: true, newRowsAction: 'keep' }
    },
    {
      headerName: "Job Start Time (EST)",
      field: "job_strt_tm_utc",
      cellStyle: { "text-align": "center" },
      width: 240,
      cellRenderer: (p) => {
        return CommonFunc.convertTZ(p.value)
      },
      filterParams: { apply: true, newRowsAction: 'keep' }
    },
    {
      headerName: "Job End Time (EST)",
      field: "job_end_tm_utc",
      cellStyle: { "text-align": "center" },
      width: 240,
      cellRenderer: (p) => {
        return CommonFunc.convertTZ(p.value)
      },
      filterParams: { apply: true, newRowsAction: 'keep' }
    },
    {
      headerName: "Processed Time",
      field: "processing_time",
      cellStyle: { "text-align": "center" },
      width: 175,
      filterParams: { apply: true, newRowsAction: 'keep' }
    },
    {
      headerName: "Job Status",
      field: "job_stts",
      cellStyle: function (params) {
        return CommonFunc.SetColor(params);
      },
      pinned: "right",
      suppressMovable: true,
      filterParams: { apply: true, newRowsAction: 'keep' }
    },
    {
      flex: 1, field: "id", headerName: "Action",
      cellRenderer: JobAuditAction,
      pinned: "right",
      suppressMovable: false,
      sorting: false,
      filter: false,
    },
  ];

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
        <DatatableComponent loading={state.loading} rows={state.result} columns={columns}/>
      </div>
    </>
  );
};

export default JobAudit;
