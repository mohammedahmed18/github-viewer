import { useContext } from "react";
import GithubContext from "../contexts/GithubContext";
import { Link } from "react-router-dom";

const UserItem = ({ user: { login, avatar_url } }) => {
  const { loading } = useContext(GithubContext);
  return (
    <Link
      to={"/users/" + login}
      className="flex flex-col p-2 items-center bg-base-100 rounded-2xl hover:bg-base-200/50 shadow-lg"
      style={{ transition: "0.5s" }}
    >
      <img
        className="mask mask-squircle my-3 w-3/4 ease-in-out"
        style={loading ? { width: "1rem", height: "1rem" } : {}}
        src={avatar_url}
        alt="profile picture"
      />
      <span className="text-sm md:text-md flex-1 text-center">{login}</span>
    </Link>
  );
};

export default UserItem;
