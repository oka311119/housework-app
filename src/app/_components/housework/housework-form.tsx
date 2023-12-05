import React, { useState } from "react";
import * as z from "zod";
import { api } from "~/trpc/react";

const houseWorkSchema = z.object({
  name: z.string(),
  span: z.number(),
  icon: z.string().nullable(),
  parentId: z.string().nullable(),
});

export function HouseWorkForm() {
  const trpc = api.useUtils();
  const createHouseWork = api.houseWork.create.useMutation({
    onSettled: async () => {
      await trpc.houseWork.all.invalidate();
    },
  });

  const [name, setName] = useState("");
  const [span, setSpan] = useState(0);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const validatedValues = houseWorkSchema.safeParse({
        name,
        span,
        icon: null,
        parentId: null,
      });
      console.log(validatedValues);
      if (validatedValues.success) {
        createHouseWork.mutate(validatedValues.data);
      } else {
        setErrors(validatedValues.error.formErrors.fieldErrors);
        console.log("error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="span">span</label>
        <input
          id="span"
          type="number"
          name="span"
          value={span}
          onChange={(e) => setSpan(Number(e.target.value))}
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
