import Animation from "../components/HomePage/Animation";
import Photos from "../components/HomePage/Photos";
import ChatPhoto from "../components/HomePage/ChatPhoto";
import { GiRoyalLove } from "react-icons/gi";
const HomePage = () => {
  return (
    <div className="w-8/12 mx-auto flex flex-col items-center gap-10">
      <Animation />
      <Photos />
      <ChatPhoto />
      <footer className="flex items-center gap-2 text-xl font-serif">
        <span>Built With love by AHMED SHERIF</span>
        <GiRoyalLove className="text-red-500" />
      </footer>
    </div>
  );
};

export default HomePage;
