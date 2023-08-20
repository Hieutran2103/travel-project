import React from "react";
import { Link, useParams } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import AddIcon from "@mui/icons-material/Add";
import customFetch from "../../utils/url";
import "./albumList.scss";
import { useQuery } from "@tanstack/react-query";

function AlbumList() {
  const { id } = useParams();

  const createAlbumItem = {
    title: "Create Album",
    num: 0,
    isCreateAlbum: true,
  };

  let userID = "";
  const userJSON = localStorage.getItem("user");
  if (userJSON) {
    userID = JSON.parse(userJSON);
  }

  const apiUrlAlbum = `albums/user/${userID.id}?limit=100&page=1`;

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
    return (
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  if (isAlbumError) {
    return <div>Error: {error.message}</div>;
  }

  const albums = albumData.data.result;

  const modifiedItemData = [createAlbumItem, ...(albums || [])];

  console.log(albums);

  return (
    <div className="albumList">
      <ImageList cols={4} style={{ paddingTop: 0, paddingBottom: 0 }}>
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
                <div style={{ position: "relative" }}>
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
                to={`/profile/${id}/albums/${item._id}`}
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
