import "./searchBar.scss";
import ClearIcon from "@mui/icons-material/Clear"; // x tren
import HighlightOffIcon from "@mui/icons-material/HighlightOff"; // x trong input
import { useGlobalSearch } from "../../context/Search&Notification";

const SearchBar = () => {
  const { closeSearch } = useGlobalSearch();

  return (
    <div className="searchBar">
      <div className="title">
        <p>Search</p>
        <button onClick={closeSearch}>
          <ClearIcon style={{ height: "40px", width: "40px" }} />
        </button>
      </div>
      <div className="input">
        <input type="text" placeholder="Search..." />
        <button>
          <HighlightOffIcon />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
