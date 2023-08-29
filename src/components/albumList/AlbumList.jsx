import React, {useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import AddIcon from "@mui/icons-material/Add";
import customFetch from "../../utils/url";
import {useQuery} from "@tanstack/react-query";
import {useGlobalPage} from "../../context/Page";
import {useGlobalContextAuth} from "../../context/AuthContext";
import "./albumList.scss";

function AlbumList() {
  const {currentUser} = useGlobalContextAuth();
  const {page, limit, handleNextLimit} = useGlobalPage();
  const containerRef = useRef(null);
  const createAlbumItem = {
    title: "Create Album",
    num: 0,
    isCreateAlbum: true,
  };

  const userID = currentUser.id;
  const apiUrlAlbum = `albums/user/${userID}?limit=${limit}&page=${page}`;

  const fetchAlbumInfo = async () => {
    try {
      const response = await customFetch.get(apiUrlAlbum);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching album data");
    }
  };

  const {
    data: albumData,
    isLoading: isAlbumLoading,
    isError: isAlbumError,
  } = useQuery(["albumData", apiUrlAlbum], fetchAlbumInfo);

  useEffect(() => {
    function handleScroll() {
      const container = containerRef.current;
      if (
        container &&
        container.scrollTop + container.clientHeight >= container.scrollHeight
      ) {
        handleNextLimit();
      }
    }

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleNextLimit, page, limit]);

  if (isAlbumLoading) {
    return;
  }

  if (isAlbumError) {
    return (
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  const albums = albumData.data;

  const modifiedItemData = [createAlbumItem, ...(albums || [])];

  console.log(albums);
  return (
    <div className="albumList" ref={containerRef}>
      <ImageList
        cols={4}
        className="noGapImageList"
        style={{paddingTop: 0, paddingBottom: 0}}
      >
        {modifiedItemData.map((item) => (
          <ImageListItem
            className={`imageList ${
              item.isCreateAlbum ? "createAlbumItem" : ""
            }`}
            key={item._id || "createAlbum"}
          >
            {item.isCreateAlbum ? (
              <Link
                to="/profile/createAlbum"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{position: "relative"}}>
                  <div className="createAlbumContent">
                    <AddIcon
                      style={{
                        fontSize: 50,
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "20px",
                      marginTop: "10px",
                    }}
                  >
                    {item.title}
                  </span>
                </div>
              </Link>
            ) : (
              <Link
                to={`/profile/${userID}/albums/${item._id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <img
                  className="imagePost"
                  src={item.medias[0]?.url || "default_image_url"}
                  alt={item.album_name}
                  loading="lazy"
                />
                <ImageListItemBar
                  className="titleBar"
                  title={
                    <span
                      style={{
                        fontSize: "20px",
                        margin: "100px 0px",
                      }}
                    >
                      {item.album_name}
                    </span>
                  }
                  subtitle={<span>{item.album_description}</span>}
                  position="below"
                />
              </Link>
            )}
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default AlbumList;
