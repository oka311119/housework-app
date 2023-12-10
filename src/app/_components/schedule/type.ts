import { type HouseWork } from "../housework/type";

export type Schedule = {
  id: string;
  date: Date;
  doneDate: Date | null;
  houseWork: HouseWork;
};
