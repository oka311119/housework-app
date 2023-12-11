import React, { useEffect, useState } from "react";
import * as z from "zod";
import { api } from "~/trpc/react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Select,
  Text,
  HStack,
} from "@chakra-ui/react";
import { CloseIcon, EditIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { type HouseWork } from "./type";
import { useHouseWorkContext } from "./context";

interface HouseWorkFormProps {
  initialData?: HouseWork;
}

const houseWorkSchema = z.object({
  name: z.string(),
  span: z.number(),
  icon: z.string().nullable(),
  parentId: z.string().nullable(),
});

export function HouseWorkForm({ initialData }: HouseWorkFormProps) {
  const parents = api.houseWork.all.useQuery();

  const trpc = api.useUtils();
  const createHouseWork = api.houseWork.create.useMutation({
    onSettled: async () => {
      await trpc.houseWork.all.invalidate();
    },
  });
  const updateHouseWork = api.houseWork.update.useMutation({
    onSettled: async () => {
      await trpc.houseWork.all.invalidate();
    },
  });

  const [id, setId] = useState(initialData?.id ?? null);
  const [isCreateForm, setIsCreateForm] = useState(false);
  const [name, setName] = useState("");
  const [span, setSpan] = useState(1);
  const [errors, setErrors] = useState({}); // TODO:
  const [parentId, setParentId] = useState<string | null>(null);
  const { selectedHouseWork, setSelectedHouseWork } = useHouseWorkContext();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const validatedValues = houseWorkSchema.safeParse({
        name,
        span,
        icon: null,
        parentId: parentId === "" ? null : parentId,
      });

      if (validatedValues.success) {
        if (id) {
          console.log("update");
          updateHouseWork.mutate({ id, ...validatedValues.data });
        } else {
          console.log("create");
          createHouseWork.mutate(validatedValues.data);
        }
        setSelectedHouseWork(null);
      } else {
        setErrors(validatedValues.error.formErrors.fieldErrors);
        console.log("error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onClose = () => {
    setSelectedHouseWork(null);
  };

  useEffect(() => {
    setIsCreateForm(selectedHouseWork === null);
    setId(selectedHouseWork?.id ?? null);
    setName(selectedHouseWork?.name ?? "");
    setSpan(selectedHouseWork?.span ?? 1);
    setParentId(selectedHouseWork?.parent ?? null);
  }, [selectedHouseWork]);

  return (
    <>
      <HStack h={4} py={4}>
        {!isCreateForm && (
          <>
            <Text fontSize="large">{selectedHouseWork?.name}</Text>
            <CloseIcon fontSize="small" onClick={onClose} />
          </>
        )}
      </HStack>

      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl id="span">
            <FormLabel>Span</FormLabel>
            <Input
              type="number"
              value={span}
              onChange={(e) => setSpan(Number(e.target.value))}
            />
          </FormControl>

          <FormControl id="parent">
            <FormLabel>Parent</FormLabel>
            <Select
              placeholder="-"
              value={parentId ?? ""}
              onChange={(e) => setParentId(e.target.value)}
            >
              {parents?.data
                ?.filter((parent) => parent.parent === null)
                .map((parent) => (
                  <option key={parent.id} value={parent.id}>
                    {parent.name}
                  </option>
                ))}
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="ghost"
            leftIcon={isCreateForm ? <PlusSquareIcon /> : <EditIcon />}
          >
            {isCreateForm ? "Create" : "Edit"}
          </Button>
        </VStack>
      </form>
    </>
  );
}
