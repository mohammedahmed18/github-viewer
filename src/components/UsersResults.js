import useGithub from "../contexts/GithubContext";
import Loading from "./loading";
import UserItem from "./UserItem";
import { v4 as uuidv4 } from "uuid";

const UserResults = () => {
  const { loading, results, loadMore } = useGithub();
  if (loading && results.length === 0) {
    return <Loading />;
  }
  return (
    <>
      <div className="grid gap-5 grid-cols-3 p-4 md:grid-cols-5 lg:grid-cols-7">
        {results.map((user) => (
          <UserItem key={uuidv4()} user={user} />
        ))}
      </div>

      <div className="py-3">
        <button
          onClick={loadMore}
          className="btn mx-auto rounded-full bg-zinc-800 block"
          disabled={loading}
        >
          Load more
        </button>
      </div >
    </>
  );
};

export default UserResults;
