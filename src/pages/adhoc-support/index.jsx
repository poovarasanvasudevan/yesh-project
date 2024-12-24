import { Refresh } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Tab,
  tabClasses,
  TabList,
  TabPanel,
  Tabs,
  Typography,
} from "@mui/joy";

const AdhocSupport = () => {
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
        <Dropdown>
          <MenuButton
            size="sm"
            slots={{ root: Button }}
            variant="soft"
            slotProps={{ root: { variant: "soft", color: "primary" } }}
          >
            Action
          </MenuButton>
          <Menu size="sm" sx={{ minWidth: 100 }}>
            <MenuItem>Force Run</MenuItem>
            <MenuItem>Unload</MenuItem>
            <MenuItem>Active</MenuItem>
            <MenuItem>InActive</MenuItem>
          </Menu>
        </Dropdown>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flex: 1,
        }}
      >
        <Tabs
          aria-label="Basic tabs"
          defaultValue={0}
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
            <Tab>JOB Metadata</Tab>
            <Tab>Step Metadata</Tab>
            <Tab>Orchestrator Metadata</Tab>
            <Tab>Batch Orchestrator Metadata</Tab>
          </TabList>
          <TabPanel value={0}>
            <b>First</b> tab panel
          </TabPanel>
          <TabPanel value={1}>
            <b>Second</b> tab panel
          </TabPanel>
          <TabPanel value={2}>
            <b>Second</b> tab panel
          </TabPanel>
          <TabPanel value={3}>
            <b>Second</b> tab panel
          </TabPanel>
        </Tabs>
      </Box>
    </>
  );
};

export default AdhocSupport;
