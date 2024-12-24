import GlobalStyles from "@mui/joy/GlobalStyles";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React from "react";
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import logo from '../../assets/img/logo1.png';
import ColorSchemeToggle from "./ColorSchemeToggle";
import { Alert, FormControl, FormLabel, Option, Select, Stack } from "@mui/joy";
import { useLoginStore } from "../../core/states/login-store";
import { useNavigate } from "react-router-dom";

function Toggler({defaultExpanded = true, renderToggle, children}) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({open, setOpen})}
      <Box
        sx={[
          {
            display: "grid",
            transition: "0.2s ease",
            "& > *": {
              overflow: "hidden",
            },
          },
          open ? {gridTemplateRows: "1fr"} : {gridTemplateRows: "0fr"},
        ]}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar() {
  const {isLoggedIn, setOpenLoginDialog} = useLoginStore();

  const Menus = [
    {
      label: "Support Control",
      children: [
        {label: "Job Audit", href: "/"},
        {label: "Orchestrator Audit", href: "/orchestrator-audit"},
        {label: "Unload Audit"},
        {label: "Stream Audit"},
        {label: "Adhoc Support", href: "/adhoc-support"},
        {label: "CFX Audit"},
        {label: "FFX Audit"},
      ],
    },
    {
      label: "Adhoc Utilities",
      children: [
        {label: "Adhoc Update", href: "/adhoc-update"},
        {label: "Adhoc Job Submit"},
      ],
    },
  ];

  const MENUS_FULL = [...Menus,]

  const navigate = useNavigate();

  const onClickMenu = (menu) => {
    if (menu.href) navigate(menu.href);
  };

  return (
    <Sheet className="Sidebar" sx={{
      position: {xs: "fixed", md: "sticky"},
      transform: {
        xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
        md: "none",
      },
      transition: "transform 0.4s, width 0.4s",
      zIndex: 100,
      height: "100%",
      width: "250px",
      top: 0,
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      gap: 2,
      borderRight: "1px solid",
      borderColor: "divider",
    }}>
      <GlobalStyles styles={(theme) => ({
        ":root": {
          "--Sidebar-width": "220px",
          [theme.breakpoints.up("lg")]: {
            "--Sidebar-width": "240px",
          },
        },
      })}/>
      <Box sx={{display: "flex", gap: 1, alignItems: "center", px: 2, pt: 1.5}}>
        <img src={logo} width="25" height="25"/>
        <Box sx={{display: "flex", flexDirection: "column"}}>
          <Typography level="title-sm" fontWeight={600}>
            AEDL Support Portal.
          </Typography>
        </Box>
        <ColorSchemeToggle sx={{ml: "auto"}}/>
      </Box>

      <Stack direction={"column"} sx={{px: 2}} spacing={1}>
        <FormControl size="sm">
          <FormLabel>Environment</FormLabel>
          <Select defaultValue="dev" variant="soft">
            <Option value="dev">DEV</Option>
            <Option value="sit">SIT</Option>
            <Option value="uat">UAT</Option>
            <Option value="prod">PROD</Option>
          </Select>
        </FormControl>
        <FormControl size="sm">
          <FormLabel>App Code</FormLabel>
          <Select defaultValue="dev" variant="soft">
            <Option value="dev">DEV</Option>
            <Option value="sit">SIT</Option>
            <Option value="uat">UAT</Option>
            <Option value="prod">PROD</Option>
          </Select>
        </FormControl>
      </Stack>

      <Box sx={{
        minHeight: 0, overflow: "hidden auto", flexGrow: 1, px: 1.5, display: "flex", flexDirection: "column",
        [`& .${listItemButtonClasses.root}`]: {
          gap: 1,
        },
      }}>
        <List
          size="sm"
          sx={{
            gap: 0.2,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          {MENUS_FULL.map((item) => {
            if (item.children) {
              return (
                <ListItem nested key={item.label}>
                  <Toggler
                    renderToggle={({open, setOpen}) => (
                      <ListItemButton onClick={() => setOpen(!open)}>
                        <AssignmentRoundedIcon/>
                        <ListItemContent>
                          <Typography level="title-sm" fontSize={13}>
                            {item.label}
                          </Typography>
                        </ListItemContent>
                        <KeyboardArrowDownIcon
                          sx={[
                            open
                              ? {transform: "rotate(180deg)"}
                              : {transform: "none"},
                          ]}
                        />
                      </ListItemButton>
                    )}
                  >
                    <List sx={{gap: 0.5}}>
                      {item.children.map((child, index) => (
                        <ListItem key={child.label}>
                          <ListItemButton
                            onClick={() => onClickMenu(child)}
                            fontSize={13}
                          >
                            {child.label}
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Toggler>
                </ListItem>
              );
            } else {
              return (
                <ListItem key={item.label}>
                  <ListItemButton
                    onClick={() => onClickMenu(item)}
                  >
                    {item.icon}
                    <ListItemContent>
                      <Typography level="title-sm" fontSize={13}>
                        {item.label}
                      </Typography>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
              );
            }
          })}
        </List>
        {!isLoggedIn && (
          <Alert sx={{mx: 2}} variant="soft" size="sm" color="warning">
            You are in read-only mode, <br/> Login to edit records
          </Alert>
        )}

      </Box>
      <Divider/>

      <Box sx={{display: "flex", gap: 1, alignItems: "center", pb: 1.5, px: 1.5}}>
        <Button
          variant="soft"
          sx={{width: "100%"}}
          color="primary"
          onClick={() => setOpenLoginDialog(true)}
        >
          Login
        </Button>
      </Box>
    </Sheet>
  )
}
