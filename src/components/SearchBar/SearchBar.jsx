import { useState, useMemo } from "react";
import debounce from "lodash.debounce";
// import styles from "./SearchBar.module.scss"

const SearchBar = ({ onSearch, debounceTime = 500 }) => {
  const [value, setValue] = useState("");

  const debouncedSearch = useMemo(
    () => debounce((val) => onSearch(val.trim()), debounceTime),
    [onSearch, debounceTime]
  );

  const handleChange = (e) => {
    setValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search movie..."
      value={value}
      onChange={handleChange}
    />
  );
};

export default SearchBar;
