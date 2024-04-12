import { createContext, useContext, useState } from "react";

const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const value = {
    users,
    setUsers,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};

const useUsers = () => {
  return useContext(UsersContext);
};

export { UsersProvider, useUsers };
