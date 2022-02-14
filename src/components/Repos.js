import RepoItem from "./RepoItem";
const Repos = ({ repos }) => {
  return (
    <>
      <div className="flex flex-col w-9/12 my-5">
        <div className="divider stat-value">Repos</div>
      </div>

      <div
        className="my-10 px-8 grid grid-cols-1 md:grid-cols-2
    lg:grid-cols-3
    xl:grid-cols-4
    gap-5 w-full"
      >
        {repos.map((repo) => (
          <RepoItem repo={repo} key={repo.id} />
        ))}
      </div>
    </>
  );
};

export default Repos;
