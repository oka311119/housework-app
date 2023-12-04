"use client";

import { Box, Text } from "@radix-ui/themes";
import { useState } from "react";
import { type Schedule } from "../_types/types";
import { api } from "~/trpc/react";

export function Card({ schedule }: { schedule: Schedule }) {
  const diffDays = calculateDateDifference(
    schedule.date as string | number | Date,
  );
  let iconColor = null;
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { mutate } = api.post.createNextHouseWork.useMutation();

  if (diffDays === 0) {
    iconColor = "yellow";
  } else if (diffDays < 0) {
    iconColor = "red";
  }

  const handleScheduleClick = async (id: string) => {
    if (selectedId === id) {
      // await createNextHouseWork(id);
      mutate({ id });
      // .useMutation({ id: id })
      // .catch((error) => console.error(error));
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  };

  return (
    <Box
      key={schedule.id}
      onClick={() => handleScheduleClick(schedule.id)}
      style={{ border: selectedId === schedule.id ? "2px solid" : "none" }}
    >
      {schedule.houseWork.name}
      <Text>{diffDays}</Text>
      {/* {iconColor && <Icon color={iconColor} />} */}
    </Box>
  );
}

function calculateDateDifference(scheduleDate: string | number | Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const schedule = new Date(scheduleDate);
  schedule.setHours(0, 0, 0, 0);

  const diffTime = Math.abs(schedule.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}
