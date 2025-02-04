import { DatatableComponent } from "../../components/table/DatatableComponent";
import { getBaseURL } from "../../core/api/api-values.jsx";
import { useEnv } from "../../core/states/env-store.jsx";
import { useEffect } from "react";
import { useSetState } from "ahooks";
import { JobAuditAction, StatusRenderer } from "../../components/table/cell-renderer.jsx";
import { Button } from "flowbite-react";
import { IoIosRefresh } from "react-icons/io";

const JobAudit = () => {

  const {env, appCode} = useEnv()
  const [state, setState] = useSetState({
    result: [],
    loading: false,
  })

  const columns = [
    {flex: 1, field: "aplctn_cd", headerName: "Application Code"},
    {flex: 1, field: "job_id", headerName: "Job ID"},
    {flex: 1, field: "job_nm", headerName: "Job Name"},
    {flex: 1, field: "edl_run_id", headerName: "EDL Run ID"},
    {flex: 1, field: "job_stts", headerName: "Job Status", cellRenderer: StatusRenderer},
    {flex: 1, field: "id", headerName: "Action", cellRenderer: JobAuditAction},
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
          {state.result.length > 0 &&
            <div>Display data over {state.result[0].load_end_tm}</div>
          }
          <div className={'flex gap-1'}>
            <Button color="blue" size="xs" onClick={refresh}>
              Refresh &nbsp;
              <IoIosRefresh/>
            </Button>
            <Button color="blue" size="xs" onClick={loadMore}>
              Load More
            </Button>
          </div>
        </div>
      </div>
      <div className={'flex-1 flex w-[100%] overflow-y-auto'}>
        <DatatableComponent loading={state.loading} rows={state.result} columns={columns}/>
      </div>
    </>
  );
};

export default JobAudit;
