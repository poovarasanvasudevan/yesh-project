import { useSetState } from "ahooks";
import { Button, Tabs} from "flowbite-react";
import { IoIosRefresh } from "react-icons/io";
import Dropdown from "../../components/form/dropdown.jsx";


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


      <div className={'flex p-4 items-center'}>
        <div className={'flex-1'}>
          <h3 className={'font-semibold text-[18px]'}> Adhoc Support</h3>
        </div>

        <div className={'flex flex-end gap-1'}>
          <Button color="blue" size="xs">
            Load More
          </Button>
          <Button color="blue" size="xs">
            Refresh &nbsp;
            <IoIosRefresh />
          </Button>

          <Dropdown
            options={[
              "Force Run",
              "Unload",
              "Active",
              "In Active",
            ]}
            render={
              <Button color="success" size="xs">Action</Button>
            }
          />

          {/*<Dropdown size="xs" label="Dropdown button" dismissOnClick={true} className={'adhoc-support-action'}>*/}
          {/*  <Dropdown.Item>Force Run</Dropdown.Item>*/}
          {/*  <Dropdown.Item>Unload</Dropdown.Item>*/}
          {/*  <Dropdown.Item>Active</Dropdown.Item>*/}
          {/*  <Dropdown.Item>In Active</Dropdown.Item>*/}
          {/*</Dropdown>*/}
        </div>
      </div>

      <div className={'flex-1 flex w-full'} >
        <Tabs  aria-label="Default tabs"  variant="underline" className={'w-full'}>
          <Tabs.Item title={'Job Metadata'}><b>First</b> tab panel</Tabs.Item>
          <Tabs.Item title={'Step Metadata'}><b>First</b> tab panel</Tabs.Item>
          <Tabs.Item title={'Orchestrator Metadata'}><b>First</b> tab panel</Tabs.Item>
          <Tabs.Item title={'Batch Orchestrator Metadata'}><b>First</b> tab panel</Tabs.Item>

        </Tabs>
      </div>
    </>
  );
};

export default AdhocSupport;
