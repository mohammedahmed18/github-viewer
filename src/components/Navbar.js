import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
const Navbar = () => {
  return (
    <nav className="navbar fixed inset-x-0 bg-base-200/70 z-10 drop-shadow-lg backdrop-blur-sm">
      <div className="container mx-auto">
        <Link to="/" className="text-md md:text-xl font-bold">
          <FaGithub className="text-3xl inline mr-3 " />
          Github Viewer
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
