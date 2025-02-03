import { useSetState } from "ahooks";
import { Button, Dropdown , Tabs} from "flowbite-react";
import { IoIosRefresh } from "react-icons/io";


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


      <div className={'flex p-4'}>
        <div className={'flex-1'}>
        <h3>Orchestrator Scheduler Audit</h3>
        </div>

        <div className={'flex flex-end gap-1'}>
          <Button color="blue" size="xs">
            Load More
          </Button>
          <Button color="blue" size="xs">
            Refresh
            <IoIosRefresh />
          </Button>

          <Dropdown  size="xs" label="Dropdown button" dismissOnClick={false}>
            <Dropdown.Item>Force Run</Dropdown.Item>
            <Dropdown.Item>Unload</Dropdown.Item>
            <Dropdown.Item>Active</Dropdown.Item>
            <Dropdown.Item>I Active</Dropdown.Item>
          </Dropdown>
        </div>
      </div>

      <div className={'flex-1 flex'} >
        <Tabs  aria-label="Default tabs"  variant="underline">
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
