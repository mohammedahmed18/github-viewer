import { FaGithubAlt } from "react-icons/fa";
const OverLayLogo = () => {
  return (
    <div className="h-4/5 flex-col flex justify-center items-center text-center text-2xl bg-zinc-900/50">
      <FaGithubAlt className="text-7xl text-base-300" />
      <p className="mt-10 text-base-300">Search for some users</p>
    </div>
  );
};

export default OverLayLogo;
