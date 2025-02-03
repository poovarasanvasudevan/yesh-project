import logo from '../../assets/img/logo1.png';
import { useLoginStore } from "../../core/states/login-store";
import { useNavigate } from "react-router-dom";
import { Alert, Select, Sidebar } from "flowbite-react";
import { MdOutlineAssignment } from "react-icons/md";
import { FormControlItem } from "../form/control.jsx";


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

  const customThemeSidebar = {
    root: {
      inner: "h-full overflow-y-auto overflow-x-hidden rounded bg-gray-50 px-3 py-4 dark:bg-gray-800 flex flex-col",
    },
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


    <Sidebar className={'w-[280px] flex flex-col h-[100%]'} theme={customThemeSidebar}>
      <Sidebar.Logo href="#" img={logo} imgAlt="logo">
        AEDL Support Portal.
      </Sidebar.Logo>

      <div className={'px-2 gap-2 flex flex-col'}>
        <FormControlItem label={'Select Environment'} id={'env'}>
          <Select id={'env'} required size={'xs'}>
            <option value={'dev'}>DEV</option>
            <option value={'sit'}>SIT</option>
            <option value={'uat'}>UAT</option>
            <option value={'prod'}>PROD</option>
          </Select>
        </FormControlItem>

        <FormControlItem label={'App Code'} id={'appcode'}>
          <Select id={'env'} required>
            <option value={'dev'}>DEV</option>
            <option value={'sit'}>SIT</option>
            <option value={'uat'}>UAT</option>
            <option value={'prod'}>PROD</option>
          </Select>
        </FormControlItem>
      </div>
      <Sidebar.Items className={'pt-4 flex-1'}>
        <Sidebar.ItemGroup>
          {MENUS_FULL.map((item) => {
            if (item.children) {
              return (
                <Sidebar.Collapse
                  open={true} key={item.label}
                  label={item.label}
                  icon={() => <MdOutlineAssignment/>}>
                  {item.children.map((child) => (
                    <Sidebar.Item key={child.label} href={child.href} className={'text-[14px]'}>
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

      {!isLoggedIn && (
        <Alert sx={{mx: 2}} variant="soft" size="sm" color="warning">
          You are in read-only mode, <br/> Login to edit records
        </Alert>
      )}
    </Sidebar>
  )
}
