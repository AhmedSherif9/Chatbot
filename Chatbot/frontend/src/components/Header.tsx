import { Link } from "react-router-dom";
import openai from "../assets/openai.png";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isAuthenticated, logout } = useAuth() || {};
  const navigate = useNavigate();

  const getout = async () => {
    try {
      toast.loading("Logging Out", {
        id: "logout",
        duration: 9000,
      });
      await logout?.();
      toast.success("Logged Out Successfully", {
        id: "logout",
        duration: 3000,
      });
      navigate("/");
    } catch (error) {
      const err = error as Error;
      toast.error(`${err.message}`, { id: "logout", duration: 3000 });
    }
  };
  return (
    <nav className="w-full flex justify-between items-center font-semibold">
      <Link to={"/"} className="flex items-center gap-3">
        <img
          src={openai}
          alt="openai"
          className="object-cover invert"
          width={"30px"}
          height={"30px"}
        />
        <div>
          <span className="text-2xl">MERN</span>
          <span className="text-sm">-GPT</span>
        </div>
      </Link>
      <div className="flex items-center gap-3">
        {!isAuthenticated ? (
          <>
            <Link
              to={"/authenticate/login"}
              className="bg-cyan text-black px-4 py-1 rounded-lg text-sm"
            >
              LOGIN
            </Link>
            <Link
              to={"/authenticate/signup"}
              className="bg-darkblue px-4 py-1 rounded-lg text-sm"
            >
              SIGNUP
            </Link>
          </>
        ) : (
          <>
            {" "}
            <Link
              to={"/"}
              className="bg-cyan text-black px-4 py-1 rounded-lg text-sm"
            >
              GO TO CHAT
            </Link>
            <button
              onClick={getout}
              className="bg-darkblue px-4 py-1 rounded-lg text-sm"
            >
              LOGOUT
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
