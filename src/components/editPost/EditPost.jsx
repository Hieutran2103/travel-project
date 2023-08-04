import { useGlobalContextAuth } from "../../context/AuthContext";

import EditMySelf from "../editMyself/EditMySelf";
import SpecificEdit from "../specificEdit/SpecificEdit";
// import SpecificEdit from "../";

import "./editPost.scss";

const EditPost = ({ currentpost }) => {
  return (
    <div className="editPost">
      <EditMySelf />
      <SpecificEdit currentpost={currentpost} />
    </div>
  );
};

export default EditPost;
