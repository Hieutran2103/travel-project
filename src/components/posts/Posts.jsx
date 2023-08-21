import "./posts.scss";

import Post from "../post/Post";
import { useGlobalContextAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useGlobalPage } from "../../context/Page";
import { useQuery } from "@tanstack/react-query";

import customFetch from "../../utils/url";
import Button from "../buttonNextPage/Button";

const Posts = () => {
  // const { currentUser } = useGlobalContextAuth();
  const [currentpost, setCurrentpost] = useState(0);

  const { page, limit } = useGlobalPage();
  const { data, isLoading } = useQuery({
    queryKey: ["postsNF", page],
    queryFn: () => customFetch.get(`/posts?page=${page}&limit=${limit}`),
  });
  if (!data) {
    return null;
  }
  const reponse = data.data.result.posts;

  if (isLoading) {
    return;
  }

  return (
    <>
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
      {reponse.length === 10 ? <Button /> : ""}
    </>
  );
};

export default Posts;
