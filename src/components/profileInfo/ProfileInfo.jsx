import React, {useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import {Link} from "react-router-dom";
import {useGlobalPage} from "../../context/Page";
import {useQuery} from "@tanstack/react-query";
import customFetch from "../../utils/url";
import {useGlobalContextAuth} from "../../context/AuthContext";
import {useTranslation} from "react-i18next";
import {usePostsData} from "../../context/PostsDataContext";
import "./profileInfo.scss";
import {useEffect} from "react";

function ProfileInfo() {
  const [followerModal, setFollowerModal] = useState(false);
  const [followingModal, setFollowingModal] = useState(false);
  const {page, limit} = useGlobalPage();
  const [t, i18] = useTranslation("global");
  const {currentUser} = useGlobalContextAuth();
  const {postsData} = usePostsData();
  const url = window.location.pathname.split("/");
  const userID = url[url.length - 2];

  useEffect(() => {
    if (postsData) {
      console.log(postsData);
    }
  }, [postsData]);

  const isCurrentUser = userID === currentUser._id;
  const apiUrlUser = `users/get-profile`;
  const apiUrlFriend = `users/${userID}`;
  const apiUrl = isCurrentUser ? apiUrlUser : apiUrlFriend;
  const apiUrlFollower = `users/follower/${userID}?limit=${limit}&page=${page}`;
  const apiUrlFollowing = `users/following/${userID}?limit=${limit}&page=${page}`;
  const apiUrlPost = `posts/status/${userID}?limit=${limit}&page=${page}`;

  const fetchFollowerInfo = async () => {
    try {
      const response = await customFetch.get(apiUrlFollower);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching follower data");
    }
  };

  const fetchFollowingInfo = async () => {
    try {
      const response = await customFetch.get(apiUrlFollowing);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching following data");
    }
  };

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
    data: followerData,
    isLoading: isFollowerLoading,
    isError: isFollowerError,
  } = useQuery(["followerData", apiUrlFollower], fetchFollowerInfo);

  const {
    data: followingData,
    isLoading: isFollowingLoading,
    isError: isFollowingError,
  } = useQuery(["followingData", apiUrlFollowing], fetchFollowingInfo);

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

  if (
    isFollowerLoading ||
    isFollowingLoading ||
    isUserLoading ||
    isPostLoading
  ) {
    return;
  }

  if (isFollowerError || isFollowingError || isUserError || isPostError) {
    return;
  }

  const followerInfo = followerData
    ? followerData.data.map((follower) => follower.follower_info)
    : [];

  const followingInfo = followingData
    ? followingData.data.map((following) => following.followed_info)
    : [];

  const toggleModalFollower = () => {
    setFollowerModal(!followerModal);
  };

  const toggleModalFollowing = () => {
    setFollowingModal(!followingModal);
  };

  const openFollowerModal = () => {
    if (followerData.data.length > 0) {
      toggleModalFollower();
    }
  };

  const openFollowingModal = () => {
    if (followingData.data.length > 0) {
      toggleModalFollowing();
    }
  };

  return (
    <div className="profileInfo">
      <div className="leftProfile">
        <img
          src={
            apiUrl === apiUrlUser
              ? userData.user.avatar
              : userData.data.avatar ||
                "https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg"
          }
          alt="avatar"
          className="avatar"
        />
      </div>
      <div className="rightProfile">
        <div className="info">
          <div className="userName">
            {apiUrl === apiUrlUser ? userData.user.name : userData.data.name}
          </div>
          {currentUser._id === userID ? (
            <>
              <button className="editButton">
                <Link
                  to="/setting/account"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  {t("profile.edit")}
                </Link>
              </button>
              <button className="editButton">{t("profile.view")}</button>
            </>
          ) : (
            <>
              <button className="editButton">{t("profile.follow")}</button>
              <button className="editButton">{t("profile.dm")}</button>
            </>
          )}
        </div>
        <div className="info">
          <div className="postNum">
            {postData.total} {t("profile.post")}
          </div>
          <div className="btn-modal-follow" onClick={openFollowerModal}>
            {followerData.data.length} {t("profile.follower")}
          </div>
          {followerModal && (
            <div className="modal">
              <div onClick={toggleModalFollower} className="overlay"></div>
              <div className="modal-content">
                <div className="modalTitle">
                  {" "}
                  {t("profile.follower")}{" "}
                  <div className="close-modal" onClick={toggleModalFollower}>
                    <CloseIcon />
                  </div>
                </div>
                {followerInfo.map((followersArray, index) => (
                  <div className="modalContent" key={index}>
                    {followersArray.map((follower) => (
                      <div className="followerUser" key={follower._id}>
                        <div className="modalContainer">
                          <img
                            className="avaU"
                            src={
                              follower.avatar ||
                              "https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg"
                            }
                            alt="Follower Avatar"
                          />
                          <div>
                            <div className="nameU">{follower.name}</div>
                            <div className="emailU">{follower.email}</div>
                          </div>
                        </div>
                        <button className="followButton">
                          {" "}
                          {t("profile.follow")}
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="btn-modal-follow" onClick={openFollowingModal}>
            {followingData.data.length} {t("profile.following")}
          </div>
          {followingModal && (
            <div className="modal">
              <div onClick={toggleModalFollowing} className="overlay"></div>
              <div className="modal-content">
                <div className="modalTitle">
                  {" "}
                  {t("profile.following")}
                  <div className="close-modal" onClick={toggleModalFollowing}>
                    <CloseIcon />
                  </div>
                </div>
                {followingInfo.map((followingsArray, index) => (
                  <div className="modalContent" key={index}>
                    {followingsArray?.map((following) => (
                      <div className="followerUser" key={following._id}>
                        <div className="modalContainer">
                          <img
                            className="avaU"
                            src={
                              following.avatar ||
                              "https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg"
                            }
                            alt="Following Avatar"
                          />
                          <div>
                            <div className="nameU">{following.name}</div>
                            <div className="emailU">{following.email}</div>
                          </div>
                        </div>
                        <button className="followButton">
                          {" "}
                          {t("profile.follow")}
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
