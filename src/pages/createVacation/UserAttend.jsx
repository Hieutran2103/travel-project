import "./userAttend.scss";
import ClearIcon from "@mui/icons-material/Clear";

const UserAttend = ({ items, deleteUser }) => {
  return (
    <div className="userAttend">
      {/* map */}
      {items?.map((info, index) => {
        const { name, avatar, _id } = info;

        return (
          <div className="attend" key={index}>
            <img
              src={
                !avatar
                  ? "https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg"
                  : avatar
              }
              alt=""
            />
            <div className="nameAttend">{name}</div>
            <div className="deleteAttend" onClick={() => deleteUser(_id)}>
              <ClearIcon style={{ height: "20px", width: "20px" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserAttend;
