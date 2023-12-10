import { api } from "~/trpc/react";
import { type HouseWork } from "./type";
import { Tr, Td, Button } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useHouseWorkContext } from "./context";

export function HouseWorkRow({
  houseWork,
  level = 0,
}: {
  houseWork: HouseWork;
  level?: number;
}) {
  const { selectedHouseWork, setSelectedHouseWork } = useHouseWorkContext();

  const trpc = api.useUtils();
  const deleteHouseWork = api.houseWork.delete.useMutation({
    onSettled: async () => {
      await trpc.houseWork.all.invalidate();
    },
  });

  return (
    <Tr bg={houseWork.id === selectedHouseWork?.id ? "white" : "transparent"}>
      <Td>{"→".repeat(level)}</Td>
      <Td>{houseWork.name}</Td>
      <Td>{houseWork.span}</Td>
      <Td>
        <Button
          variant="ghost"
          leftIcon={<EditIcon />}
          onClick={() => {
            setSelectedHouseWork(houseWork);
          }}
        >
          Edit
        </Button>
        <Button
          variant="ghost"
          leftIcon={<DeleteIcon />}
          onClick={() => deleteHouseWork.mutate({ id: houseWork.id })}
        >
          Delete
        </Button>
      </Td>
    </Tr>
  );
}
