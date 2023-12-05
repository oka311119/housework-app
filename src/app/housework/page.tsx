"use client";

import { HouseWorkForm } from "../_components/housework/housework-form";
import { HouseWorkList } from "../_components/housework/housework-list";

export default function HouseWorkPage() {
  return (
    <>
      <h2>housework</h2>
      <div>
        <HouseWorkForm />
      </div>
      <div>
        <HouseWorkList />
      </div>
    </>
  );
}
