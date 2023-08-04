import "./leftVacation.scss";

import { useGlobalContextAuth } from "../../context/AuthContext";
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";
const LeftVacation = ({
  handleImageClick,
  handleImageChange,
  isPublic,
  inputRef,
  name,
  something,
  intro,
  handleName,
  handleSomething,
  handleIntro,
  handleSubmit,
  handleOption,
}) => {
  const { currentUser } = useGlobalContextAuth();
  return (
    <div className="leftVacation">
      <div className="out">
        <Link to="/">
          <ClearIcon
            style={{ height: "40px", width: "40px", color: "black" }}
          />
        </Link>
      </div>
      <div className="cover">
        <div className="title">Tạo kỳ nghỉ</div>
        <div className="founder">
          <img src={currentUser.profilePic} alt="" />
          <div className="moree">
            <div className="name">{currentUser.name}</div>
            <div className="position">Quản trị viên</div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="uploadImage" onClick={handleImageClick}>
            Chọn ảnh
            <input
              type="file"
              ref={inputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
              name="image"
            />
          </div>
          <input
            type="text"
            placeholder="Tên kỳ nghỉ"
            name="name"
            value={name}
            onChange={handleName}
          />
          <input
            type="text"
            name="something"
            placeholder="Giới thiệu về kỳ nghỉ"
            value={something}
            onChange={handleSomething}
          />
          <input
            type="text"
            name="intro"
            placeholder="Giới thiệu về nhóm"
            value={intro}
            onChange={handleIntro}
          />
          <select value={isPublic} name="option" onChange={handleOption}>
            <option>Công khai</option>
            <option>Riêng tư</option>
          </select>

          <button type="submit">Tạo</button>
        </form>
      </div>
    </div>
  );
};

export default LeftVacation;
