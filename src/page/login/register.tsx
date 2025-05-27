import styled from "@emotion/styled";
import React, { useState } from "react";
import Btn from "../../components/Btn";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Title";

const Register = () => {
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState<string>("");

  return (
    <>
      {/* 회원가입 연동 필요, 상태관리 */}
      <div
        className="hover:cursor-pointer"
        onClick={() => {
          navigate("/login");
        }}
      >
        <Title title="간편하게!" />
      </div>
      <div className="flex flex-col items-center justify-center pt-[70px]">
        <div className="bg-[#F7FBFE] w-full h-full flex flex-col items-center gap-[30px]">
          <div>
            <Font>별명</Font>
            <InputBox placeholder="별명" />
          </div>
          <div>
            <Font>나이</Font>
            <InputBox placeholder="나이" />
          </div>
          <div>
            <Font>성별</Font>
            <div className="flex gap-[10px]">
              <SelectBox
                isSelected={selectedGender === "남자"}
                onClick={() => setSelectedGender("남자")}
              >
                남자
              </SelectBox>
              <SelectBox
                isSelected={selectedGender === "여자"}
                onClick={() => setSelectedGender("여자")}
              >
                여자
              </SelectBox>
            </div>
            <div className="pt-[169px] hover:cursor-pointer">
              <Btn path="login" text="회원가입" />
            </div>
          </div>
        </div>
      </div>
    </>
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

const SelectBox = styled.button<{ isSelected: boolean }>`
  width: 155px;
  height: 53px;
  background-color: ${(props) => (props.isSelected ? "#6488FF" : "#ffffff")};
  color: ${(props) => (props.isSelected ? "#ffffff" : "inherit")};
  border-radius: 10px;
  border: ${(props) =>
    props.isSelected ? "1px solid #6488FF" : "1px solid #b3dbed"};
  transition: all 0.3s ease;
  :hover {
    cursor: pointer;
    background-color: #6488ff;
    color: #ffffff;
  }
`;
