import React from "react";
import LogoIcon from "../../assets/logo.svg?react";

const Main = () => {
  return (
    <div className="bg-[#F7FBFE] w-full h-screen flex flex-col">
      <div className="pt-10">
        <LogoIcon />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-[320px] h-[53px] bg-[#6488FF] rounded-lg flex items-center justify-center text-white text-center">
          로그인
        </div>
      </div>
    </div>
  );
};

export default Main;
