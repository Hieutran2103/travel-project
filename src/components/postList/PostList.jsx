import React, { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import "./postList.scss";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    likes: 368,
    comments: 34,
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    likes: 6457,
    comments: 235,
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    likes: 4124,
    comments: 312,
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    likes: 484,
    comments: 42,
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    likes: 543,
    comments: 235,
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    likes: 4142,
    comments: 542,
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    likes: 3523,
    comments: 23,
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    likes: 431,
    comments: 32,
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    likes: 1000,
    comments: 700,
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    likes: 30,
    comments: 12,
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
    likes: 23,
    comments: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    likes: 50,
    comments: 12,
  },
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    likes: 10,
    comments: 1,
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    likes: 130,
    comments: 150,
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    likes: 100,
    comments: 120,
  },
];

function PostList({ setNumberOfPosts }) {
  const numberOfPosts = itemData.length;
  setNumberOfPosts(numberOfPosts);

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="postList">
      <ImageList cols={3} rowHeight={250}>
        {itemData.map((item) => (
          <ImageListItem className="imageList" key={item.img}>
            <img
              className="imagePost"
              src={`${item.img}`}
              srcSet={`${item.img}`}
              alt={item.title}
              loading="lazy"
            />
            <div className="info">
              <div className="icon">
                <FavoriteIcon />
              </div>
              <div className="count">{`${item.likes}`}</div>
              <div className="icon">
                <ModeCommentIcon />
              </div>
              <div className="count">{`${item.comments}`}</div>
            </div>
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default PostList;
