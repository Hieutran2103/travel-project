import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ProfileInfo from "../../components/profileInfo/ProfileInfo";
import ProfileBar from "../../components/profileBar/profileBar";
import AlbumList from "../../components/albumList/AlbumList";
import PostList from "../../components/postList/PostList";
import VacationList from "../../components/vacationList/VacationList";
import "./profile.scss";
import AlbumDetail from "../../components/albumDetail/AlbumDetail";

function Profile() {
  const itemData = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
      num: 3,
      photos: [
        {
          id: 1,
          img: "https://file.hstatic.net/1000328498/article/4_0deecb5b5d614605a72dc55475567989.jpg",
          title: "Tiêu đề ảnh 1",
        },
        {
          id: 2,
          img: "https://d2eehagpk5cl65.cloudfront.net/img/wp-content/uploads/2022/08/minispeakyblinders.jpg",
          title: "Tiêu đề ảnh 2",
        },
        {
          id: 3,
          img: "https://we25.vn/media2018/Img_News/2022/05/10/z3399223868975_f9672eaf281fbf6771659ccb18692a12_20220510084630.jpeg",
          title: "Tiêu đề ảnh 3",
        },
      ],
    },
  ];
  const [numberOfPosts, setNumberOfPosts] = useState(0);
  return (
    <div className="profile">
      <ProfileInfo numberOfPosts={numberOfPosts} />
      <ProfileBar />
      <Routes>
        <Route
          path="/"
          element={<PostList setNumberOfPosts={setNumberOfPosts} />}
        />
        <Route path="/vacations" element={<VacationList />} />
        <Route path="/albums" element={<AlbumList />} />
        <Route
          path="/albums/:id"
          element={<AlbumDetail itemData={itemData} />}
        />
      </Routes>
    </div>
  );
}

export default Profile;
