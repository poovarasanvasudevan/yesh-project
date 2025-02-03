import React from "react";
import logo from '../../assets/img/logo1.png';
import { useLoginStore } from "../../core/states/login-store";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { MdOutlineAssignment } from "react-icons/md";


export default function AppSidebar() {
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
    // <>
    // <Box className="Sidebar" sx={{
    //   position: {xs: "fixed", md: "sticky"},
    //   transform: {
    //     xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
    //     md: "none",
    //   },
    //   transition: "transform 0.4s, width 0.4s",
    //   zIndex: 100,
    //   height: "100%",
    //   width: "280px",
    //   top: 0,
    //   flexShrink: 0,
    //   display: "flex",
    //   flexDirection: "column",
    //   gap: 2,
    //   borderRight: "1px solid",
    //   borderColor: "divider",
    // }}>
    //   <Box sx={{display: "flex", gap: 1, alignItems: "center", px: 2, pt: 2}}>
    //     <img src={logo} width="25" height="25"/>
    //     <Box sx={{display: "flex", flexDirection: "column"}}>
    //       <Typography fontSize={18} fontWeight={600}>
    //         AEDL Support Portal.
    //       </Typography>
    //     </Box>
    //   </Box>
    //
    //   <Stack direction={"column"} sx={{px: 2 , pt: 2}} spacing={2}>
    //     <FormControl fullWidth size={"small"}>
    //       <InputLabel id="env-label">Select Environment</InputLabel>
    //       <Select labelId="env-label" label="Select Environment">
    //             <MenuItem value="dev">DEV</MenuItem>
    //             <MenuItem value="sit">SIT</MenuItem>
    //             <MenuItem value="uat">UAT</MenuItem>
    //             <MenuItem value="prod">PROD</MenuItem>
    //       </Select>
    //     </FormControl>
    //     <FormControl fullWidth size={"small"}>
    //       <InputLabel id="appcode-label">App Code</InputLabel>
    //       <Select labelId="appcode-label" label="AppCode">
    //         <MenuItem value="dev">DEV</MenuItem>
    //         <MenuItem value="sit">SIT</MenuItem>
    //         <MenuItem value="uat">UAT</MenuItem>
    //         <MenuItem value="prod">PROD</MenuItem>
    //       </Select>
    //     </FormControl>
    //   </Stack>
    //
    //   <Box sx={{
    //     minHeight: 0,
    //     overflow: "hidden auto",
    //     flexGrow: 1,
    //     display: "flex",
    //     flexDirection: "column",
    //     [`& .${listItemButtonClasses.root}`]: {
    //       gap: 1,
    //     },
    //     px: 0,
    //   }}>
    //     <List
    //       size="sm"
    //       sx={{
    //         gap: 0.2,
    //         "--List-nestedInsetStart": "30px",
    //       }}
    //     >
    //       {MENUS_FULL.map((item) => {
    //         if (item.children) {
    //           return (
    //             <ListItem nested key={item.label} disablePadding>
    //               <Toggler renderToggle={({open, setOpen}) => (
    //                   <ListItemButton  onClick={() => setOpen(!open)}>
    //                     <AssignmentRoundedIcon/>
    //                     <ListItemText >
    //                       <Typography level="title-sm" fontSize={14} fontWeight={600}>
    //                         {item.label}
    //                       </Typography>
    //                     </ListItemText >
    //                     <KeyboardArrowDownIcon
    //                       sx={[
    //                         open
    //                           ? {transform: "rotate(180deg)"}
    //                           : {transform: "none"},
    //                       ]}
    //                     />
    //                   </ListItemButton>
    //                 )}
    //               >
    //                 <List sx={{ p: 0}}>
    //                   {item.children.map((child) => (
    //                     <ListItem key={child.label} disablePadding>
    //                       <ListItemButton onClick={() => onClickMenu(child)} fontSize={12}>
    //                         <ListItemText sx={{pl: 4}}>
    //                           <Typography level="title-sm" fontSize={14}>{child.label}</Typography>
    //                         </ListItemText>
    //                       </ListItemButton>
    //                     </ListItem>
    //                   ))}
    //                 </List>
    //               </Toggler>
    //             </ListItem>
    //           );
    //         } else {
    //           return (
    //             <ListItem key={item.label} disablePadding>
    //               <ListItemButton
    //                 onClick={() => onClickMenu(item)}
    //               >
    //                 {item.icon}
    //                 <ListItemText>
    //                   <Typography level="title-sm" fontSize={14}>
    //                     {item.label}
    //                   </Typography>
    //                 </ListItemText>
    //               </ListItemButton>
    //             </ListItem>
    //           );
    //         }
    //       })}
    //     </List>
    //
    //
    //   </Box>
    //
    //   {!isLoggedIn && (
    //     <Alert sx={{mx: 2}} variant="soft" size="sm" color="warning">
    //       You are in read-only mode, <br/> Login to edit records
    //     </Alert>
    //   )}
    //   <Divider/>
    //
    //   <Box sx={{display: "flex", gap: 1, alignItems: "center", pb: 1.5, px: 1.5}}>
    //     <Button
    //       variant="contained"
    //       disableElevation
    //       sx={{width: "100%"}}
    //       color="primary"
    //       onClick={() => setOpenLoginDialog(true)}
    //     >
    //       Login
    //     </Button>
    //   </Box>
    // </Box>
    //   </>


    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {MENUS_FULL.map((item) => {
            if (item.children) {
              return (
                <Sidebar.Collapse key={item.label} icon={MdOutlineAssignment} label={item.label}>
                  {item.children.map((child) => (
                    <Sidebar.Item key={child.label} href={child.href}>
                      {child.label}
                    </Sidebar.Item>
                  ))}
                </Sidebar.Collapse>
              );
            } else {
              return (
                <Sidebar.Item key={item.label} href={item.href} icon={MdOutlineAssignment}>
                  {item.label}
                </Sidebar.Item>
              );
            }
          })}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
