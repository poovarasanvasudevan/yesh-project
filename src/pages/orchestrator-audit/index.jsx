import { Refresh } from "@mui/icons-material";
import {
  Box,
  Button,
  Tab,
  tabClasses,
  Typography,
} from "@mui/material";

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const OrchestratorAudit = () => {
  return (
    <>
      <Typography level="h4" component="h1">
        Orchestrator Scheduler Audit
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}></Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button variant="soft" size="sm">
          Load More
        </Button>
        <Button variant="soft" size="sm" startDecorator={<Refresh />}>
          Refresh
        </Button>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
        }}
      >
        <TabContext
          aria-label="Basic tabs"
          value={0}
          sx={{ width: "100%", bgcolor: "transparent" }}
        >
          <TabList
            variant="soft"
            disableUnderline
            tabFlex="auto"
            sx={{
              gap: 1,
              bgcolor: "background.level1",
              fontSize: 14,
              [`& .${tabClasses.root}[aria-selected="true"]`]: {
                bgcolor: "transparent",
              },
            }}
          >
            <Tab>Orchestrator Audit</Tab>
            <Tab>Batch Orchestrator Audit</Tab>
          </TabList>
          <TabPanel value={0}>
            <b>First</b> tab panel
          </TabPanel>
          <TabPanel value={1}>
            <b>Second</b> tab panel
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default OrchestratorAudit;
