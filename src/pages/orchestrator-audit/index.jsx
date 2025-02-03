import { IoIosRefresh } from "react-icons/io";
import {  Tabs, Button } from "flowbite-react";

const OrchestratorAudit = () => {
  return (
    <>
      <div className={'flex p-4'}>
        <div className={'flex-1'}>
          <h3> Orchestrator Scheduler Audit</h3>
        </div>

        <div className={'flex flex-end gap-1'}>
          <Button color="blue" size="xs">
            Load More
          </Button>
          <Button color="blue" size="xs">
            Refresh
            <IoIosRefresh />
          </Button>
        </div>
      </div>

      <div className={'flex-1 flex'} >
        <Tabs  aria-label="Default tabs"  variant="underline">
          <Tabs.Item title={'Orchestrator Audit'}><b>First</b> tab panel</Tabs.Item>
          <Tabs.Item title={'Batch Orchestrator Audit'}><b>First</b> tab panel</Tabs.Item>
        </Tabs>
      </div>
    </>
  );
};

export default OrchestratorAudit;
