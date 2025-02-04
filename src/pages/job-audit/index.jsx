import { DatatableComponent } from "../../components/table/DatatableComponent";
import { getBaseURL } from "../../core/api/api-values.jsx";
import { useEnv } from "../../core/states/env-store.jsx";
import { useEffect } from "react";
import { useSetState } from "ahooks";

const JobAudit = () => {

  const { env, appCode} = useEnv()
  const [state, setState]=  useSetState({
    result: [],
    loading: false
  })

  const columns = [
    {flex: 1, field: "aplctn_cd", headerName: "Application Code"},
    {flex: 1, field: "job_id", headerName: "Job ID"},
    {flex: 1, field: "job_nm", headerName: "Job Name"},
    {flex: 1, field: "edl_run_id", headerName: "EDL Run ID"},
    {flex: 1, field: "status", headerName: "Job Status"},
    {flex: 1, field: "id", headerName: "Action"},
  ];

  const callAPI = async ( env, appCode ) => {
    setState({loading: true})
    const data =  await fetch(getBaseURL(env) + `getauditedtails?env=${env}&app_cd=${appCode}&queryType=jobAudt`)
      .then(x => x.json())
    setState({result: data, loading: false})
  }

  useEffect(() => {
    callAPI(env, appCode)
  }, [env, appCode]);


  return (
    <>
      <div className={'flex mb-1 mt-2 gap-2 flex-col align-center flex-wrap justify-between'}>
        <h6 className='flex-1'>Job Audit</h6>
      </div>
      <div className={'flex-1 flex w-[100%] overflow-y-auto'}>
        <DatatableComponent loading={state.loading}  rows={state.result} columns={columns}/>
      </div>
    </>
  );
};

export default JobAudit;
