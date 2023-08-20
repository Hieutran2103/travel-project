import "./posts.scss";

import Post from "../post/Post";
import { useGlobalContextAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useGlobalPage } from "../../context/Page";
import { useQuery } from "@tanstack/react-query";

import customFetch from "../../utils/url";

const Posts = () => {
  const { currentUser } = useGlobalContextAuth();
  const [currentpost, setCurrentpost] = useState(0);
  // console.log(currentpost);

  const { page, limit } = useGlobalPage();
  const { data, isLoading } = useQuery({
    queryKey: ["postsNF", page],
    queryFn: () => customFetch.get(`/posts?page=${page}&limit=${limit}`),
  });
  if (!data) {
    return null;
  }
  const reponse = data.data.result.posts;

  return (
    <div className="posts">
      {reponse &&
        reponse.map((post, index) => {
          return (
            <Post
              key={index}
              post={post}
              index={index}
              setCurrentpost={setCurrentpost}
              currentpost={currentpost}
            />
          );
        })}
    </div>
  );
};

export default Posts;
