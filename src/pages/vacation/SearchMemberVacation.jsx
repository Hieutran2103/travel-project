import { useState } from "react";
import "./searchMemberVacation.scss";
import ClearIcon from "@mui/icons-material/Clear"; // x tren

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useGlobalSearch } from "../../context/Search&Notification";
const SearchMemberVacation = ({ setMember, dataVacation }) => {
  const [inputSearch, setInputSearch] = useState("");
  const { closeUserVacation } = useGlobalSearch();

  const handlesearchUser = (value) => {
    setInputSearch(value);
    const result = dataVacation.mentions.filter((user) => {
      return user && user.name && user.name.toLowerCase().includes(value);
    });

    return setMember(result);
  };
  return (
    <div className="searchMemberVacation">
      <div className="nameMember">
        <span className="T">Thành viên</span>
        <span className="H"> {dataVacation?.mentions?.length}</span>
        <span className="D" onClick={closeUserVacation}>
          <ClearIcon />
        </span>
      </div>
      <div className="checkUsers">
        <SearchOutlinedIcon style={{ marginLeft: "2px" }} />
        <input
          type="text "
          placeholder="Tìm thành viên..."
          value={inputSearch}
          onChange={(e) => handlesearchUser(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchMemberVacation;
