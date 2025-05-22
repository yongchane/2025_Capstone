import React from "react";
import styled from "@emotion/styled";
import Btn from "../../components/Btn";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F7FBFE] w-full h-screen flex flex-col items-center ">
      <div className="w-[320px] text-[35px] font-bold pt-[104px]"> 로그인</div>
      <div className="flex flex-col items-center justify-center pt-[70px]">
        <InputBox placeholder="아이디 입력" />
        <InputBox placeholder="비밀번호 입력" />
      </div>
      <div className="flex flex-col items-center justify-center pt-[70px]">
        <Btn path="font" text="로그인" />
      </div>
      <div
        className="text-[14px] text-gray-500 relative right-[-130px] mt-[29px]"
        onClick={() => {
          navigate("/register");
        }}
      >
        회원가입
      </div>
    </div>
  );
};

export default Login;

const InputBox = styled.input`
  width: 320px;
  height: 53px;
  background-color: #ffffff;
  border-radius: 10px;
  margin: 5px;
  border: 1px solid #b3dbed;
  display: flex;
  align-items: center;
  padding-left: 10px;
  color: gray;
`;
