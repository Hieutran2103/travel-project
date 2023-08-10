import { createContext, useContext, useState } from "react";

const SearchContext = createContext();
export const useGlobalSearch = () => useContext(SearchContext);

const Search = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifiOpen, setIsNotifichOpen] = useState(false);
  const [isIntroduceOpen, setIntroduceOpen] = useState(false);
  const [isImageVacationOpen, setImageVacationOpen] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [editSpecific, setEditSpecific] = useState(false);
  const [userVacation, setUserVacation] = useState(false);

  const openUserVacation = () => {
    setUserVacation(true);
  };
  const closeUserVacation = () => {
    setUserVacation(false);
  };

  const openEditSpecific = () => {
    setEditSpecific(true);
  };
  const closeEditSpecific = () => {
    setEditSpecific(false);
  };

  const openEdit = () => {
    setEditPost(true);
  };
  const closeEdit = () => {
    setEditPost(false);
  };

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
        editPost,
        isSearchOpen,
        isIntroduceOpen,
        isNotifiOpen,
        isImageVacationOpen,
        editSpecific,
        userVacation,
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
        openEdit,
        closeEdit,
        openEditSpecific,
        closeEditSpecific,
        openUserVacation,
        closeUserVacation,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
export default Search;
