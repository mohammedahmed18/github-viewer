import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="hero min py-14 px-10 h-full">
      <div className="bg-gray-400/10 drop-shadow-lg h-full w-full flex flex-col justify-center items-center py-4">
        <h1 className="font-bold text-8xl ">OOPS !!!</h1>
        <p className=" text-xl my-8">
          the page you are looking for is not found
        </p>
        <Link to="/" className="btn btn-secondary">
          Return to the home page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
