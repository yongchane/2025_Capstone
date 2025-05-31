import styled from "@emotion/styled";
import BackIcon from "../../assets/back.svg?react";
import PlaceBox from "./components/PlaceBox";
import Category from "./components/Category";
import SearchIcon from "../../assets/search.svg?react";
const Place = () => {
  return (
    <div className="w-full flex flex-col h-screen">
      <div className="w-full pt-[20px] pb-[10px] pl-[10px] pr-[10px] flex flex-col justify-between items-center gap-[15px]">
        <div className="w-full flex justify-start">
          <BackIcon />
        </div>
        <InputBoxContainer>
          <InputBox placeholder="맛집,카페,메뉴 검색" />
          {/* 버튼 연동 필요 */}
          <StyledButton>
            <SearchIcon />
          </StyledButton>
        </InputBoxContainer>
      </div>
      <div className="flex-1 bg-[#ffffff] mt-[15px] rounded-t-[12px] border border-[#B3DBED] ">
        <Category />
        <div className="flex flex-row gap-[20px] p-[20px]">
          <PlaceBox />
        </div>
      </div>
    </div>
  );
};

export default Place;

const InputBox = styled.input`
  width: 80%;
  height: 50px;
  background-color: #ffffff;
  border-radius: 10px;

  display: flex;
  align-items: center;
  padding-left: 10px;
  color: gray;
  border: none;
  outline: none;
  &:focus {
    outline: none;
    border: none;
  }
`;

const InputBoxContainer = styled.div`
  width: 95%;
  height: 54px;
  background-color: #ffffff;
  border-radius: 10px;
  margin: 5px;
  border: 1px solid #b3dbed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;
const StyledButton = styled.button`
  width: 30px;
  height: 30px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border: none;
  outline: none;
  cursor: pointer;

  &:focus {
    outline: none;
    border: none;
  }
`;
