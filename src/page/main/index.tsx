import React from "react";
import LogoIcon from "../../assets/logo.svg?react";
import Btn from "../../components/Btn";

const Main = () => {
  return (
    <>
      <div className="pt-10">
        <LogoIcon />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center hover:cursor-pointer">
        <Btn path="login" text="로그인" />
      </div>
    </>
  );
};

export default Main;
