import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Attendance, EmployeeInterface } from '../../utils/Interface';

interface EmployeeContextType {
  employee: EmployeeInterface | null;
  setEmployee: React.Dispatch<React.SetStateAction<EmployeeInterface | null>>;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [employee, setEmployee] = useState<EmployeeInterface | null>(null);

  return (
    <EmployeeContext.Provider value={{ employee, setEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployeeContext must be used within an EmployeeProvider');
  }
  return context;
};
