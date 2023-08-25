import { useState } from "react";
import "./searchAdd.scss";

const SearchAdd = ({ setResults, setResultss }) => {
  const [input, setInput] = useState("");

  const handleAddUser = (value) => {
    setInput(value);
    setResultss(value);
  };
  return (
    <div className="searchAdd">
      <input
        type="text"
        placeholder="Mời bạn bè (Không bắt buộc)"
        value={input}
        onChange={(e) => handleAddUser(e.target.value)}
      />
    </div>
  );
};

export default SearchAdd;
