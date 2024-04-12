import { createContext, useContext, useState } from "react";

const KycContext = createContext();

const KycProvider = ({ children }) => {
  const [kycData, setKycData] = useState([]);

  const value = {
    kycData,
    setKycData,
  };

  return <KycContext.Provider value={value}>{children}</KycContext.Provider>;
};

const useKyc = () => {
  return useContext(KycContext);
};

export { KycProvider, useKyc };
