import { createContext, useContext, useState } from "react";

const SearchContext = createContext();
export const useGlobalSearch = () => useContext(SearchContext);

const Search = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifiOpen, setIsNotifichOpen] = useState(false);
  const [isIntroduceOpen, setIntroduceOpen] = useState(false);
  const [isImageVacationOpen, setImageVacationOpen] = useState(false);

  const openIntroduce = () => {
    setIntroduceOpen(true);
  };
  const closeIntroduce = () => {
    setIntroduceOpen(false);
  };

  const openImageVacation = () => {
    setImageVacationOpen(true);
  };
  const closeImageVacation = () => {
    setImageVacationOpen(false);
  };

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
        isIntroduceOpen,
        isNotifiOpen,
        isImageVacationOpen,
        setIsSearchOpen,
        setIsNotifichOpen,
        openSearch,
        closeSearch,
        openNotifi,
        closeNotifi,
        openIntroduce,
        closeIntroduce,
        openImageVacation,
        closeImageVacation,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
export default Search;
