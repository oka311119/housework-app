import { api } from "~/trpc/server";

import { Flex } from "@radix-ui/themes";
import { Card } from "./_components/card";
import { type Schedule } from "./_types/types";
import Link from "next/link";

export function HomePresenteation({ schedules }: { schedules: Schedule[] }) {
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

export default async function Home() {
  const schedules = await api.post.getSchedules.query();
  console.log(schedules);

  return <HomePresenteation schedules={schedules} />;
}
