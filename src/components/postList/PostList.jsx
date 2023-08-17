import React, { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
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
];

function PostList({ setNumberOfPosts }) {
  const numberOfPosts = itemData.length;
  setNumberOfPosts(numberOfPosts);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  return (
    <div className="postList">
      <ImageList cols={3} rowHeight={250}>
        {itemData.map((item) => (
          <ImageListItem
            className="imageList"
            key={item.img}
            onClick={() => openModal(item)}
          >
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
      <div style={{ outline: "none" }}>
        <Modal
          open={modalOpen}
          onClose={closeModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          disableAutoFocus={true}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "1300px",
            }}
          >
            {selectedImage && (
              <div
                style={{
                  display: "flex",
                }}
              >
                <img
                  src={selectedImage.img}
                  alt={selectedImage.title}
                  loading="lazy"
                  style={{
                    width: "910px",
                    height: "700px",
                    flex: "1",
                    objectFit: "contain",
                    margin: "auto",
                    backgroundColor: "black",
                  }}
                />
                <div
                  style={{
                    backgroundColor: "white",
                    flex: "1",
                    overflow: "auto",
                    display: "flex",
                    flexDirection: "column",
                    maxHeight: "700px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      borderBottom: "1px solid rgb(239,239,239)",
                      marginBottom: "10px",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "white",
                    }}
                  >
                    <img
                      src="https://i.ebayimg.com/images/g/ksYAAOSwD7ljaYRn/s-l1600.jpg"
                      alt="avatar"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        marginBottom: "10px",
                        marginLeft: "10px",
                        marginTop: "10px",
                      }}
                    />
                    <div
                      style={{
                        marginLeft: "10px",
                        fontWeight: 600,
                      }}
                    >
                      hientruongvkl
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <img
                      src="https://i.ebayimg.com/images/g/ksYAAOSwD7ljaYRn/s-l1600.jpg"
                      alt="avatar"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        marginBottom: "10px",
                        marginLeft: "10px",
                        marginTop: "10px",
                      }}
                    />
                    <div
                      style={{
                        marginLeft: "10px",
                        fontWeight: 600,
                      }}
                    >
                      chinhdo
                    </div>
                    <div
                      style={{
                        marginLeft: "10px",
                      }}
                    >
                      anh dep zai qua
                    </div>
                  </div>
                  <div
                    style={{
                      position: "sticky",
                      bottom: 0,
                      backgroundColor: "white",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        borderTop: "1px solid rgb(239,239,239)",
                        paddingTop: "10px",
                      }}
                    >
                      <div
                        className="icon"
                        style={{
                          marginLeft: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        <FavoriteBorderOutlinedIcon />
                      </div>
                      <div
                        className="icon"
                        style={{
                          marginLeft: "20px",
                          marginBottom: "10px",
                        }}
                      >
                        <ModeCommentOutlinedIcon />
                      </div>
                    </div>
                    <div
                      className="count"
                      style={{
                        marginLeft: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      {`${selectedImage.likes}`} likes
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <input
                        placeholder="Add a comment..."
                        style={{
                          border: "none",
                          marginLeft: "10px",
                          width: "90%",
                          display: "flex",
                          alignItems: "center",
                          height: "20px",
                        }}
                      />
                      <SendOutlinedIcon
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginRight: "10px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default PostList;
