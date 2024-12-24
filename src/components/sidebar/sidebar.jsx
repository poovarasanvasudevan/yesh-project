import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import LinearProgress from "@mui/joy/LinearProgress";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SupportRoundedIcon from "@mui/icons-material/SupportRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React from "react";

import logo from "../../assets/img/logo1.png";

import ColorSchemeToggle from "./ColorSchemeToggle";
import { Alert, FormControl, FormLabel, Option, Select } from "@mui/joy";
import { useLoginStore } from "../../core/states/login-store";
import LoginModal from "../dialogs/login-modal";
import { useNavigate } from "react-router-dom";
function Toggler({ defaultExpanded = true, renderToggle, children }) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={[
          {
            display: "grid",
            transition: "0.2s ease",
            "& > *": {
              overflow: "hidden",
            },
          },
          open ? { gridTemplateRows: "1fr" } : { gridTemplateRows: "0fr" },
        ]}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar() {
  const { isLoggedIn, setOpenLoginDialog } = useLoginStore();

  const Menus = [
    {
      label: "Support Control",
      children: [
        { label: "Job Audit", href: "/" },
        { label: "Orchestrator Audit", href: "/orchestrator-audit" },
        { label: "Unload Audit" },
        { label: "Stream Audit" },
        { label: "Adhoc Support", href: "/adhoc-support" },
        { label: "CFX Audit" },
        { label: "FFX Audit" },
      ],
    },
    {
      label: "Adhoc Utilities",
      children: [
        { label: "Adhoc Update", href: "/adhoc-update" },
        { label: "Adhoc Job Submit" },
      ],
    },
  ];

  const navigate = useNavigate();

  const onClickMenu = (menu) => {
    if (menu.href) navigate(menu.href);
  };

  return (
    <>
      <Sheet
        className="Sidebar"
        sx={{
          position: { xs: "fixed", md: "sticky" },
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
            md: "none",
          },
          transition: "transform 0.4s, width 0.4s",
          zIndex: 50,
          width: "var(--Sidebar-width)",
          top: 0,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRight: "1px solid",
          borderColor: "divider",
        }}
      >
        <GlobalStyles
          styles={(theme) => ({
            ":root": {
              "--Sidebar-width": "260px",
              [theme.breakpoints.up("lg")]: {
                "--Sidebar-width": "270px",
              },
            },
          })}
        />
        <Box
          sx={{ display: "flex", gap: 1, alignItems: "center", px: 2, pt: 2 }}
        >
          <img src={logo} width="25" height="25" />
          {/* <IconButton variant="soft" color="primary" size="sm">
            <BrightnessAutoRoundedIcon />
          </IconButton> */}
          <Typography
            level="title-md"
            fontWeight={"600"}
            sx={{ lineHeight: 1 }}
          >
            AEDL Support Portal.
          </Typography>
          <ColorSchemeToggle sx={{ ml: "auto" }} />
        </Box>
        <Stack direction={"column"} sx={{ px: 2 }} spacing={1}>
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
        <Box
          sx={{
            minHeight: 0,
            overflow: "hidden auto",
            flexGrow: 1,
            px: 1.5,
            display: "flex",
            flexDirection: "column",
            [`& .${listItemButtonClasses.root}`]: {
              gap: 1.5,
            },
          }}
        >
          <List
            size="sm"
            sx={{
              "--List-nestedInsetStart": "30px",
              "--ListItem-radius": (theme) => theme.vars.radius.sm,
              "--List-gap": "1px",
            }}
          >
            {Menus.map((menu) => {
              if (menu.children) {
                return (
                  <ListItem nested>
                    <Toggler
                      renderToggle={({ open, setOpen }) => (
                        <ListItemButton onClick={() => setOpen(!open)}>
                          <AssignmentRoundedIcon />
                          <ListItemContent>
                            <Typography level="title-sm" sx={{ fontSize: 13 }}>
                              {menu.label}
                            </Typography>
                          </ListItemContent>
                          <KeyboardArrowDownIcon
                            sx={[
                              open
                                ? {
                                    transform: "rotate(180deg)",
                                  }
                                : {
                                    transform: "none",
                                  },
                            ]}
                          />
                        </ListItemButton>
                      )}
                    >
                      <List sx={{ gap: 0.2 }}>
                        {menu.children.map((child) => (
                          <ListItem onClick={() => onClickMenu(child)}>
                            <ListItemButton sx={{ fontSize: 13 }}>
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
                  <ListItem>
                    <ListItemButton>
                      <HomeRoundedIcon />
                      <ListItemContent>
                        <Typography level="title-sm">{menu.label}</Typography>
                      </ListItemContent>
                    </ListItemButton>
                  </ListItem>
                );
              }
            })}
          </List>
        </Box>
        {!isLoggedIn && (
          <Alert sx={{ mx: 2 }} variant="soft" size="sm" color="warning">
            You are in read-only mode, <br /> Login to edit records
          </Alert>
        )}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            px: 2,
            pt: 1.2,
            pb: 1.5,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          {isLoggedIn ? (
            <>
              <Avatar
                variant="outlined"
                size="sm"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
              />
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography level="title-sm">Siriwat K.</Typography>
                <Typography level="body-xs">siriwatk@test.com</Typography>
              </Box>
              <IconButton size="sm" variant="plain" color="neutral">
                <LogoutRoundedIcon />
              </IconButton>
            </>
          ) : (
            <Button
              variant="soft"
              sx={{ width: "100%" }}
              color="primary"
              onClick={() => setOpenLoginDialog(true)}
            >
              Login
            </Button>
          )}
        </Box>
      </Sheet>
    </>
  );
}
