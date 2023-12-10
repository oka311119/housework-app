import { format } from "date-fns";
import { type Schedule } from "./type";
import { api } from "~/trpc/react";
import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import { CheckIcon, RepeatClockIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { differenceInDays, startOfDay } from "date-fns";

export function ScheduleRow(schedule: Schedule) {
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
  const undo = api.schedule.undo.useMutation({
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
        bg={"white"}
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
        <HStack>
          <Button
            flex="1"
            variant="ghost"
            leftIcon={<CheckIcon />}
            onClick={() => createNext.mutate({ id: schedule.id })}
            hidden={!isSelected}
          >
            <Flex alignItems="baseline">
              <Text fontWeight="bold">Done</Text>
              <Text fontSize="sm" hidden={!!schedule.houseWork.parent}>
                (+{schedule.houseWork.span})
              </Text>
            </Flex>
          </Button>

          <Button
            flex="1"
            variant="ghost"
            leftIcon={<RepeatClockIcon />}
            onClick={() => undo.mutate({ id: schedule.houseWork.id })}
            hidden={!isSelected || !!schedule.houseWork.parent}
          >
            <Flex alignItems="baseline">
              <Text fontWeight="bold">Undo</Text>
              <Text fontSize="sm">(-{schedule.houseWork.span})</Text>
            </Flex>
          </Button>
        </HStack>
      </Box>
    </>
  );
}
