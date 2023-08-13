import React, { useState } from "react";
import ProfileInfo from "../../components/profileInfo/ProfileInfo";
import ProfileBar from "../../components/profileBar/profileBar";
import AlbumList from "../../components/albumList/AlbumList";
import PostList from "../../components/postList/PostList";
import VacationList from "../../components/vacationList/VacationList";
import "./profile.scss";

function Profile() {
  const [selectedComponent, setSelectedComponent] = useState("PostList");
  const [numberOfPosts, setNumberOfPosts] = useState(0);

  return (
    <div className="profile">
      <ProfileInfo numberOfPosts={numberOfPosts} />
      <ProfileBar setSelectedComponent={setSelectedComponent} />
      {selectedComponent === "PostList" ? (
        <PostList setNumberOfPosts={setNumberOfPosts} />
      ) : null}
      {selectedComponent === "VacationList" ? <VacationList /> : null}
      {selectedComponent === "AlbumList" ? <AlbumList /> : null}
    </div>
  );
}

export default Profile;
