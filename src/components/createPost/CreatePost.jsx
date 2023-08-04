import { useContext } from "react";
import "./createPost.scss";
import { useGlobalContextAuth } from "../../context/AuthContext";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
const CreatePost = () => {
  const { currentUser } = useGlobalContextAuth();
  const [t, i18] = useTranslation("global");
  return (
    <div className="createPost">
      <div className="container">
        <div className="top">
          <img src={currentUser.profilePic} alt="" />
          <input
            type="text"
            placeholder={`${t("newfeed.inputPost")} ${currentUser.name}?`}
          />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <div className="item">
              <span className="logo">
                <AddPhotoAlternateOutlinedIcon />
              </span>
              <span>{t("newfeed.addPost")}</span>
            </div>

            <div className="item">
              <span className="logo">
                <CollectionsOutlinedIcon />
              </span>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/createVacation"
              >
                <span>{t("newfeed.createPost")}</span>
              </Link>
            </div>
          </div>
          <div className="right">
            <button>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
