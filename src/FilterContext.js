import React, { createContext, useState } from "react";
export const FilterContext = createContext();
// This context provider is passed to any component requiring the context
export const FilterProvider = ({ children }) => {
  const [selectedRange, setSelectedRange] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState([]);
  return (
    <FilterContext.Provider
      value={{
        selectedRange,
        setSelectedRange,
        selectedUsers,
        setSelectedUsers,
        selectedLabel,
        setSelectedLabel
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
