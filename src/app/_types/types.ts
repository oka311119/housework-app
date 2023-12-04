export type Schedule = {
  id: string;
  date: Date;
  houseWork: { name: string };
};

export type HouseWork = {
  id: string;
  name: string;
  icon: string | undefined;
  parent: string | undefined;
};
