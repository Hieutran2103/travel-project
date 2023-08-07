import React, { useState } from "react";
import "./profileBar.scss";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import VillaOutlinedIcon from "@mui/icons-material/VillaOutlined";
import PhotoAlbumOutlinedIcon from "@mui/icons-material/PhotoAlbumOutlined";

function ProfileBar({ setSelectedComponent }) {
  const [selectedButton, setSelectedButton] = useState("Post");

  const handleClick = (icon) => {
    setSelectedButton(icon);
    if (icon === "Post") {
      setSelectedComponent("PostList");
    } else if (icon === "Vacation") {
      setSelectedComponent("VacationList");
    }
  };

  return (
    <div className="profileBar">
      <div className="profileButton">
        <div
          className={`icon ${selectedButton === "Post" ? "active" : ""}`}
          onClick={() => handleClick("Post")}
        >
          <CollectionsOutlinedIcon />
          <span>Post</span>
        </div>
        <div
          className={`icon ${selectedButton === "Album" ? "active" : ""}`}
          onClick={() => handleClick("Album")}
        >
          <PhotoAlbumOutlinedIcon />
          <span>Album</span>
        </div>
        <div
          className={`icon ${selectedButton === "Vacation" ? "active" : ""}`}
          onClick={() => handleClick("Vacation")}
        >
          <VillaOutlinedIcon />
          <span>Vacation</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileBar;
