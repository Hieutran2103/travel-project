import { useState } from "react";
import MemberListVacation from "./MemberListVacation";
import SearchMemberVacation from "./SearchMemberVacation";
import "./memberVacation.scss";
import { useGlobalSearch } from "../../context/Search&Notification";

const MemberVacation = ({ dataVacation }) => {
  const [member, setMember] = useState(dataVacation.mentions);
  const { userVacation } = useGlobalSearch();

  return (
    <div className={userVacation ? "show-memberVacation" : "memberVacation"}>
      <div className="containMember">
        <SearchMemberVacation
          setMember={setMember}
          dataVacation={dataVacation}
        />
        <MemberListVacation member={member} />
      </div>
    </div>
  );
};

export default MemberVacation;
