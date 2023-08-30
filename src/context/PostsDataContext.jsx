import React, {useContext, useState} from "react";

const PostsDataContext = React.createContext();

export function PostsDataProvider({children}) {
  const [postsData, setPostsData] = useState(null);

  return (
    <PostsDataContext.Provider value={{postsData, setPostsData}}>
      {children}
    </PostsDataContext.Provider>
  );
}

export function usePostsData() {
  const context = useContext(PostsDataContext);
  if (context === undefined) {
    throw new Error("usePostsData must be used within a PostsDataProvider");
  }
  return context;
}
