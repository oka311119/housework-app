import { api } from "~/trpc/react";
import { LoadingIndicator } from "../loading-indicator";
import { ErrorMessageBox } from "../message-box";
import { HouseWorkRow } from "./housework-row";

export function HouseWorkList() {
  const { data: houseWorks, isLoading, isError } = api.houseWork.all.useQuery();

  if (isLoading) return <LoadingIndicator />;
  if (isError) return <ErrorMessageBox />;

  return (
    <>
      {houseWorks.map((houseWork) => {
        return <HouseWorkRow key={houseWork.id} {...houseWork} />;
      })}
    </>
  );
}
