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
  const deleteHouseWork = api.post.deleteHouseWork.useMutation();

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
