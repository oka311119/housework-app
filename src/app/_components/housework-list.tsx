"use client";

import { type HouseWork } from "@prisma/client";
import { Button } from "@radix-ui/themes";
import { api } from "~/trpc/react";

type Props = {
  readonly houseWorks: HouseWork[];
};

export function HouseWorkList({ houseWorks }: Props) {
  return (
    <>
      {houseWorks.map((h) => (
        <HouseWorkListRow key={h.id} {...h} />
      ))}
    </>
  );
}

function HouseWorkListRow(houseWork: HouseWork) {
  const trpc = api.useUtils();
  const deleteHouseWork = api.post.deleteHouseWork.useMutation({
    onSettled: async () => {
      await trpc.post.getHouseWorks.invalidate();
    },
  });

  return (
    <>
      <p>
        {houseWork.id}, {houseWork.name}, {houseWork.span}, {houseWork.parent}
        <Button onClick={() => deleteHouseWork.mutate({ id: houseWork.id })}>
          削除
        </Button>
      </p>
    </>
  );
}
