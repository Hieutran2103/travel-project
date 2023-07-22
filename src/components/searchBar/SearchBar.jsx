import "./searchBar.scss";
import ClearIcon from "@mui/icons-material/Clear"; // x tren
import HighlightOffIcon from "@mui/icons-material/HighlightOff"; // x trong input
import { useGlobalSearch } from "../../context/Search&Notification";
import { useTranslation } from "react-i18next";

const SearchBar = () => {
  const { closeSearch } = useGlobalSearch();
  const [t, i18] = useTranslation("global");
  return (
    <div className="searchBar">
      <div className="title">
        <p>{t("leftBar.search")}</p>
        <button onClick={closeSearch}>
          <ClearIcon style={{ height: "40px", width: "40px" }} />
        </button>
      </div>
      <div className="input">
        <input type="text" placeholder={`${t("leftBar.search")}`} />
        <button>
          <HighlightOffIcon />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
