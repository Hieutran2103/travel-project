import { useGlobalSearch } from "../../context/Search&Notification";

import "./editMySelf.scss";

const EditMySelf = () => {
  const { closeEdit, openEditSpecific } = useGlobalSearch();
  return (
    <>
      <div className="editMySelf">
        <div className="itemm" style={{ color: "red" }}>
          Delete
        </div>
        <hr />
        <div className="itemm" onClick={openEditSpecific}>
          Edit
        </div>
        <hr />
        <div className="itemm" onClick={closeEdit}>
          Cancel
        </div>
      </div>
    </>
  );
};

export default EditMySelf;
