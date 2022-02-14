import { useEffect, useContext, useState } from "react";
import Loading from "../components/loading";
import { FaUsers, FaCodepen, FaTwitter, FaGlobe } from "react-icons/fa";
import { useParams } from "react-router";
import GithubContext from "../contexts/GithubContext";
import Repos from "../components/Repos";
const UserPage = () => {
  const { login } = useParams();
  const { getUser, currentUser, loading, repos, getRepos } =
    useContext(GithubContext);
  const [fullImg, setFullImg] = useState(false);
  const [addBorder, setAddBorder] = useState(false);

  useEffect(() => {
    setAddBorder(false);
    setTimeout(() => {
      setAddBorder(true);
    }, 500);
    getUser(login);
    getRepos(login);
  }, []);
  if (loading) return <Loading />;
  const {
    avatar_url,
    name,
    html_url,
    followers,
    following,
    type,
    blog,
    twitter_username,
    public_repos,
    bio,
    hireable,
  } = currentUser;
  // ////////////////////////////////////////////////////
  return (
    <div className="mx-auto flex flex-col items-center py-7">
      <div className=" w-9/12 md:w-3/6 lg:w-7/12 xl:w-4/12">
        {fullImg && (
          <div
            onClick={() => {
              setFullImg(false);
            }}
            className="fixed inset-0 bg-base-300/75"
          ></div>
        )}
        <div className="text-center w-full">
          <figure>
            <img
              className={`rounded-full ${
                addBorder && "pf"
              } ease-in-out duration-500 w-3/4 mx-auto cursor-pointer`}
              style={
                fullImg
                  ? {
                      transform: "scale(1.5) translateY(5rem)",
                      borderRadius: "0",
                    }
                  : null
              }
              src={avatar_url}
              alt={name}
              onClick={() => {
                setFullImg(true);
              }}
            />
          </figure>
          <p className="text-4xl rounded-full mt-4">{name}</p>

          {/* socials */}
          <div className="flex my-5 w-1/2	mx-auto">
            {twitter_username && (
              <a
                target="_blank"
                rel="noreferrer"
                className="mx-auto text-xl social"
                href={`http://twitter.com/${twitter_username}`}
              >
                <FaTwitter />
              </a>
            )}
            {blog && (
              <a
                target="_blank"
                className="mx-auto text-xl social"
              rel="noreferrer"
                href={blog.startsWith("http") ? blog : "http://" + blog}
              >
                <FaGlobe />
              </a>
            )}
          </div>

          {/* bio------------------------------------------------------ */}

          <div className="my-3 text-gray-400">{bio}</div>
          {/* badges */}
          <div className="flex my-6">
            <span className="badge badge-success mx-auto">{type}</span>
            {hireable && (
              <span className="badge badge-info mx-auto">heraible</span>
            )}
          </div>
          {/* followers , following-repos */}
          <div className="h-0.5 bg-gray-700 mt-4 w-full"></div>

          <div className="grid grid-rows-1 gap-x-3 grid-cols-5 my-5 flex-1 bg-base-200/25 px-7 py-14 rounded-3xl my-8">
            <div className="text-xl flex flex-col items-center">
              <span className="badge badge-primary mb-7">followers</span>
              <FaUsers className="mx-auto text-5xl my-2" />
              <p>{followers}</p>
            </div>
            <div className="divider divider-vertical mx-auto"></div>
            <div className="text-xl flex flex-col items-center">
              <span className="badge badge-secondary mb-7">following</span>
              <FaUsers className="mx-auto text-5xl my-2" />
              <p>{following}</p>
            </div>
            <div className="divider divider-vertical mx-auto"></div>

            <div className="text-xl flex flex-col items-center">
              <span className="badge badge-info mb-7">Repos</span>
              <FaCodepen className="mx-auto text-5xl my-2" />
              <p>{public_repos}</p>
            </div>
          </div>

          {/* visit on github */}
          <div>
            <a
              className="btn btn-outline rounded-full"
              href={html_url}
              target="_blank"
            >
              Visit on github
            </a>
          </div>
        </div>
      </div>
      {/* repos */}
      <Repos repos={repos} />
    </div>
  );
};

export default UserPage;
