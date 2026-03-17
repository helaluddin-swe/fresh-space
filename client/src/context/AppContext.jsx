import { createContext, useContext } from 'react';

// 1. Create the Context
export const AppContext = createContext();

// 2. Create a Custom Hook for easy access
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

const AppContextProvider = ({ children }) => {
  // Fix: Vite uses import.meta.env.VITE_VARIABLE_NAME
  const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const contextValue = {
    backendUrl,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;