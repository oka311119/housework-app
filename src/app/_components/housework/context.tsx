import React, { createContext, useContext, useState } from "react";
import { type HouseWork } from "./type";

interface HouseWorkContextValue {
  selectedHouseWork: HouseWork | null;
  setSelectedHouseWork: (houseWork: HouseWork | null) => void;
}

const HouseWorkContext = createContext<HouseWorkContextValue | undefined>(
  undefined,
);

export const HouseWorkProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedHouseWork, setSelectedHouseWork] = useState<HouseWork | null>(
    null,
  );

  return (
    <HouseWorkContext.Provider
      value={{ selectedHouseWork, setSelectedHouseWork }}
    >
      {children}
    </HouseWorkContext.Provider>
  );
};

export const useHouseWorkContext = () => {
  const context = useContext(HouseWorkContext);
  if (!context) {
    throw new Error(
      "useHouseWorkContext must be used within a HouseWorkProvider",
    );
  }
  return context;
};
