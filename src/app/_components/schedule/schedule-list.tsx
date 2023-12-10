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
import { ScheduleRow } from "./schedule-row";
import { type Schedule } from "./type";

export function ScheduleList() {
  return (
    <>
      <Tabs variant="soft-rounded" colorScheme="green">
        <TabList>
          <Tab>Due Soon</Tab>
          <Tab>By Created</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SimpleGrid columns={4} spacing="40px">
              <SortedScheduleList sortType={"DueSoon"} />
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid columns={4} spacing="40px">
              <SortedScheduleList sortType={"Created"} />
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

type SortType = "DueSoon" | "Created";

function SortedScheduleList({ sortType }: { sortType: SortType }) {
  const { data, isLoading, isError } = api.schedule.pendingAll.useQuery();
  const schedules = (data ?? []) as Schedule[];

  const sortedSchedules = schedules.sort((a, b) => {
    switch (sortType) {
      case "DueSoon":
        return +new Date(a.date) - +new Date(b.date);
      case "Created":
        return (
          +new Date(a.houseWork.createdAt) - +new Date(b.houseWork.createdAt)
        );
    }
  });

  if (isLoading) return <LoadingIndicator />;
  if (isError) return <ErrorMessageBox />;

  return (
    <>
      {sortedSchedules.map((schedule) => {
        return <ScheduleRow key={schedule.id} {...schedule} />;
      })}
    </>
  );
}
