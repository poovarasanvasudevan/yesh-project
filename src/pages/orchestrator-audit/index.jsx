import { IoIosRefresh } from "react-icons/io";
import {  Tabs, Button } from "flowbite-react";

const OrchestratorAudit = () => {
  return (
    <>
      <div className={'flex p-4 items-center'}>
        <div className={'flex-1'}>
          <h3 className={'font-semibold text-[18px]'}> Orchestrator Scheduler Audit</h3>
        </div>

        <div className={'flex flex-end gap-1'}>
          <Button size="xs">Load More</Button>
          <Button color="blue" size="xs">Refresh &nbsp;<IoIosRefresh /></Button>
        </div>
      </div>

      <div className={'flex-1 flex w-full px-4'} >
        <Tabs  aria-label="Default tabs"  variant="underline" className={'w-full'}>
          <Tabs.Item title={'Orchestrator Audit'}><b>First</b> tab panel</Tabs.Item>
          <Tabs.Item title={'Batch Orchestrator Audit'}><b>First</b> tab panel</Tabs.Item>
        </Tabs>
      </div>
    </>
  );
};

export default OrchestratorAudit;
