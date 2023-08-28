import { useNavigate } from "react-router-dom";
import "./memberListVacation.scss";

const MemberListVacation = ({ member }) => {
  const navigate = useNavigate();

  const navigateProfile = (e) => {
    navigate(`/profile/${e}`);
  };
  return (
    <div className="memberListVacation">
      {member.map((result, id) => {
        return (
          <div
            className="userInvacation"
            key={id}
            onClick={() => navigateProfile(result._id)}
          >
            <img
              src={
                !result.avatar
                  ? "https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg"
                  : result.avatar
              }
              alt=""
            />
            <div className="detailAddd">
              <span className="nameAddd">{result.name}</span>
              <span className="followerAddd">100 follower</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MemberListVacation;
