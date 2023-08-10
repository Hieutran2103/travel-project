import { useState } from "react";
import MemberListVacation from "./MemberListVacation";
import SearchMemberVacation from "./SearchMemberVacation";
import "./memberVacation.scss";
import { useGlobalSearch } from "../../context/Search&Notification";
import ClearIcon from "@mui/icons-material/Clear"; // x tren

const MemberVacation = ({ posts }) => {
  const [member, setMember] = useState(posts);
  const { userVacation } = useGlobalSearch();
  return (
    <div className={userVacation ? "show-memberVacation" : "memberVacation"}>
      <div className="containMember">
        <SearchMemberVacation setMember={setMember} posts={posts} />
        <MemberListVacation member={member} />
      </div>
    </div>
  );
};

export default MemberVacation;
