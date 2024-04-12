import { createContext, useContext, useState } from "react";

const LeadsContext = createContext();

const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);

  const value = {
    leads,
    setLeads,
  };

  return (
    <LeadsContext.Provider value={value}>{children}</LeadsContext.Provider>
  );
};

const useLeads = () => {
  return useContext(LeadsContext);
};

export { LeadProvider, useLeads };
