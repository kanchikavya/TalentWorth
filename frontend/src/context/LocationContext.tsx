import React, { createContext, useContext, useState } from 'react';
import { formatSalaryByLocation, getCurrencyByLocation, type CurrencyConfig } from '../utils/currency';

interface LocationContextType {
  globalLocation: string;
  setGlobalLocation: (loc: string) => void;
  currencyConfig: CurrencyConfig;
  formatSalary: (amountUSD: number) => string;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [globalLocation, setGlobalLocationState] = useState<string>(() => {
    return localStorage.getItem("talent_worth_global_loc") || "Hyderabad (India)";
  });

  const setGlobalLocation = (loc: string) => {
    setGlobalLocationState(loc);
    localStorage.setItem("talent_worth_global_loc", loc);
  };

  const currencyConfig = getCurrencyByLocation(globalLocation);

  const formatSalary = (amountUSD: number) => {
    return formatSalaryByLocation(amountUSD, globalLocation);
  };

  return (
    <LocationContext.Provider value={{ globalLocation, setGlobalLocation, currencyConfig, formatSalary }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const ctx = useContext(LocationContext);
  if (!ctx) {
    throw new Error("useLocationContext must be used within LocationProvider");
  }
  return ctx;
};
