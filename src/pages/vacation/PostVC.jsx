import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import { useState } from "react";

import { useTranslation } from "react-i18next";

import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { useGlobalSearch } from "../../context/Search&Notification";
import moment from "moment";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils/url";

import { useGlobalPage } from "../../context/Page";
import { toast } from "react-toastify";
import { useGlobalContextAuth } from "../../context/AuthContext";
import Comments from "../../components/comments/Comments";
import SpecificEdit from "../../components/specificEdit/SpecificEdit";

const PostVC = ({ post }) => {
  const { medias, content, userId, user, created_at, _id } = post;
  const { currentUser } = useGlobalContextAuth();

  // const currentPost = index;
  const { setImagePost } = useGlobalPage();
  const { openEditSpecific } = useGlobalSearch();
  const [t, i18] = useTranslation("global");
  //State Comments
  const [commentOpen, setCommentOpen] = useState(false);

  const getLikeFromLS = () => localStorage.getItem("like") || false;

  const [liked, setLiked] = useState(Boolean(getLikeFromLS));
  console.log(liked);

  const { mutate: postLike } = useMutation({
    mutationFn: (posts) => customFetch.post(`/likes`, posts),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["likes"] });
      localStorage.setItem("like", true);
      setLiked(true);
    },
    onError: (error) => {
      toast.error("error");
    },
  });
  const { mutate: deletePostLike } = useMutation({
    mutationFn: (posts) => customFetch.delete(`/likes/post/${posts}`),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["likes"] });
      localStorage.removeItem("like");
      setLiked(false);
    },
    onError: (error) => {
      toast.error("error");
    },
  });

  const [currentPerson, setCurrentPerson] = useState(0);
  const [infoUser, setInfoUser] = useState();
  const [editFounder, setEditFounder] = useState(true);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(["likes", _id], () =>
    customFetch.get(`/likes/count/${_id}`).then((res) => {
      return res.data;
    })
  );

  const { mutate: deletePost } = useMutation({
    mutationFn: (posts) => customFetch.delete(`/posts/${posts}`),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["postsVacation"] });
      toast.success(t("toast.DeletePostNF"));
      console.log(data);
    },
    onError: (error) => {
      toast.error("error");
    },
  });

  const checkNumber = (number) => {
    if (number > medias.length - 1) {
      return (number = 0);
    }
    if (number < 0) {
      return (number = medias.length - 1);
    }
    return number;
  };

  const prevSlide = () => {
    setCurrentPerson((oldPerson) => {
      const rerult = oldPerson - 1;
      return checkNumber(rerult);
    });
  };

  const nextSlide = () => {
    setCurrentPerson((oldPerson) => {
      const rerult = oldPerson + 1;
      return checkNumber(rerult);
    });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (currentUser._id === user._id) {
      return setEditFounder(true);
    }
    return setEditFounder(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = () => {
    deletePost(_id);
    setAnchorEl(null);
  };

  const handleCloseOpenEdit = async () => {
    setImagePost(await customFetch.get(`/posts/${_id}`));
    setAnchorEl(null);
    openEditSpecific();
    setInfoUser(user);
  };

  const handleLike = () => {
    postLike({
      status_id: _id,
    });
  };

  const handleDisLike = () => {
    deletePostLike(_id);
  };
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img
              src={
                !user.avatar
                  ? "https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg"
                  : user.avatar
              }
              alt=""
            />
            <div className="details">
              <Link
                to={`/profile/${userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name"> {user.name}</span>
              </Link>
              <span className="date">{moment(created_at).fromNow()}</span>
            </div>
          </div>
          <div>
            <Button
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreHorizOutlinedIcon style={{ color: "#E84BE5" }} />
            </Button>
            {editFounder ? (
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem onClick={handleCloseOpenEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDeletePost}>Delete</MenuItem>{" "}
              </Menu>
            ) : (
              ""
            )}
          </div>
          <SpecificEdit setAnchorEl={setAnchorEl} infoUser={infoUser} />
        </div>
        <div className="content">
          <p>{content}</p>
          <div className="slider-container">
            {medias.map((z, indexx) => {
              return (
                <div
                  className="slide"
                  style={{
                    transform: `translateX(${100 * (indexx - currentPerson)}%)`,
                  }}
                  key={indexx}
                >
                  <img className="person-img" src={z.url} alt="" />
                </div>
              );
            })}
            {medias.length > 1 ? (
              <>
                <button type="button" className="prev" onClick={prevSlide}>
                  {" "}
                  <ChevronLeftOutlinedIcon />
                </button>
                <button type="button" className="next" onClick={nextSlide}>
                  {" "}
                  <ChevronRightOutlinedIcon />
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="info">
          <div className="item">
            {/* {!liked && <FavoriteBorderOutlinedIcon onClick={handleLike} />} */}
            {liked && data?.total >= 1 ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleDisLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {""}
            {data?.total} {t("newfeed.like")}
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {t("newfeed.comment")}
          </div>
        </div>
        {commentOpen && <Comments postID={_id} user={user} />}
      </div>
    </div>
  );
};

export default PostVC;
