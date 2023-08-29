import React from "react";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import VillaOutlinedIcon from "@mui/icons-material/VillaOutlined";
import PhotoAlbumOutlinedIcon from "@mui/icons-material/PhotoAlbumOutlined";
import {Link} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import customFetch from "../../utils/url";
import {useGlobalContextAuth} from "../../context/AuthContext";
import {useTranslation} from "react-i18next";
import "./profileBar.scss";

function ProfileBar() {
  const {currentUser} = useGlobalContextAuth();
  const [t, i18] = useTranslation("global");
  const userID = currentUser.id;
  const apiUrlUser = `users/get-profile`;

  const fetchUserInfo = async () => {
    try {
      const response = await customFetch.get(apiUrlUser);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching follower data");
    }
  };

  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery(["userData", apiUrlUser], fetchUserInfo);

  if (isUserLoading) {
    return;
  }

  if (isUserError) {
    return (
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  // const userId = userData.user._id;

  return (
    <div className="profileBar">
      <div className="profileButton">
        <Link to={`/profile/${userID}`} className="link">
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
