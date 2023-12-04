"use client";

import React, { useState } from "react";
import { api } from "~/trpc/react";

export function HouseWorkForm() {
  const [name, setName] = useState("");
  const [span, setSpan] = useState(0);
  const [icon, setIcon] = useState("");
  const [parentId, setParentId] = useState("");

  const createHouseWork = api.post.createNewHouseWork.useMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createHouseWork.mutate({ name, span, icon, parentId });
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Span:
        <input
          type="number"
          value={span}
          onChange={(e) => setSpan(Number(e.target.value))}
        />
      </label>
      <label>
        Icon:
        <input
          type="text"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
        />
      </label>
      <label>
        Parent ID:
        <input
          type="text"
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
