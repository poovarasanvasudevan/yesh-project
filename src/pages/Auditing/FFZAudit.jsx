import { useEnv } from "../../core/states/env-store.jsx";
import { useSetState } from "ahooks";
import { CommonFunc } from "../../core/utils.jsx";
import { getBaseURL } from "../../core/api/api-values.jsx";
import { useEffect } from "react";
import { Button } from "flowbite-react";
import { IoIosRefresh } from "react-icons/io";
import { DatatableComponent } from "../../components/table/DatatableComponent.jsx";
import Dropdown from "../../components/form/dropdown.jsx";


export const FFZAudit = () => {

  const {env, appCode} = useEnv()
  const [state, setState] = useSetState({
    result: [],
    loading: false,
    error: false,
    errorDetail: '',
  })

  const columns = [
    {headerName: 'hidden', field: 'jobMetadata', width: 0, hide: true,},
    {headerName: 'Application Code', field: 'aplctn_cd', cellStyle: {'text-align': "center"}, width: 200},
    {headerName: 'FFZ Stats ID', field: 'stats_id', cellStyle: {'text-align': "center"}, width: 200},
    {headerName: 'Falcon Meta ID', field: 'meta_id', cellStyle: {'text-align': "center"}, width: 200},
    {headerName: 'Event File Name', field: 'evnt_file_nm', cellStyle: {'text-align': "center"}, width: 470},
    {headerName: 'Event File Size', field: 'file_size', cellStyle: {'text-align': "center"}, width: 220},
    {headerName: 'Event Create Time (EST)', field: 'evnt_creat_dtm', cellStyle: {'text-align': "center"}, width: 320},
    {
      headerName: 'Process Start Time(EST)', field: 'prcs_strt_tm_utc',
      cellRenderer: (p) => {
        return CommonFunc.convertTZ(p.value)
      },
      cellStyle: {'text-align': "center"}, width: 170
    },
    {
      headerName: 'Process End Time(EST)',
      cellRenderer: (p) => {
        return CommonFunc.convertTZ(p.value)
      },
      field: 'prcs_end_tm_utc', cellStyle: {'text-align': "center"}, width: 170
    },
    {
      headerName: 'Event Status', field: 'evnt_stts', //minWidth: 150, maxWidth: 150,
      cellStyle: function (params) {
        return {...CommonFunc.SetColor(params), 'text-align': "center"}
      }, pinned: 'right', suppressMovable: true,
    },
    {
      headerName: 'Action', field: 'Actions', sorting: false, filter: false, cellRenderer: 'menuRenderer', pinned: 'right', suppressMovable: true,
      // minWidth: 110, maxWidth: 110,
    },
  ];

  const callAPI = async (env, appCode, dateFilter = undefined) => {
    try {
      setState({loading: true})
      const data = await fetch(getBaseURL(env) + `getauditdetails?env=${env}&app_cd=${appCode}&queryType=ffzAudt${dateFilter ? `&dt_fltr=${dateFilter}` : ''}`)
        .then(x => x.json())
      if (data[0]['count'] !== '0') {
        setState({result: [...state.result, ...data], loading: false})
      } else {
        setState({result: [], loading: false})
      }
    } catch (_e) {
      setState({error: true, errorDetail: _e.toString(), loading: false})
    }
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
            <Dropdown
              options={[
                'Re Process',
                'Abandon'
              ]}
              render={
                <Button color="success" size="xs">Action</Button>
              }
            />
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
      <div className={'flex-1 flex w-[100%] px-4 overflow-y-auto'}>
        <DatatableComponent loading={state.loading} rows={state.result} columns={columns}/>
      </div>
    </>
  );
}

