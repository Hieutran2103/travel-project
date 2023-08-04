import { Link } from "react-router-dom";

import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";

import { useState } from "react";
import Comments from "../comments/Comments";
import { useTranslation } from "react-i18next";
import EditPost from "../editPost/EditPost";
import { useGlobalContextAuth } from "../../context/AuthContext";

import { useGlobalSearch } from "../../context/Search&Notification";

const Post = ({ post, index, setCurrentpost, currentpost }) => {
  const { img, profilePic, desc, name, userId } = post;
  const currentPost = index;

  const { editPost, openEdit } = useGlobalSearch();

  const [t, i18] = useTranslation("global");
  //State Comments
  const [commentOpen, setCommentOpen] = useState(false);

  //VIdu
  const [liked, setLiked] = useState(false);

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{name}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <div className="edit" onClick={openEdit}>
            <MoreHorizOutlinedIcon onClick={() => setCurrentpost(index)} />
          </div>
          {editPost ? <EditPost currentpost={currentpost} post={post} /> : null}
        </div>
        <div className="content">
          <p>{desc}</p>
          <img src={img} alt="" />
        </div>
        <div className="info">
          <div className="item" onClick={() => setLiked(!liked)}>
            {!liked ? (
              <FavoriteBorderOutlinedIcon />
            ) : (
              <FavoriteOutlinedIcon style={{ color: "red" }} />
            )}{" "}
            12 {t("newfeed.like")}
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon /> 10 {t("newfeed.comment")}
          </div>
        </div>
        {commentOpen && <Comments />}
      </div>
    </div>
  );
};

export default Post;
