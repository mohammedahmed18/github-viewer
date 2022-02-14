import SearchUsers from "../components/SearchUsers";
import UserResults from "../components/UsersResults";
import { FaArrowUp } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import GithubContext from "../contexts/GithubContext";
import OverLayLogo from "../components/OverlayLogo";

const Home = () => {
  const { results } = useContext(GithubContext);
  const [isVisible, setIsVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  return (
    <div className="container h-full mx-auto py-5 relative">
      <SearchUsers />
      <UserResults />
      {results.length === 0 && <OverLayLogo />}
      <button
        onClick={scrollToTop}
        className={`btn fixed bottom-5 right-5 btn-base-200 rounded-full drop-shadow-xl p-4 text-primary ${
          !isVisible ? "opacity-0 scale-0" : "opacity-100 scale-100"
        }`}
        style={{ transition: "ease-in-out all 0.5s" }}
      >
        <FaArrowUp />
      </button>
    </div>
  );
};

export default Home;
