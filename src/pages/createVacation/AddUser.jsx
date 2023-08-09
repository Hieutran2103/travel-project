import ListAdd from "./ListAdd";
import SearchAdd from "./SearchAdd";
import UserAttend from "./UserAttend";
import "./addUser.scss";
import { useState } from "react";

const AddUser = ({ selectUser, information, userAdded, deleteUser }) => {
  const [results, setResults] = useState([]);
  return (
    <div className="addUser">
      <UserAttend
        information={information}
        userAdded={userAdded}
        deleteUser={deleteUser}
      />
      <SearchAdd setResults={setResults} />
      <ListAdd results={results} selectUser={selectUser} />
    </div>
  );
};

export default AddUser;
