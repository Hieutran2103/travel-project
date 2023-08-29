import React from "react";
import {Route, Routes} from "react-router-dom";
import ProfileInfo from "../../components/profileInfo/ProfileInfo";
import ProfileBar from "../../components/profileBar/ProfileBar";
import AlbumList from "../../components/albumList/AlbumList";
import PostList from "../../components/postList/PostList";
import VacationList from "../../components/vacationList/VacationList";
import AlbumDetail from "../../components/albumDetail/AlbumDetail";
import "./profile.scss";

function Profile() {
  return (
    <div className="profile">
      <ProfileInfo />
      <ProfileBar />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/vacations" element={<VacationList />} />
        <Route path="/albums" element={<AlbumList />} />
        <Route path="/albums/:albumname" element={<AlbumDetail />} />
      </Routes>
    </div>
  );
}

export default Profile;
