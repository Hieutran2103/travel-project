import customFetch from "../../utils/url";
import ListAdd from "./ListAdd";
import SearchAdd from "./SearchAdd";
import UserAttend from "./UserAttend";
import "./addUser.scss";
import { useEffect, useState } from "react";

const AddUser = ({ selectUser, information, items, deleteUser }) => {
  const [results, setResults] = useState([]);
  const [resultss, setResultss] = useState("");
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      const res = await customFetch.post(
        `/vacations/mentions-users?limit=100&page=1&users=${resultss}`
      );
      const data = res?.data?.data;
      setData(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [resultss]);

  return (
    <div className="addUser">
      <UserAttend
        information={information}
        items={items}
        deleteUser={deleteUser}
      />
      <SearchAdd setResults={setResults} setResultss={setResultss} />
      <ListAdd results={results} data={data} selectUser={selectUser} />
    </div>
  );
};

export default AddUser;
