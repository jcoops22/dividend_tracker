import React, { useState, useEffect, createContext } from "react";

export const UserContext = createContext({
  currentUser: null,
  currentUserStocks: [],
  setCurrentUserAction: () => {},
});

// PROVIDER
const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserStocks, setCurrentUserStocks] = useState([]);
  const setCurrentUserAction = (user) => setCurrentUser(user);
  const setCurrentUserStocksAction = (stocks) => setCurrentUserStocks(stocks);

  useEffect(() => {
    if (!currentUser) {
      window.localStorage.setItem("currentUser", null);
    } else {
      window.localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        currentUserStocks,
        setCurrentUserAction,
        setCurrentUserStocksAction,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
