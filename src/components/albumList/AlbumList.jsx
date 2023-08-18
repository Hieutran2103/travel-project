import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import AddIcon from "@mui/icons-material/Add";
import "./AlbumList.scss";
import { Link } from "react-router-dom";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    num: 10,
  },
];

function AlbumList() {
  const createAlbumItem = {
    title: "Create Album",
    num: 0,
    isCreateAlbum: true,
  };

  const modifiedItemData = [createAlbumItem, ...itemData];

  return (
    <div className="albumList">
      <ImageList cols={4} style={{ paddingTop: 0, paddingBottom: 0 }}>
        {modifiedItemData.map((item) => (
          <ImageListItem
            className={`imageList ${
              item.isCreateAlbum ? "createAlbumItem" : ""
            }`}
            key={item.img}
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
              <>
                <img
                  className="imagePost"
                  src={`${item.img}`}
                  alt={item.title}
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
                      {item.title}
                    </span>
                  }
                  subtitle={<span>{item.num} Items</span>}
                  position="below"
                />
              </>
            )}
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default AlbumList;
