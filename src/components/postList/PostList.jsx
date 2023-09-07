import React, {useState} from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {useQuery} from "@tanstack/react-query";
import {useGlobalPage} from "../../context/Page";
import customFetch from "../../utils/url";
import {useGlobalContextAuth} from "../../context/AuthContext";
import {useTranslation} from "react-i18next";
import "./postList.scss";

function PostList() {
  const {currentUser} = useGlobalContextAuth();
  const {page, limit, handleNextLimit} = useGlobalPage();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [t, i18] = useTranslation("global");

  const url = window.location.pathname.split("/");
  const userID = url[url.length - 2];

  const isCurrentUser = userID === currentUser._id;
  const apiUrlUser = `users/get-profile`;
  const apiUrlFriend = `users/${userID}`;
  const apiUrl = isCurrentUser ? apiUrlUser : apiUrlFriend;
  const apiUrlPost = `posts/status/${userID}?limit=${limit}&page=${page}`;

  const fetchUserInfo = async () => {
    try {
      const response = await customFetch.get(apiUrl);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching follower data");
    }
  };

  const fetchPostInfo = async () => {
    try {
      const response = await customFetch.get(apiUrlPost);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching post data");
    }
  };

  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery(["userData", apiUrl], fetchUserInfo);

  const {
    data: postData,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useQuery(["postData", apiUrlPost], fetchPostInfo);

  if (isPostLoading || isUserLoading) {
    return;
  }

  if (isPostError || isUserError) {
    return;
  }

  const post = postData.data;

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  if (post.length === 0) {
    return (
      <div className="postList">
        <p className="noAlbumsMessage">No post to show</p>
      </div>
    );
  }

  return (
    <div className="postList">
      <ImageList cols={3} rowHeight={250} className="noGapImageList">
        {post.map((item) => (
          <ImageListItem
            className="imageList"
            key={item._id}
            onClick={() => openModal(item)}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={`${item.medias?.[0]?.url}?w=250&h=250&fit=crop&auto=format`}
              srcSet={`${item.medias?.[0]?.url}?w=250&h=250&fit=crop&auto=format&dpr=2 2x`}
              alt="Error"
              loading="lazy"
              style={{objectFit: "cover", width: "100%", height: "100%"}}
            />

            <div className="info">
              <div className="icon">
                <FavoriteIcon />
              </div>
              <div className="count">{`${item.like}`}</div>
              <div className="icon">
                <ModeCommentIcon />
              </div>
              <div className="count">{`${item.comment}`}</div>
            </div>
          </ImageListItem>
        ))}
      </ImageList>
      <div style={{outline: "none"}}>
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
                  src={selectedImage.medias[0]?.url}
                  alt="Error"
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
                      src={
                        apiUrl === apiUrlUser
                          ? userData.user.avatar
                          : userData.data.avatar ||
                            "https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg"
                      }
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
                      {apiUrl === apiUrlUser
                        ? userData.user.name
                        : userData.data.name}
                    </div>
                  </div>
                  {/* <div
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
                  </div> */}
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
                        fontWeight: 600,
                      }}
                    >
                      {`${selectedImage.like}`} likes
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <input
                        placeholder={t("profile.comment")}
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
