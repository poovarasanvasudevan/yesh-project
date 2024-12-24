import { Box, Typography } from "@mui/joy";
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
      <Box
        sx={{
          display: "flex",
          mb: 1,
          mt: 2,
          gap: 1,
          flexDirection: {xs: "column", sm: "row"},
          alignItems: {xs: "start", sm: "center"},
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Typography level="h4" component="h3" sx={{flex: 1}}>
          Job Audit
        </Typography>

      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          width: "100%",
          overflowY: "auto",
        }}
      >
        <DatatableComponent  rows={rows} columns={columns}/>
      </Box>
    </>
  );
};

export default JobAudit;
