import { useContext } from "react";
import GithubContext from "../contexts/GithubContext";
import Loading from "./loading";
import UserItem from "./UserItem";
import { v4 as uuidv4 } from "uuid";

const UserResults = () => {
  const { loading, results, loadMore } = useContext(GithubContext);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="grid gap-5 grid-cols-3 p-4 md:grid-cols-5 lg:grid-cols-7">
        {results.map((user) => (
          <UserItem key={uuidv4()} user={user} />
        ))}
      </div>

      {results.length >= 42 ? (
        <div className="py-3">
          <button
            onClick={loadMore}
            className="btn btn-primary mx-auto rounded-lg block"
          >
            Load more
          </button>
        </div>
      ) : null}
    </>
  );
};

export default UserResults;
