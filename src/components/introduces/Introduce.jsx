import { useTranslation } from "react-i18next";
import { useGlobalSearch } from "../../context/Search&Notification";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import "./introduces.scss";
import moment from "moment";

const Introduces = ({ dataVacation }) => {
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
              src={
                !dataVacation.user.avatar
                  ? "https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg"
                  : dataVacation.user.avatar
              }
              alt=""
            />
            <div className="info">
              <div className="name">{dataVacation.user.name}</div>
              <div className="text">{dataVacation.user.email}</div>
            </div>
          </div>
        </div>

        <div className="gr">
          <span className="topic">Giới thiệu về nhóm</span>
          <hr />

          {dataVacation.audience == 0 ? (
            <>
              {" "}
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
                  <span className="nd">
                    Đã tạo nhóm vào{" "}
                    {moment(dataVacation.created_at).format("MMM Do YY")}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              {" "}
              <div className="item">
                <div className="icon">
                  <PublicOutlinedIcon />
                </div>
                <div className="detail">
                  <span className="title"> Riêng tư</span>
                  <span className="nd">
                    Chỉ thành viên mới nhìn thấy mọi người trong nhóm và những
                    bài đăng
                  </span>
                </div>
              </div>
              <div className="item">
                <div className="icon">
                  <VisibilityOutlinedIcon />
                </div>
                <div className="detail">
                  <span className="title"> Hiển thị</span>
                  <span className="nd">
                    Chỉ thành viên mới có thể tìm thấy nhóm này
                  </span>
                </div>
              </div>
              <div className="item">
                <div className="icon">
                  <AccessTimeOutlinedIcon />
                </div>
                <div className="detail">
                  <span className="title"> Lịch sử</span>
                  <span className="nd">
                    Đã tạo nhóm vào{" "}
                    {moment(dataVacation.created_at).format("YY Do MMM")}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="memberVacationn">
          <span>Thành viên </span>
          <hr />
          <div className="avaUsers">
            <div className="seeAva">
              {dataVacation.mentions.map((post, index) => {
                const { avatar } = post;
                return (
                  <img
                    src={
                      !avatar
                        ? "https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg"
                        : avatar
                    }
                    alt={index}
                    key={index}
                  />
                );
              })}
            </div>
            {dataVacation.mentions.length >= 11 ? (
              <div className="morePeople">
                <MoreHorizOutlinedIcon style={{ fontSize: "15px" }} />
              </div>
            ) : (
              ""
            )}
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
