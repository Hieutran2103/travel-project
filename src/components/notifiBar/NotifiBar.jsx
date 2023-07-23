import "./notifiBar.scss";
import ClearIcon from "@mui/icons-material/Clear";
import { useGlobalSearch } from "../../context/Search&Notification";
import { useTranslation } from "react-i18next";

const NotifiBar = () => {
  const { closeNotifi } = useGlobalSearch();
  const [t, i18] = useTranslation("global");
  return (
    <div className="searchBar">
      <div className="title">
        <p>{t("leftBar.notifi")}</p>
        <button onClick={closeNotifi}>
          <ClearIcon style={{ height: "40px", width: "40px" }} />
        </button>
      </div>
    </div>
  );
};

export default NotifiBar;
