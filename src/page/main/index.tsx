import React from "react";
import LogoIcon from "../../assets/logo.svg?react";
import Btn from "../../components/Btn";

const Main = () => {
  return (
    <div className="bg-[#F7FBFE] w-full h-screen flex flex-col">
      <div className="pt-10">
        <LogoIcon />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <Btn path="login" text="로그인" />
      </div>
    </div>
  );
};

export default Main;
