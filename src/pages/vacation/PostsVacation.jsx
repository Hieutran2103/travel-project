import "./postsVacation.scss";

import { useEffect, useState } from "react";
import { useGlobalPage } from "../../context/Page";
import { useQuery } from "@tanstack/react-query";
import customFetch from "../../utils/url";

import InfiniteScroll from "react-infinite-scroll-component";
import PostVC from "./PostVC";

const PostsVacation = ({ dataVacation }) => {
  const [hasMore, setHasMore] = useState(true);

  const { page, limitVC, handleNextLimit } = useGlobalPage();

  const moreData = () => {
    if (reponse.length < 50) {
      setTimeout(() => {
        handleNextLimit();
      }, 2000);
    } else {
      setHasMore(false);
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["postsVacation", limitVC],
    queryFn: () =>
      customFetch.get(
        `/vacations/posts-list/${dataVacation._id}?limit=${limitVC}&page=${page}`
      ),
  });

  if (!data) {
    return null;
  }
  const reponse = data.data.data;

  if (isLoading) {
    return <div className="div">21341234</div>;
  }

  return (
    <>
      <InfiniteScroll
        style={{ background: "transparent" }}
        dataLength={reponse.length}
        next={moreData}
        hasMore={hasMore}
        loader={<p style={{ textAlign: "center" }}> Loading...</p>}
        endMessage={
          <p style={{ textAlign: "center" }}> You read all posts today</p>
        }
      >
        {" "}
        <div className="postsVacation">
          {reponse &&
            reponse.map((post, index) => {
              return <PostVC key={index} post={post} />;
            })}
        </div>{" "}
      </InfiniteScroll>
    </>
  );
};

export default PostsVacation;
