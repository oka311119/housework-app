import {
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  SimpleGrid,
} from "@chakra-ui/react";
import { api } from "~/trpc/react";
import { LoadingIndicator } from "../loading-indicator";
import { ErrorMessageBox } from "../message-box";
import { ScheduleRow, ScheduleRowPending } from "./schedule-row";

export function ScheduleList() {
  return (
    <>
      <Tabs variant="soft-rounded" colorScheme="green">
        <TabList>
          <Tab>Pending</Tab>
          <Tab>All</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SimpleGrid columns={4} spacing="40px">
              <ScheduleListPending />
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid columns={4} spacing="40px">
              <ScheduleListAll />
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

function ScheduleListAll() {
  const { data: schedules, isLoading, isError } = api.schedule.all.useQuery();

  if (isLoading) return <LoadingIndicator />;
  if (isError) return <ErrorMessageBox />;
  return (
    <>
      {schedules.map((schedule) => {
        return <ScheduleRow key={schedule.id} {...schedule} />;
      })}
    </>
  );
}

function ScheduleListPending() {
  const {
    data: schedules,
    isLoading,
    isError,
  } = api.schedule.pendingAll.useQuery();

  if (isLoading) return <LoadingIndicator />;
  if (isError) return <ErrorMessageBox />;
  return (
    <>
      {schedules.map((schedule) => {
        return <ScheduleRowPending key={schedule.id} {...schedule} />;
      })}
    </>
  );
}
