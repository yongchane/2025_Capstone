import { Player } from "@lottiefiles/react-lottie-player";
import loadingAnimation from "../assets/lottie/loading.json";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-[80vh] ">
      <Player
        src={loadingAnimation}
        className="w-[100%] h-[100vh]"
        loop={true}
        autoplay={true}
      />
    </div>
  );
};

export default Loading;
