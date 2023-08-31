import "./leftVacation.scss";

import { useGlobalContextAuth } from "../../context/AuthContext";
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";
import AddUser from "./AddUser";
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
  information,
  selectUser,
  items,
  deleteUser,
}) => {
  const { currentUser } = useGlobalContextAuth();

  return (
    <div className="leftVacation">
      <div className="cover">
        <div className="topp">
          <div className="title">Tạo kỳ nghỉ</div>{" "}
          <Link to="/">
            <ClearIcon
              style={{ height: "40px", width: "40px", color: "black" }}
            />
          </Link>
        </div>
        <div className="founder">
          <img
            src={
              !currentUser?.avatar
                ? "https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg"
                : currentUser?.avatar
            }
            alt=""
          />
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
            placeholder="Tên kỳ nghỉ (20 ký tự...)"
            name="name"
            maxLength={20}
            value={name}
            onChange={handleName}
          />
          <input
            type="text"
            name="something"
            maxLength={300}
            placeholder="Giới thiệu về kỳ nghỉ (300 ký tự...)"
            value={something}
            onChange={handleSomething}
          />
          <input
            type="text"
            name="intro"
            placeholder="Giới thiệu về nhóm (200 ký tự...)"
            value={intro}
            onChange={handleIntro}
          />
          <select value={isPublic} name="option" onChange={handleOption}>
            <option>Công khai</option>
            <option>Riêng tư</option>
          </select>
          {information.option == "Riêng tư" ? (
            <AddUser
              selectUser={selectUser}
              items={items}
              information={information}
              deleteUser={deleteUser}
            />
          ) : (
            ""
          )}
          <button type="submit">Tạo</button>
        </form>
      </div>
    </div>
  );
};

export default LeftVacation;
