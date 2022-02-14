import PropTypes from "prop-types";
import { FaCube, FaCircle, FaStar } from "react-icons/fa";
import { BiGitRepoForked } from "react-icons/bi";
const RepoItem = ({ repo }) => {
  const {
    html_url,
    name,
    description,
    forks,
    language,
    size,
    stargazers_count: stars,
  } = repo;
  const formatSize = (_size) => {
    if (_size >= 1000) {
      let migaSize = Math.floor(_size / 1000);
      return `${migaSize} MB`;
    }
    return `${_size} KB`;
  };

  const formatStars = (_stars) => {
    if (_stars >= 1000) {
      let starsK = Math.floor(_stars / 1000);
      return `${starsK} k`;
    }
    return `${_stars}`;
  };
  const getColor = () => {
    if (!language) return "#2d3a5c";
    switch (language.toLowerCase()) {
      case "javascript":
        return "#dee340";
      case "typescript":
        return "#219deb";
      case "vue":
        return "#3FB27F";
      case "react":
        return "#61DCF7";
      case "angular":
        return "#AA2A2C";
      case "html":
        return "#b5040c";
      case "css":
        return "#198bfc";
      case "go":
        return "#7019b3";
      case "ruby":
        return "#ab0769";

      default:
        return "#2d3a5c";
    }
  };
  return (
    <a
      href={html_url}
      target="_blank"
      className="bg-base-200/25 hover:bg-base-200/50 ease-in-out duration-300 flex flex-col p-4 justify-between shadow-xl"
    >
      {/* name */}
      <div className="flex items-center">
        <FaCube /> <h1 className="ml-5 inline-block">{name}</h1>
      </div>
      {/* description */}
      <div className="text-base-content/50 my-7 font-light">{description}</div>
      {/* info */}
      <div className="flex justify-between font-light text-sm">
        <div className="grid grid-cols-3 flex-1">
          <div className="flex justify-center items-center">
            <FaCircle color={getColor()} className="text-sm mr-2" />
            {language && <span>{language}</span>}
          </div>
          <div className="flex justify-center items-center">
            <BiGitRepoForked className="text-sm mr-2" />
            <span>{forks}</span>
          </div>
          <div className="flex justify-center items-center">
            <FaStar className="text-sm mr-2" />
            <span>{formatStars(stars)}</span>
          </div>
        </div>
        <p className="badge text-sm">{formatSize(size)}</p>
      </div>
    </a>
  );
};

RepoItem.prototype = {
  repo: PropTypes.object.isRequired,
};
export default RepoItem;
