import logo from '../../assets/img/logo1.png';
import { useLoginStore } from "../../core/states/login-store";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Select, Sidebar } from "flowbite-react";
import { MdOutlineAssignment } from "react-icons/md";
import { FormControlItem } from "../form/control.jsx";
import { useModal } from "@saimin/react-modal-manager";
import LoginModal from "../dialogs/login-modal.jsx";


export default function AppSidebar() {
  const {isLoggedIn} = useLoginStore();
  const { open } = useModal();
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

  const openLoginModal = () => {
    open('login-modal', {
      content: <LoginModal name={'login-modal'} />
    });
  }


  return (
    <Sidebar className={'w-[280px] flex flex-col h-[100%]'} theme={customThemeSidebar}>
      <Sidebar.Logo href="#" img={logo} imgAlt="logo">
        AEDL Support Portal.
      </Sidebar.Logo>

      <div className={'px-2 gap-2 flex flex-col'}>
        <FormControlItem label={'Select Environment'} id={'env'}>
          <Select id={'env'} required sizing={'sm'}>
            <option value={'dev'}>DEV</option>
            <option value={'sit'}>SIT</option>
            <option value={'uat'}>UAT</option>
            <option value={'prod'}>PROD</option>
          </Select>
        </FormControlItem>

        <FormControlItem label={'App Code'} id={'appcode'}>
          <Select id={'env'} required sizing={'sm'}>
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
                    <Sidebar.Item key={child.label}  onClick={()=> onClickMenu(child)} className={'text-[14px] cursor-pointer'}>
                      {child.label}
                    </Sidebar.Item>
                  ))}
                </Sidebar.Collapse>
              );
            } else {
              return (
                <Sidebar.Item key={item.label} href={item.href} onClick={()=> onClickMenu(item)} icon={MdOutlineAssignment}>
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

      <div className={'mt-2'}>
        <Button className={'w-full'} onClick={openLoginModal} size={'xs'}>Login</Button>
      </div>
    </Sidebar>
  )
}
