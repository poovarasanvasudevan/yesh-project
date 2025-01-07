import { Refresh } from "@mui/icons-material";
import { Box, Button, Menu, MenuItem, Tab, tabClasses, Typography, } from "@mui/material";
import { useSetState } from "ahooks";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const AdhocSupport = () => {

  const [states, setState] = useSetState({
    open: false,
    anchorEl: null,
    selectedTab: 0,
  })

  const onClickMenu = (e) => {
    setState({open: !states.open, anchorEl: e.currentTarget});
  }

  const onCloseMenu = () => {
    setState({open: false, anchorEl: null});
  }

  return (
    <>
      <Typography level="h4" component="h1">
        Orchestrator Scheduler Audit
      </Typography>

      <Box sx={{display: "flex", justifyContent: "flex-end", gap: 1}}></Box>
      <Box sx={{display: "flex", justifyContent: "flex-end", gap: 1}}>
        <Button variant="soft" size="sm">
          Load More
        </Button>
        <Button variant="soft" size="sm" startDecorator={<Refresh/>}>
          Refresh
        </Button>
        <Button
          size="sm"
          slots={{root: Button}}
          variant="soft"
          onClick={onClickMenu}
          slotProps={{root: {variant: "soft", color: "primary"}}}
        >
          Action
        </Button>
        <Menu size="sm" sx={{minWidth: 100}} onClose={onCloseMenu}
              anchorEl={states.anchorEl}
              open={states.open}>
          <MenuItem>Force Run</MenuItem>
          <MenuItem>Unload</MenuItem>
          <MenuItem>Active</MenuItem>
          <MenuItem>InActive</MenuItem>
        </Menu>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
        }}
      >
        <TabContext value={states.selectedTab}>

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
        </TabContext>
      </Box>
    </>
  );
};

export default AdhocSupport;
