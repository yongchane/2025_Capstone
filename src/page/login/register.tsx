import styled from "@emotion/styled";
import React from "react";

const Register = () => {
  return (
    <div className="bg-[#F7FBFE] w-full h-screen flex flex-col items-center ">
      <div className="w-[320px] text-[35px] font-bold pt-[104px]">간편하게</div>
      <div className="flex flex-col items-center justify-center pt-[70px]">
        <div className="bg-[#F7FBFE] w-full h-screen flex flex-col items-center gap-[30px]">
          <div>
            <Font>별명</Font>
            <InputBox placeholder="별명" />
          </div>
          <div>
            <Font>나이</Font>
            <InputBox placeholder="나이" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

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

const Font = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-left: 5px;
  margin-bottom: 10px;
`;
