"use client";

import { api } from "~/trpc/react";
import { HouseWorkList } from "../_components/housework-list";
import { HouseWorkForm } from "../_components/housework-form";
import { LoadingIndicator } from "../_components/loading-indicator";
import { ErrorText } from "../_components/error-text";

export default function HouseWorkPage() {
  const {
    data: houseWorks,
    isLoading,
    isError,
  } = api.post.getHouseWorks.useQuery();

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <ErrorText />;

  return (
    <>
      <h2>housework</h2>
      <HouseWorkList houseWorks={houseWorks ?? []} />
      <HouseWorkForm />
    </>
  );
}
