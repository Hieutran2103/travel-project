import React from "react";
import "./profileBar.scss";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import VillaOutlinedIcon from "@mui/icons-material/VillaOutlined";
import PhotoAlbumOutlinedIcon from "@mui/icons-material/PhotoAlbumOutlined";
import { Link, useParams } from "react-router-dom";

function ProfileBar() {
  const { id } = useParams();
  const profileId = id.split("/")[0];

  return (
    <div className="profileBar">
      <div className="profileButton">
        <Link to={`/profile/${profileId}`} className="link">
          <div className="icon">
            <CollectionsOutlinedIcon />
            <span>Post</span>
          </div>
        </Link>
        <Link to={`/profile/${profileId}/albums`} className="link">
          <div className="icon">
            <PhotoAlbumOutlinedIcon />
            <span>Album</span>
          </div>
        </Link>
        <Link to={`/profile/${profileId}/vacations`} className="link">
          <div className="icon">
            <VillaOutlinedIcon />
            <span>Vacation</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ProfileBar;
