import openai from "../../assets/openai.png";
import robot from "../../assets/robot.png";

const Photos = () => {
  return (
    <div className="w-full flex justify-between items-center px-5">
      <img
        src={robot}
        alt="robot"
        className="object-cover"
        width={"125px"}
        height={"125px"}
      />
      <img
        src={openai}
        alt="openai"
        className="object-cover invert"
        width={"125px"}
        height={"125px"}
      />
    </div>
  );
};

export default Photos;
