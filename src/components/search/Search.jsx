import { useGlobalSearch } from "../../context/Search&Notification";
import ListSearch from "../listSearch/ListSearch";
import SearchBar from "../searchBar/SearchBar";
import "./search.scss";

const Search = () => {
  const { isSearchOpen } = useGlobalSearch();
  return (
    <div className={isSearchOpen ? "show-search " : "search"}>
      <SearchBar />
      <ListSearch />
    </div>
  );
};

export default Search;
