import { createContext, useContext, useState } from "react";

const SearchContext = createContext();
export const useGlobalSearch = () => useContext(SearchContext);

const Search = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifiOpen, setIsNotifichOpen] = useState(false);

  const openSearch = () => {
    setIsSearchOpen(true);
  };
  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const openNotifi = () => {
    setIsNotifichOpen(true);
  };
  const closeNotifi = () => {
    setIsNotifichOpen(false);
  };

  return (
    <SearchContext.Provider
      value={{
        isSearchOpen,
        isNotifiOpen,
        setIsSearchOpen,
        setIsNotifichOpen,
        openSearch,
        closeSearch,
        openNotifi,
        closeNotifi,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
export default Search;
