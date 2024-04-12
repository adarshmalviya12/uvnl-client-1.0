import { createContext, useContext, useState } from "react";

const OpportunityContext = createContext();

const OpportunityProvider = ({ children }) => {
  const [opportunities, setOpportunities] = useState([]);

  const value = {
    opportunities,
    setOpportunities,
  };

  return (
    <OpportunityContext.Provider value={value}>
      {children}
    </OpportunityContext.Provider>
  );
};

const useOpportunities = () => {
  return useContext(OpportunityContext);
};

export { OpportunityProvider, useOpportunities };
