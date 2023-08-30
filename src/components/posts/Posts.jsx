import React, { useState } from "react";
import "./posts.scss";

import Post from "../post/Post";
import { useGlobalPage } from "../../context/Page";
import { useQuery } from "@tanstack/react-query";
import customFetch from "../../utils/url";
import Button from "../buttonNextPage/Button";
import InfiniteScroll from "react-infinite-scroll-component";
import { usePostsData } from "../../context/PostsDataContext";

const Posts = () => {
  const [hasMore, setHasMore] = useState(true);
  const { page, limit, handleNextLimit } = useGlobalPage();
  const { postsData, setPostsData } = usePostsData();
  const moreData = () => {
    if (response.length < 50) {
      setTimeout(() => {
        handleNextLimit();
      }, 2000);
    } else {
      setHasMore(false);
    }
  };
  const { data, isLoading } = useQuery({
    queryKey: ["postsNF", limit],
    queryFn: () => customFetch.get(`/posts?page=${page}&limit=${limit}`),
  });
  if (!data) {
    return null;
  }

  const response = data.data.result.posts;

  if (isLoading) {
    return <Button />;
  }

  if (postsData === null) {
    null;
  }

  return (
    <>
      <InfiniteScroll
        style={{ background: "transparent" }}
        dataLength={response.length}
        next={moreData}
        hasMore={hasMore}
        loader={<p style={{ textAlign: "center" }}> Loading...</p>}
        endMessage={
          <p style={{ textAlign: "center" }}> You read all posts today</p>
        }
      >
        {" "}
        <div className="posts">
          {response &&
            response.map((post, index) => {
              return <Post key={index} post={post} />;
            })}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Posts;
