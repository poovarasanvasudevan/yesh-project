import { DatatableComponent } from "../../components/table/DatatableComponent";

const JobAudit = () => {
  const columns = [
    {flex: 1, field: "app_id", headerName: "Application Code"},
    {flex: 1, field: "jobID", headerName: "Job ID"},
    {flex: 1, field: "jobName", headerName: "Job Name"},
    {flex: 1, field: "edlrunid", headerName: "EDL Run ID"},
    {flex: 1, field: "status", headerName: "Job Status"},
    {flex: 1, field: "id", headerName: "Action"},
  ];

  const rows = Array.from({length: 100}, (_, i) => ({
    app_id: `App ID ${i}`,
    jobID: `Job ID ${i}`,
    jobName: `Job Name ${i}`,
    edlrunid: `EDL Run ID ${i}`,
    status: `Status ${i}`,
    id: `Action ${i}`,
  }));

  return (
    <>
      <div className={'flex mb-1 mt-2 gap-2 flex-col align-center flex-wrap justify-between'}>
        <h6 className='flex-1'>Job Audit</h6>
      </div>
      <div className={'flex-1 flex w-[100%] overflow-y-auto'}>
        <DatatableComponent  rows={rows} columns={columns}/>
      </div>
    </>
  );
};

export default JobAudit;
