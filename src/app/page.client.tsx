"use client";

import { Flex } from "@radix-ui/themes";
import { Card } from "./_components/card";
import { type Schedule } from "./_types/types";
import Link from "next/link";

export default function HomeClient({ schedules }: { schedules: Schedule[] }) {
  const handleClick = () => {
    console.log("click");
  };
  return (
    <>
      <h2>schedules</h2>
      <Flex direction="column" gap="2">
        {schedules.map((schedule) => (
          <Card key={schedule.id} schedule={schedule} />
        ))}
      </Flex>
      <Link href="/housework">houseWork→</Link>
    </>
  );
}
