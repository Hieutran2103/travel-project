import React, {useEffect, useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import {Link} from "react-router-dom";
import {useGlobalPage} from "../../context/Page";
import {useQuery} from "@tanstack/react-query";
import customFetch from "../../utils/url";
import {useGlobalContextAuth} from "../../context/AuthContext";
import {useTranslation} from "react-i18next";
import "./profileInfo.scss";

function ProfileInfo() {
  const [followerModal, setFollowerModal] = useState(false);
  const [followingModal, setFollowingModal] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const {page, limit} = useGlobalPage();
  const {currentUser} = useGlobalContextAuth();
  const [t, i18] = useTranslation("global");

  const userID = currentUser.id;

  const toggleModalFollower = () => {
    setFollowerModal(!followerModal);
  };

  const toggleModalFollowing = () => {
    setFollowingModal(!followingModal);
  };

  const openFollowerModal = () => {
    if (followerCount > 0) {
      toggleModalFollower();
    }
  };

  const openFollowingModal = () => {
    if (followingCount > 0) {
      toggleModalFollowing();
    }
  };
  //Current user
  const apiUrlUser = `users/get-profile`;
  //Friend profile
  const apiUrlFriend = `users/user64d0c2d495b2d6b429e09bc2`;
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
      const response = await customFetch.get(apiUrlUser);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching follower data");
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
  } = useQuery(["userData", apiUrlUser], fetchUserInfo);

  const fetchPostInfo = async () => {
    try {
      const response = await customFetch.get(apiUrlPost);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching post data");
    }
  };

  const {
    data: postData,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useQuery(["postData", apiUrlPost], fetchPostInfo);

  useEffect(() => {
    if (followerData) {
      const followerCounts = followerData.data.map(
        (follower) => follower.follower_info.length
      );
      const totalFollowerCount = followerCounts.reduce(
        (total, count) => total + count,
        0
      );
      setFollowerCount(totalFollowerCount);
    }

    if (followingData) {
      const followingInfo = followingData.data[0]?.following_info;
      setFollowingCount(followingInfo?.length || 0);
    }
  }, [followerData, followingData]);

  if (
    isFollowerLoading ||
    isFollowingLoading ||
    isUserLoading ||
    isPostLoading
  ) {
    return;
  }

  if (isFollowerError || isFollowingError || isUserError || isPostError) {
    return (
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  const followerInfo = followerData.data.map(
    (follower) => follower.follower_info
  );
  const followingInfo = followingData.data.map(
    (following) => following.following_info
  );

  return (
    <div className="profileInfo">
      <div className="leftProfile">
        <img
          src={
            userData.user.avatar ||
            "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
          }
          alt="avatar"
          className="avatar"
        />
      </div>
      <div className="rightProfile">
        <div className="info">
          <div className="userName">{userData.user.name}</div>
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
        </div>
        <div className="info">
          <div className="postNum">
            {postData.total} {t("profile.post")}
          </div>
          <div className="btn-modal-follow" onClick={openFollowerModal}>
            {followerCount} {t("profile.follower")}
          </div>
          {followerModal && (
            <div className="modal">
              <div onClick={toggleModalFollower} className="overlay"></div>
              <div className="modal-content">
                <div className="modalTitle"> {t("profile.follower")}</div>
                {followerInfo.map((followersArray, index) => (
                  <div className="modalContent" key={index}>
                    {followersArray.map((follower) => (
                      <div className="followerUser" key={follower._id}>
                        <div className="modalContainer">
                          <img
                            className="avaU"
                            src={
                              follower.avatar ||
                              "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
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
                <div className="close-modal" onClick={toggleModalFollower}>
                  <CloseIcon />
                </div>
              </div>
            </div>
          )}
          <div className="btn-modal-follow" onClick={openFollowingModal}>
            {followingCount} {t("profile.following")}
          </div>
          {followingModal && (
            <div className="modal">
              <div onClick={toggleModalFollowing} className="overlay"></div>
              <div className="modal-content">
                <div className="modalTitle"> {t("profile.following")}</div>
                {followingInfo.map((followingsArray, index) => (
                  <div className="modalContent" key={index}>
                    {followingsArray.map((following) => (
                      <div className="followingUser" key={following._id}>
                        <div className="modalContainer">
                          <img
                            className="avaU"
                            src={
                              following.avatar ||
                              "https://static2-images.vnncdn.net/files/publish/2022/12/8/meo-1-1416.jpg"
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
                <div className="close-modal" onClick={toggleModalFollowing}>
                  <CloseIcon />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
