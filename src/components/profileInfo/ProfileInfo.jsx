import React, { useState } from "react";
import "./profileInfo.scss";
import CloseIcon from "@mui/icons-material/Close";

const users = [{}];

function ProfileInfo({ numberOfPosts }) {
  const [followerModal, setFollowerModal] = useState(false);

  const toggleModalFollower = () => {
    setFollowerModal(!followerModal);
  };

  const [followingModal, setFollowingModal] = useState(false);

  const toggleModalFollowing = () => {
    setFollowingModal(!followingModal);
  };

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
          <button className="editButton">Edit Profile</button>
          <button className="editButton">View Archive</button>
        </div>
        <div className="info">
          <div className="postNum">{numberOfPosts} post</div>
          <div className="btn-modal-follow" onClick={toggleModalFollower}>
            100 followers
          </div>
          {followerModal && (
            <div className="modal">
              <div onClick={toggleModalFollower} className="overlay"></div>
              <div className="modal-content">
                <div className="modalTitle">Followers</div>
                <div className="followerUser">
                  <div className="modalContainer">
                    <img
                      className="avaU"
                      src="https://static2-images.vnncdn.net/files/publish/2022/12/8/meo-1-1416.jpg"
                    />
                    <div>
                      <div className="nameU">Hien Truong</div>
                      <div className="locaU">Ha Noi, Vietnam</div>
                    </div>
                  </div>
                  <button className="followButton">Follow</button>
                </div>
                <div className="close-modal" onClick={toggleModalFollower}>
                  <CloseIcon />
                </div>
              </div>
            </div>
          )}
          <div className="btn-modal-follow" onClick={toggleModalFollowing}>
            100 following
          </div>
          {followingModal && (
            <div className="modal">
              <div onClick={toggleModalFollowing} className="overlay"></div>
              <div className="modal-content">
                <div className="modalTitle">Following</div>
                <div className="followerUser">
                  <div className="modalContainer">
                    <img
                      className="avaU"
                      src="https://static2-images.vnncdn.net/files/publish/2022/12/8/meo-1-1416.jpg"
                    />
                    <div>
                      <div className="nameU">Hien Truong</div>
                      <div className="locaU">Ha Noi, Vietnam</div>
                    </div>
                  </div>
                  <button className="followButton">Follow</button>
                </div>
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
