import { Link } from "react-router-dom";

import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
// import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
// import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import { useState } from "react";
import Comments from "../comments/Comments";
const Post = ({ post }) => {
  const { img, profilePic, desc, name, userId } = post;

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
          <MoreHorizOutlinedIcon />
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
            12 Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon /> 10 Comments
          </div>
          {/* <div className="item">
            <BookmarkBorderOutlinedIcon />
          </div> */}
        </div>
        {commentOpen && <Comments />}
      </div>
    </div>
  );
};

export default Post;
