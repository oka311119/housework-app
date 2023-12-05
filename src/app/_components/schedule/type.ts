export type Schedule = {
  id: string;
  date: Date;
  doneDate: Date | null;
  houseWork: { name: string };
};
