import { useParams } from "react-router-dom";
import Login from "../components/AuthenticatePage/Login";
import Register from "../components/AuthenticatePage/Signup";
import airobot from "../assets/airobot.png";

const AuthenticatePage = () => {
  const { op } = useParams();
  return (
    <div className="flex justify-between items-end mt-16 px-10">
      <img src={airobot} alt="airobot" width={300} height={300} />
      {op == "login" ? <Login /> : <Register />}
    </div>
  );
};

export default AuthenticatePage;
