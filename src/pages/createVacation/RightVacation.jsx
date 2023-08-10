import "./rightVacation.scss";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { useTranslation } from "react-i18next";
import { useGlobalContextAuth } from "../../context/AuthContext";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
const RightVacation = ({ image, isPublic, name, something, intro }) => {
  const { currentUser } = useGlobalContextAuth();
  const [t, i18] = useTranslation("global");
  return (
    <div className="rightVacationa">
      <div className="containera">
        <div className="top">
          {image ? (
            <img src={URL.createObjectURL(image)} alt="" />
          ) : (
            <img src="https://wallpaperaccess.com/full/38130.jpg" alt="" />
          )}

          <div className="in">
            {image ? (
              <img src={URL.createObjectURL(image)} alt="" />
            ) : (
              <img src="https://wallpaperaccess.com/full/38130.jpg" alt="" />
            )}
            <div className="topica">
              <div className="namea">{name}</div>
              <div className="somethinga">{something}</div>
            </div>
          </div>
        </div>

        <div className="bottoma">
          <div className="lefta">
            <div className="containerz">
              <div className="topz">
                <img src={currentUser.profilePic} alt="" />
                <input
                  type="text"
                  placeholder={`${t("newfeed.inputPost")} ${currentUser.name}?`}
                />
              </div>
              <hr />
              <div className="bottomz">
                <div className="leftz">
                  <div className="itemz">
                    <span className="logoz">
                      <AddPhotoAlternateOutlinedIcon />
                    </span>
                    <span>{t("newfeed.addPost")}</span>
                  </div>
                </div>
                <div className="rightz">Share</div>
              </div>
            </div>
          </div>

          <div className="righta">
            <div className="membera">
              <div className="topDetaila">
                <span className="titlea">Giới thiệu</span>
                <span className="detaila">{intro}</span>
              </div>

              <div className="bottonDetaila">
                {isPublic == "Công khai" ? (
                  <>
                    <div className="itema">
                      <div className="icona">
                        <PublicOutlinedIcon />
                      </div>
                      <div className="detaila">
                        <span className="titlea"> Công khai</span>
                        <span className="nda">
                          Bất kì ai cũng có thể thấy mọi người trong nhóm và
                          những bài đăng
                        </span>
                      </div>
                    </div>
                    <div className="itema">
                      <div className="icona">
                        <VisibilityOutlinedIcon />
                      </div>
                      <div className="detaila">
                        <span className="titlea"> Hiển thị</span>
                        <span className="nda">
                          Ai cũng có thể tìm thấy nhóm này
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="itema">
                      <div className="icona">
                        <LockOutlinedIcon />
                      </div>
                      <div className="detaila">
                        <span className="titlea">Riêng tư</span>
                        <span className="nda">
                          Chỉ thành viên mới nhìn thấy mọi người trong nhóm và
                          những bài đăng
                        </span>
                      </div>
                    </div>
                    <div className="itema">
                      <div className="icona">
                        <VisibilityOutlinedIcon />
                      </div>
                      <div className="detaila">
                        <span className="titlea"> Hiển thị</span>
                        <span className="nda">
                          Chỉ thành viên mới có thể tìm thấy nhóm này
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightVacation;
