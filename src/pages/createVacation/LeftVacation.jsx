import "./leftVacation.scss";
import logoNewfeedz from "../../assets/logo.svg";
import { useGlobalContextAuth } from "../../context/AuthContext";

import { useRef, useState } from "react";
const LeftVacation = ({
  handleImageClick,
  handleImageChange,
  isPublic,
  inputRef,
  setIsPublic,
  name,
  something,
  intro,
  handleName,
  handleSomething,
  handleIntro,
}) => {
  const { currentUser } = useGlobalContextAuth();
  return (
    <div className="leftVacation">
      <div className="cover">
        <div className="title">Tạo kỳ nghỉ</div>
        <div className="founder">
          <img src={currentUser.profilePic} alt="" />
          <div className="moree">
            <div className="name">{currentUser.name}</div>
            <div className="position">Quản trị viên</div>
          </div>
        </div>
        <form>
          <input
            type="text"
            placeholder="Tên kỳ nghỉ"
            value={name}
            onChange={handleName}
          />
          <input
            type="text"
            placeholder="Giới thiệu về kỳ nghỉ"
            value={something}
            onChange={handleSomething}
          />
          <input
            type="text"
            placeholder="Giới thiệu về nhóm"
            value={intro}
            onChange={handleIntro}
          />
          <select
            value={isPublic}
            onChange={(e) => setIsPublic(e.target.value)}
          >
            <option>Công khai</option>
            <option>Riêng tư</option>
          </select>

          <div className="uploadImage" onClick={handleImageClick}>
            Chọn ảnh
            <input
              type="file"
              ref={inputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>

          <button>Tạo</button>
        </form>
      </div>
    </div>
  );
};

export default LeftVacation;
