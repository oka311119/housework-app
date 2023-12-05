import { format } from "date-fns";
import { type Schedule } from "./type";
import { api } from "~/trpc/react";
import { Box, Button, HStack, Text, VStack, Spacer } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { differenceInDays, startOfDay } from "date-fns";

export function ScheduleRow(schedule: Schedule) {
  const doneDateElement = schedule.doneDate ? <CheckIcon /> : null;

  return (
    <>
      <Box bg={"whitesmoke"} p={4}>
        <Text>
          {doneDateElement}
          {schedule.houseWork.name}
        </Text>
        <Text>{format(schedule.date, "yyyy-MM-dd")}</Text>
      </Box>
    </>
  );
}

export function ScheduleRowPending(schedule: Schedule) {
  const [isSelected, setIdSelected] = useState(false);

  const today = startOfDay(new Date());
  const scheduleDate = startOfDay(schedule.date);
  const diffDays = differenceInDays(scheduleDate, today);

  const trpc = api.useUtils();
  const createNext = api.schedule.createNext.useMutation({
    onSettled: async () => {
      await trpc.schedule.pendingAll.invalidate();
    },
  });

  const onCardTapped = () => {
    if (isSelected) {
      setIdSelected(false);
    } else {
      setIdSelected(true);
    }
  };

  return (
    <>
      <Box
        bg={"whitesmoke"}
        px={4}
        onClick={onCardTapped}
        h={"120px"}
        boxShadow="lg"
        borderRadius="md"
      >
        <HStack>
          <Text fontSize="4xl" fontWeight="bold">
            {diffDays}
          </Text>
          <Text fontSize="md">{schedule.houseWork.name}</Text>
        </HStack>
        <Text fontSize="sm">{format(schedule.date, "MM月dd日")}</Text>
        <Button
          flex="1"
          variant="ghost"
          leftIcon={<CheckIcon />}
          onClick={() => createNext.mutate({ id: schedule.id })}
          hidden={!isSelected}
        >
          Done
        </Button>
      </Box>
    </>
  );
}
