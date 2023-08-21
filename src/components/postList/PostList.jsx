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
