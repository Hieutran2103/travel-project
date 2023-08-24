import { useGlobalSearch } from "../../context/Search&Notification";
import { useTranslation } from "react-i18next";

import customFetch from "../../utils/url";
import ListSearch from "../listSearch/ListSearch";
import SearchBar from "../searchBar/SearchBar";
import "./search.scss";
import { useEffect, useState } from "react";
import ListSearchVaca from "../listSearchVaca/ListSearchVaca";

const Search = () => {
  const { isSearchOpen } = useGlobalSearch();
  const [searchCurrent, setSearchCurrent] = useState("");
  const [dataUser, setUser] = useState();
  const [dataVacation, setVacation] = useState();

  const [checkSearch, setCheckSearch] = useState(true);
  const [t, i18] = useTranslation("global");
  const fetchData = async () => {
    try {
      const res = await customFetch.post(
        `/search?limit=30&page=1&q=${searchCurrent}`
      );
      const data = res.data.data;
      setUser(data.users);
      setVacation(data.vacations);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchData();
  }, [searchCurrent]);
  return (
    <div className={isSearchOpen ? "show-search " : "search"}>
      <SearchBar setSearchCurrent={setSearchCurrent} />
      <div className="selectSearch">
        <div className="searchUser" onClick={() => setCheckSearch(true)}>
          {t("leftBar.user")}
        </div>
        <div className="searchVacation" onClick={() => setCheckSearch(false)}>
          {t("leftBar.vacation")}
        </div>
      </div>
      {checkSearch ? (
        <ListSearch dataUser={dataUser} />
      ) : (
        <ListSearchVaca dataVacation={dataVacation} />
      )}
    </div>
  );
};

export default Search;
