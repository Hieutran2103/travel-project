import "./memberListVacation.scss";

const MemberListVacation = ({ member }) => {
  return (
    <div className="memberListVacation">
      {member.map((result, id) => {
        return (
          <div className="userInvacation" key={id}>
            <img src={result.profilePic} alt="" />
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
