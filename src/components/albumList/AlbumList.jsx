import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import AddIcon from "@mui/icons-material/Add";
import "./AlbumList.scss";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    num: 10,
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    num: 10,
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    num: 10,
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    num: 10,
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    num: 10,
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    num: 10,
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    num: 10,
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    num: 10,
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    num: 10,
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    num: 10,
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
    num: 10,
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
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
              <div>
                <div className="createAlbumContent">
                  <AddIcon
                    style={{
                      fontSize: 50,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: "20x",
                    marginTop: "10px",
                  }}
                >
                  {item.title}
                </span>
              </div>
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
