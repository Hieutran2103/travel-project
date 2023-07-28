import { useContext } from "react";
import "./createPostVacation.scss";
import { useGlobalContextAuth } from "../../context/AuthContext";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { useTranslation } from "react-i18next";
const CreatePostVacation = () => {
  const { currentUser } = useGlobalContextAuth();
  const [t, i18] = useTranslation("global");
  return (
    <div className="createPostVacation">
      <div className="container">
        <div className="top">
          <img src={currentUser.profilePic} alt="" />
          <input
            type="text"
            placeholder={`${t("newfeed.inputPost")} ${currentUser.name}?`}
          />
        </div>
        <br />
        <div className="bottom">
          <div className="left">
            <div className="item">
              <span className="logo">
                <AddPhotoAlternateOutlinedIcon />
              </span>
              <span>{t("newfeed.addPost")}</span>
            </div>
          </div>
          {/* <div className="right">
            <button>Share</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CreatePostVacation;
