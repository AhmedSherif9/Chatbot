import { Link } from "react-router-dom";
import openai from "../assets/openai.png";

const Header = () => {
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
      </div>
    </nav>
  );
};

export default Header;
