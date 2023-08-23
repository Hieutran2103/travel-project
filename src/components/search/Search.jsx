import { useMutation, useQuery } from "@tanstack/react-query";
import { useGlobalPage } from "../../context/Page";
import { useGlobalSearch } from "../../context/Search&Notification";
import customFetch from "../../utils/url";
import ListSearch from "../listSearch/ListSearch";
import SearchBar from "../searchBar/SearchBar";
import "./search.scss";
import { useState } from "react";

const Search = () => {
  const { isSearchOpen } = useGlobalSearch();
  const { page, limit, handleNextLimit } = useGlobalPage();
  const [searchCurrent, setSearchCurrent] = useState("linh");

  const { mutate: search } = useMutation({
    queryKey: ["search"],
    queryFn: () =>
      customFetch.post(`/search?limit=1&page=1&q=${searchCurrent}`),
  });

  console.log(search);

  // const reponse = data.data.result.posts;

  return (
    <div className={isSearchOpen ? "show-search " : "search"}>
      <SearchBar setSearchCurrent={setSearchCurrent} />
      <ListSearch />
    </div>
  );
};

export default Search;
