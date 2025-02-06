import logo from '../../assets/img/logo1.png';
import { useLoginStore } from "../../core/states/login-store";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Select, Sidebar } from "flowbite-react";
import { MdOutlineAssignment } from "react-icons/md";
import { FormControlItem } from "../form/control.jsx";
import { useModal } from "@saimin/react-modal-manager";
import LoginModal from "../dialogs/login-modal.jsx";
import { useEnv } from "../../core/states/env-store.jsx";
import { getBaseURL } from "../../core/api/api-values.jsx";
import { useSetState } from "ahooks";
import { useEffect } from "react";


export default function AppSidebar() {
  const {isLoggedIn, setLogout, appCodes, accessibleEnv} = useLoginStore();
  const { appCode, setAppCode, setEnv, env} = useEnv();
  const { open } = useModal();

  const [state,setState]=  useSetState({
    defaultAppCodes : []
  })

  const preEnv = [
    {label: "DEV", value: "dev"},
    {label: "SIT", value: "sit"},
    {label: "UAT", value: "uat"},
    {label: "PROD", value: "prod"},
  ]
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
    collapse: {
      "list":"py-0"
    }
  };

  const openLoginModal = () => {
    open('login-modal', {
      content: <LoginModal name={'login-modal'} />
    });
  }

  const logout = () => {
    setLogout()
  }

  useEffect(() => {
    loadDefaultAppCodes();
  }, []);


  const loadDefaultAppCodes = () => {
    fetch(getBaseURL(env) + `getjobportalparms?env=${env}&dropDownCol=application`)
      .then(res => res.json())
      .then((result) => {
        const codes = ['ALL', ...result.application]
        setState({defaultAppCodes: codes})
      })
  }

  return (
    <Sidebar className={'w-[280px] flex flex-col h-[100%]'} theme={customThemeSidebar}>
      <Sidebar.Logo href="#" img={logo} imgAlt="logo">
        AEDL Support Portal.
      </Sidebar.Logo>

      <div className={'px-2 gap-2 flex flex-col'}>
        <FormControlItem label={'Select Environment'} id={'env'}>
          <Select id={'env'} required sizing={'sm'} onChange={(e) =>  setEnv(e.target.value)} value={env}>
            {accessibleEnv[appCode] !== undefined  ? accessibleEnv[appCode].map((val) => (
              <option value={val} key={val}>{val}</option>
            )) : preEnv.map((val) => (
              <option value={val.value} key={val.value}>{val.label}</option>
            ))}
          </Select>
        </FormControlItem>

        <FormControlItem label={'App Code'} id={'appcode'}>
          <Select id={'env'} required sizing={'sm'} value={appCode} onChange={(e) =>  setAppCode(e.target.value)}>
            {appCodes.length !==0 ?appCodes.map((val) => (
              <option value={val} key={val}>{val}</option>
            )) : state.defaultAppCodes.map((val) => (
              <option value={val} key={val}>{val}</option>
            ))}
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

      {!isLoggedIn && (
      <div className={'mt-2'}>
        <Button className={'w-full'} onClick={openLoginModal} size={'xs'}>Login</Button>
      </div>
      )}

      {isLoggedIn && (
        <div className={'mt-2'}>
          <Button className={'w-full'} onClick={logout} size={'xs'}>Logout</Button>
        </div>
      )}
    </Sidebar>
  )
}
