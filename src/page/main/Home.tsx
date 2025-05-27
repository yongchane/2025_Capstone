import React from "react";
import Title from "../../components/Title";
import InputPlace from "../../components/InputPlace";

const Home = () => {
  return (
    <div>
      {/* 로그인에 따른 닉네임 및 로직 구현 필요 */}
      <div className="flex flex-col items-center justify-center">
        <Title title="000님, 안녕하세요!" />
        <InputPlace />
      </div>
    </div>
  );
};

export default Home;
