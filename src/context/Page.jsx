import { createContext, useContext, useState } from "react";

const PageContext = createContext();

const PageProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const handleNextPage = () => {
    setPage((oldPage) => {
      const newPage = oldPage + 1;
      return setPage(newPage);
    });
  };
  const handleIncreaseLimit = () => {
    setLimit((oldLimit) => {
      const newLimit = oldLimit + 10;
      return setPage(newLimit);
    });
  };

  return (
    <PageContext.Provider
      value={{ page, limit, handleNextPage, handleIncreaseLimit }}
    >
      {children}
    </PageContext.Provider>
  );
};
export default PageProvider;
export const useGlobalPage = () => useContext(PageContext);
