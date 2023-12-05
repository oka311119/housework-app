import { api } from "~/trpc/react";
import { type HouseWork } from "./type";

export function HouseWorkRow(houseWork: HouseWork) {
  const trpc = api.useUtils();
  const deleteHouseWork = api.houseWork.delete.useMutation({
    onSettled: async () => {
      await trpc.houseWork.all.invalidate();
    },
  });

  return (
    <>
      <div>
        <p>{houseWork.id}</p>
        <p>{houseWork.name}</p>
        <p>{houseWork.span}</p>
        <p>{houseWork.parent}</p>
        <button onClick={() => deleteHouseWork.mutate({ id: houseWork.id })}>
          delete
        </button>
      </div>
    </>
  );
}
