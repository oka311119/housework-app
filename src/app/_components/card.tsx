"use client";

import { Box, Text } from "@radix-ui/themes";
import { useState } from "react";
import { type Schedule } from "../_types/types";
import { calculateDateDifference } from "../helper/calculate-date";

export function Card({
  schedule,
  createNextHouseWork,
}: {
  schedule: Schedule;
  createNextHouseWork: () => Promise<void>;
}) {
  const diffDays = calculateDateDifference(new Date(schedule.date));
  let iconColor = null;
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (diffDays === 0) {
    iconColor = "yellow";
  } else if (diffDays < 0) {
    iconColor = "red";
  }

  const handleScheduleClick = async (id: string) => {
    if (selectedId === id) {
      await createNextHouseWork();
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
