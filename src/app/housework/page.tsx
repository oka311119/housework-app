import { type HouseWork } from "@prisma/client";
import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import { HouseWorkList } from "../_components/housework-list";
import { HouseWorkForm } from "../_components/housework-form";

type PresentationProps = {
  readonly houseWorks: HouseWork[];
};

function HouseWorkPagePresentation({ houseWorks }: PresentationProps) {
  return (
    <>
      <h2>housework</h2>
      <HouseWorkList houseWorks={houseWorks} />
      <HouseWorkForm />
    </>
  );
}

export default async function HouseWorkPage() {
  const houseWorks = await api.post.getHouseWorks.query();

  if (!houseWorks) {
    return notFound();
  }

  return HouseWorkPagePresentation({ houseWorks });
}
