"use client";

import { api } from "~/trpc/react";

import { Flex } from "@radix-ui/themes";
import { Card } from "./_components/card";
import Link from "next/link";
import { LoadingIndicator } from "./_components/loading-indicator";
import { ErrorText } from "./_components/error-text";

export default function Home() {
  const {
    data: schedules,
    isLoading,
    isError,
  } = api.post.getSchedules.useQuery();
  const createNextHouseWork = api.post.createNextHouseWork.useMutation();

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <ErrorText />;

  return (
    <>
      <h2>schedules</h2>
      <Flex direction="column" gap="2">
        {schedules?.map((schedule) => (
          <Card
            key={schedule.id}
            schedule={schedule}
            createNextHouseWork={async () =>
              createNextHouseWork.mutate({ id: schedule.id })
            }
          />
        ))}
      </Flex>
      <Link href="/housework">houseWork→</Link>
    </>
  );
}
