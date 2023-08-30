import React from "react";
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
  const {page, limit} = useGlobalPage();
  const createAlbumItem = {
    title: "Create Album",
    num: 0,
    isCreateAlbum: true,
  };

  const url = window.location.pathname.split("/");
  const userID = url[url.length - 2];
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

  if (isAlbumLoading) {
    return;
  }

  if (isAlbumError) {
    return;
  }

  const albums = albumData.data;
  const modifiedItemData = [createAlbumItem, ...(albums || [])];

  if (albums.length === 0) {
    return (
      <div className="albumList">
        <p className="noAlbumsMessage">No albums to show</p>
      </div>
    );
  }

  return (
    <div className="albumList">
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
            {item.isCreateAlbum && currentUser.id === userID ? (
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
                  src={item.medias?.[0]?.url || "default_image_url"}
                  alt={item.album_name || "Album Name"}
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
                      {item.album_name || "Unknown Album"}
                    </span>
                  }
                  subtitle={<span>{item.album_description || ""}</span>}
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
