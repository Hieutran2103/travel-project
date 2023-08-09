import "./userAttend.scss";
import ClearIcon from "@mui/icons-material/Clear";

const UserAttend = ({ userAdded, deleteUser }) => {
  return (
    <div className="userAttend">
      {/* map */}
      {userAdded.current.map((info, index) => {
        const { userId, name, profilePic } = info;
        return (
          <div className="attend" key={index}>
            <img src={profilePic} alt="" />
            <div className="nameAttend">{name}</div>
            <div className="deleteAttend" onClick={() => deleteUser(userId)}>
              <ClearIcon style={{ height: "20px", width: "20px" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserAttend;
