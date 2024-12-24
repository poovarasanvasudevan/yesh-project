import { Box, CircularProgress, Typography } from "@mui/joy";

const JobAudit = () => {
  return (
    <>
      <Typography level="h4" component="h1">
        Job Audit
      </Typography>

      <Box
        sx={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          height: "100%",
        }}
      >
        <CircularProgress color="primary" size="sm" variant="plain" />
      </Box>
    </>
  );
};

export default JobAudit;
