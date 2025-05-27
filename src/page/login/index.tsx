import React from "react";
import styled from "@emotion/styled";
import Btn from "../../components/Btn";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Title";

const Login = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* 로그인 관련 연동 필요, 상태관리 */}
      <Title title="로그인" />
      <div className="flex flex-col items-center justify-center pt-[70px]">
        <InputBox placeholder="아이디 입력" />
        <InputBox placeholder="비밀번호 입력" />
      </div>
      <div className="flex flex-col items-center justify-center pt-[70px] hover:cursor-pointer">
        <Btn path="font" text="로그인" />
      </div>
      <div
        className="text-[14px] text-gray-500 relative right-[-130px] mt-[29px] hover:cursor-pointer"
        onClick={() => {
          navigate("/register");
        }}
      >
        회원가입
      </div>
    </>
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
