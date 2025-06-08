import LogoIcon from "../../assets/AppLogo.svg?react";
import Btn from "../../components/Btn";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="pt-10">
        <LogoIcon />
      </div>
      <div
        className="flex-1 flex flex-col items-center justify-center hover:cursor-pointer"
        onClick={() => {
          navigate("/login");
        }}
      >
        <Btn text="로그인" />
      </div>
    </>
  );
};

export default Main;
