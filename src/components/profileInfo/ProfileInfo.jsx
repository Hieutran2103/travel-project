import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import customFetch from "../../utils/url";
import "./profileInfo.scss";

function ProfileInfo({ numberOfPosts }) {
  const [followerModal, setFollowerModal] = useState(false);
  const [followingModal, setFollowingModal] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

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

  let userID = "";
  const userJSON = localStorage.getItem("user");
  if (userJSON) {
    userID = JSON.parse(userJSON);
  }

  const apiUrlFollower = `users/follower/${userID.id}?limit=5&page=1`;

  const apiUrlFollowing = `users/following/${userID.id}?limit=5&page=1`;

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

  useEffect(() => {
    if (followerData) {
      const followerInfo = followerData.data[0]?.follower_info;
      setFollowerCount(followerInfo?.length || 0);
    }

    if (followingData) {
      const followingInfo = followingData.data[0]?.following_info;
      setFollowingCount(followingInfo?.length || 0);
    }
  }, [followerData, followingData]);

  if (isFollowerLoading || isFollowingLoading) {
    return (
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  if (isFollowerError || isFollowingError) {
    return <div>Error</div>;
  }

  const followerInfo = followerData.data[0]?.follower_info;
  const followingInfo = followingData.data[0]?.following_info;

  return (
    <div className="profileInfo">
      <div className="leftProfile">
        <img
          src="https://i.ebayimg.com/images/g/ksYAAOSwD7ljaYRn/s-l1600.jpg"
          alt="avatar"
          className="avatar"
        />
      </div>
      <div className="rightProfile">
        <div className="info">
          <div className="userName">hientruongvkl</div>
          <button className="editButton">
            <Link to="/setting/account">Edit Profile</Link>
          </button>
          <button className="editButton">View Archive</button>
        </div>
        <div className="info">
          <div className="postNum">{numberOfPosts} post</div>
          <div className="btn-modal-follow" onClick={openFollowerModal}>
            {followerCount} followers
          </div>
          {followerModal && (
            <div className="modal">
              <div onClick={toggleModalFollower} className="overlay"></div>
              <div className="modal-content">
                <div className="modalTitle">Followers</div>
                {followerInfo &&
                  followerInfo.map((follower) => (
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
                      <button className="followButton">Follow</button>
                    </div>
                  ))}
                <div className="close-modal" onClick={toggleModalFollower}>
                  <CloseIcon />
                </div>
              </div>
            </div>
          )}
          <div className="btn-modal-follow" onClick={openFollowingModal}>
            {followingCount} following
          </div>
          {followingModal && (
            <div className="modal">
              <div onClick={toggleModalFollowing} className="overlay"></div>
              <div className="modal-content">
                <div className="modalTitle">Followings</div>
                {followingInfo &&
                  followingInfo.map((following) => (
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
                      <button className="followButton">Follow</button>
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
