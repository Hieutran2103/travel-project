import { useGlobalContextAuth } from "../../context/AuthContext";
import { useGlobalSearch } from "../../context/Search&Notification";
import "./specific.scss";

const SpecificEdit = ({ currentpost }) => {
  const { currentUser } = useGlobalContextAuth();
  const { editSpecific, closeEditSpecific } = useGlobalSearch();

  const posts = [
    {
      id: 1,
      name: `${currentUser.name}`,
      userId: `${currentUser.id}`,
      profilePic: `${currentUser.profilePic}`,
      desc: "Hieudzai1",
      img: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 2,
      name: "Kien Ngu",
      userId: 9,
      profilePic:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
    },
    {
      id: 3,
      name: "Huy Cai",
      userId: 300,
      profilePic:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Hieudzai3",
      img: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    },
  ];
  const { desc, name, profilePic, img } = posts[currentpost];

  return (
    <div className={editSpecific ? "show-specificEdit" : "specificEdit"}>
      <form>
        <div className="tren">
          <div
            className="cancel"
            style={{ color: "black" }}
            onClick={closeEditSpecific}
          >
            Cancel
          </div>
          <div className="EditInfo" style={{ color: "black" }}>
            Edit info
          </div>
          <button type="submit">Done</button>
        </div>
        <div className="duoi">
          <div className="image">
            <img src={img} alt="" />
          </div>
          <div className="writeEdit">
            <div className="userCurrent">
              <img src={profilePic} alt="" />
              <div className="nameUser">{name}</div>
            </div>
            <input
              type="text"
              style={{
                width: "90%",
                outline: "transparent",
                border: "transparent",
                margin: "0 16px",
                wordWrap: "break-word",
              }}
              placeholder="Write a caption..."
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SpecificEdit;
