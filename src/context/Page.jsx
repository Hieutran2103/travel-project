import { createContext, useContext, useState } from "react";

const PageContext = createContext();

const PageProvider = ({ children }) => {
  const [imagePost, setImagePost] = useState([]);
  const [contextPost, setContextPost] = useState([]);
  const [comment, setComment] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pageComment, setPageComment] = useState(1);
  const [limitComment, setLimitComment] = useState(5);
  const [limitVC, setLimitVC] = useState(10);
  const [founder, setFounder] = useState();

  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handleNextPageComment = () => {
    setPageComment(pageComment + 1);
  };
  const handleNextLimit = () => {
    setLimit(limit + 5);
  };
  return (
    <PageContext.Provider
      value={{
        imagePost,
        founder,
        setFounder,
        contextPost,
        setContextPost,
        setImagePost,
        setComment,
        comment,
        page,
        limit,
        pageComment,
        limitComment,
        handleNextPageComment,
        setPage,
        handleNextPage,
        handleNextLimit,
        limitVC,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
export default PageProvider;
export const useGlobalPage = () => useContext(PageContext);
