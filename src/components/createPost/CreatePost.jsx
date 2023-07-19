import { useContext } from "react";
import "./createPost.scss";
import { useGlobalContextAuth } from "../../context/AuthContext";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
const CreatePost = () => {
  const { currentUser } = useGlobalContextAuth();

  return (
    <div className="createPost">
      <div className="container">
        <div className="top">
          <img src={currentUser.profilePic} alt="" />
          <input
            type="text"
            placeholder={`What's on your mind ${currentUser.name}?`}
          />
        </div>
        <br />
        <div className="bottom">
          <div className="left">
            <div className="item">
              <span className="logo">
                <AddPhotoAlternateOutlinedIcon />
              </span>
              <span>Add Image</span>
            </div>
            <div className="item">
              <span className="logo">
                <CollectionsOutlinedIcon />
              </span>
              <span>Create Vacation</span>
            </div>
          </div>
          <div className="right">
            <button>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
