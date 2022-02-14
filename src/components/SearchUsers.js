import { useContext, useState } from "react";
import AlertContext from "../contexts/AlertContext";
import GithubContext from "../contexts/GithubContext";

const SearchUsers = () => {
  const [search, setSearch] = useState("");
  const { searchUsers } = useContext(GithubContext);
  const { showError } = useContext(AlertContext);

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
        className="input bg-neutral w-1/2 rounded-r-none	"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button type="submit" className="btn btn-outline rounded-l-none">
        Search
      </button>
    </form>
  );
};

export default SearchUsers;
