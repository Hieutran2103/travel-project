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
          <img
              src={
                !currentUser?.avatar
                  ? "https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg"
                  : currentUser?.avatar
              }
              alt=""
            />

            <div className="info">
              <div className="name">{currentUser?.name}</div>
              <div className="email">{currentUser?.email}</div>
            </div>

            <div className="switch">
              <MoreVertOutlinedIcon />
            </div>
          </div>

          <p className="suggest"> {t("rightBar.suggest")} </p>

          <div className="others">
            <div className="other">
              <img
                src="https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900"
                alt=""
              />
              <div className="info">
                <div className="name">Paris</div>
                <div className="text">{t("rightBar.by")} Hien</div>
              </div>
              <div className="follow"> {t("rightBar.visit")}</div>
            </div>
            <div className="other">
              <img
                src="https://assets.editorial.aetnd.com/uploads/2019/03/topic-london-gettyimages-760251843-feature.jpg"
                alt=""
              />
              <div className="info">
                <div className="name">London</div>
                <div className="text">{t("rightBar.by")} Hien</div>
              </div>
              <div className="follow"> {t("rightBar.visit")}</div>
            </div>
            <div className="other">
              <img
                src="https://images.ctfassets.net/szez98lehkfm/FV7NgZtMbgnjxHFdzIFYl/0e3948c0fc08107ebb0c13f2475e4856/MyIC_Article_104204?fm=webp"
                alt=""
              />
              <div className="info">
                <div className="name">Sydney</div>
                <div className="text">{t("rightBar.by")} Hien</div>
              </div>
              <div className="follow"> {t("rightBar.visit")}</div>
            </div>
            <div className="other">
              <img
                src="https://ik.imagekit.io/tvlk/blog/2022/11/dia-diem-du-lich-bangkok-1.jpg?tr=dpr-2,w-675"
                alt=""
              />
              <div className="info">
                <div className="name">Bangkok</div>
                <div className="text">{t("rightBar.by")} Hien</div>
              </div>
              <div className="follow"> {t("rightBar.visit")}</div>
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
