import { useState } from "react";
import useAlerts from "../contexts/AlertContext";
import useGithub from "../contexts/GithubContext";

const SearchUsers = () => {
  const [search, setSearch] = useState("");
  const { searchUsers } = useGithub();
  const { showError } = useAlerts();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() == "") return showError("type something first");
    searchUsers(search.trim());
  };
  return (
    <form onSubmit={handleSubmit} className="flex justify-center">
      <input
        type="text"
        placeholder="search users..."
        className="input bg-zinc-900 w-1/2 rounded-r-none	"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        autoComplete="false"
      />
      <button type="submit" className="btn rounded-l-none">
        Search
      </button>
    </form>
  );
};

export default SearchUsers;
