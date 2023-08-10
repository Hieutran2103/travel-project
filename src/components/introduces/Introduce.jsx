import { useTranslation } from "react-i18next";
import { useGlobalSearch } from "../../context/Search&Notification";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import "./introduces.scss";

const Introduces = ({ posts }) => {
  const [t, i18] = useTranslation("global");

  const { isIntroduceOpen, closeIntroduce, openUserVacation } =
    useGlobalSearch();

  return (
    <div className={isIntroduceOpen ? "show-introduces" : "introduces"}>
      <div className="container">
        <button onClick={closeIntroduce}>
          <ClearIcon style={{ height: "40px", width: "40px" }} />
        </button>
        <div className="founder">
          <span>Founder</span>
          <hr />
          <div className="other">
            <img
              src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
              alt=""
            />
            <div className="info">
              <div className="name">Hiếu Trần</div>
              <div className="text">500 {t("rightBar.follower")}</div>
            </div>
          </div>
        </div>

        <div className="gr">
          <span className="topic">Giới thiệu về nhóm</span>
          <hr />
          <div className="item">
            <div className="icon">
              <PublicOutlinedIcon />
            </div>
            <div className="detail">
              <span className="title"> Công khai</span>
              <span className="nd">
                Bất kì ai cũng có thể thấy mọi người trong nhóm và những bài
                đăng
              </span>
            </div>
          </div>
          <div className="item">
            <div className="icon">
              <VisibilityOutlinedIcon />
            </div>
            <div className="detail">
              <span className="title"> Hiển thị</span>
              <span className="nd">Ai cũng có thể thấy nhóm này</span>
            </div>
          </div>
          <div className="item">
            <div className="icon">
              <AccessTimeOutlinedIcon />
            </div>
            <div className="detail">
              <span className="title"> Lịch sử</span>
              <span className="nd">Đã tạo nhóm vào 13 tháng 8, 2022</span>
            </div>
          </div>
        </div>

        <div className="memberVacationn">
          <span>Thành viên </span>
          <hr />
          <div className="avaUsers">
            <div className="seeAva">
              {posts.map((post, index) => {
                const { profilePic } = post;
                return <img key={index} src={profilePic} alt="1" />;
              })}
            </div>

            <div className="morePeople">
              <MoreHorizOutlinedIcon style={{ fontSize: "15px" }} />
            </div>
          </div>
          <div className="seeAll" onClick={openUserVacation}>
            Xem tất cả
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduces;
