import React from "react";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import VillaOutlinedIcon from "@mui/icons-material/VillaOutlined";
import PhotoAlbumOutlinedIcon from "@mui/icons-material/PhotoAlbumOutlined";
import {Link} from "react-router-dom";
import {useGlobalContextAuth} from "../../context/AuthContext";
import {useTranslation} from "react-i18next";
import "./profileBar.scss";

function ProfileBar() {
  // const {currentUser} = useGlobalContextAuth();
  const [t, i18] = useTranslation("global");

  const url = window.location.pathname.split("/");
  const userID = url[url.length - 2];

  return (
    <div className="profileBar">
      <div className="profileButton">
        <Link to={`/profile/${userID}/posts`} className="link">
          <div className="icon">
            <CollectionsOutlinedIcon />
            <span>{t("profile.post")}</span>
          </div>
        </Link>
        <Link to={`/profile/${userID}/albums`} className="link">
          <div className="icon">
            <PhotoAlbumOutlinedIcon />
            <span>{t("profile.album")}</span>
          </div>
        </Link>
        <Link to={`/profile/${userID}/vacations`} className="link">
          <div className="icon">
            <VillaOutlinedIcon />
            <span>{t("profile.vacation")}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ProfileBar;
