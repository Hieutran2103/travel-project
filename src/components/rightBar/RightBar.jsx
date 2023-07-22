import { useTranslation } from "react-i18next";
import { useGlobalContextAuth } from "../../context/AuthContext";
import "./rightBar.scss";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
const RightBar = () => {
  const { currentUser } = useGlobalContextAuth();
  const [t, i18] = useTranslation("global");
  return (
    <div className="rightBar">
      <div className="container">
        <div className="menu">
          <div className="myself">
            <img src={currentUser.profilePic} alt="" />

            <div className="info">
              <div className="name">{currentUser.name}</div>
              <div className="email">{currentUser.email}</div>
            </div>

            <div className="switch">
              <MoreVertOutlinedIcon />
            </div>
          </div>

          <p className="suggest"> {t("rightBar.suggest")} </p>

          <div className="others">
            <div className="other">
              <img
                src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t1.15752-9/333777571_873881007235574_6229213634839464353_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_ohc=-vCR427BOdkAX-p-jA9&_nc_ht=scontent.fsgn2-8.fna&oh=03_AdSp0tPk6yip7E_PS95KmB1gWy1cawYuipIVldtj6EE9vA&oe=64DD9BF7"
                alt=""
              />
              <div className="info">
                <div className="name">Dương Văn Cải</div>
                <div className="text">500 {t("rightBar.follower")}</div>
              </div>
              <div className="follow"> {t("rightBar.follow")}</div>
            </div>
            <div className="other">
              <img
                src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t1.15752-9/333777571_873881007235574_6229213634839464353_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_ohc=-vCR427BOdkAX-p-jA9&_nc_ht=scontent.fsgn2-8.fna&oh=03_AdSp0tPk6yip7E_PS95KmB1gWy1cawYuipIVldtj6EE9vA&oe=64DD9BF7"
                alt=""
              />
              <div className="info">
                <div className="name">Dương Văn Cải</div>
                <div className="text">500 {t("rightBar.follower")}</div>
              </div>
              <div className="follow"> {t("rightBar.follow")}</div>
            </div>
            <div className="other">
              <img
                src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t1.15752-9/333777571_873881007235574_6229213634839464353_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_ohc=-vCR427BOdkAX-p-jA9&_nc_ht=scontent.fsgn2-8.fna&oh=03_AdSp0tPk6yip7E_PS95KmB1gWy1cawYuipIVldtj6EE9vA&oe=64DD9BF7"
                alt=""
              />
              <div className="info">
                <div className="name">Dương Văn Cải</div>
                <div className="text">500 {t("rightBar.follower")}</div>
              </div>
              <div className="follow"> {t("rightBar.follow")}</div>
            </div>
            <div className="other">
              <img
                src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t1.15752-9/333777571_873881007235574_6229213634839464353_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_ohc=-vCR427BOdkAX-p-jA9&_nc_ht=scontent.fsgn2-8.fna&oh=03_AdSp0tPk6yip7E_PS95KmB1gWy1cawYuipIVldtj6EE9vA&oe=64DD9BF7"
                alt=""
              />
              <div className="info">
                <div className="name">Dương Văn Cải</div>
                <div className="text">500 {t("rightBar.follower")}</div>
              </div>
              <div className="follow"> {t("rightBar.follow")}</div>
            </div>
          </div>

          <footer>
            <p>
              About Help Press API Jobs Privacy Terms Locations Language English
              Meta Verified
            </p>
            <p>© 2023 TRAVEL FROM RICH KIDS</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
