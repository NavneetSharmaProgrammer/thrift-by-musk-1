import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { launchDate } from './constants.ts';

interface DropContextType {
  isDropLive: boolean;
  launchDate: string;
}

const DropContext = createContext<DropContextType | undefined>(undefined);

export const DropProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDropLive, setIsDropLive] = useState(new Date() >= new Date(launchDate));

  useEffect(() => {
    if (isDropLive) return;

    const checkDate = () => {
      if (new Date() >= new Date(launchDate)) {
        setIsDropLive(true);
        if (interval) clearInterval(interval);
      }
    };

    const interval = setInterval(checkDate, 1000);
    checkDate(); // Initial check

    return () => clearInterval(interval);
  }, [isDropLive]);

  const value = { isDropLive, launchDate };

  return <DropContext.Provider value={value}>{children}</DropContext.Provider>;
};

export const useDrop = (): DropContextType => {
  const context = useContext(DropContext);
  if (context === undefined) {
    throw new Error('useDrop must be used within a DropProvider');
  }
  return context;
};
