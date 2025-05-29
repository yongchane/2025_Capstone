import React, { useState } from "react";
import Title from "../../components/Title";
import InputPlace from "../../components/InputPlace";
import PlaceIcon from "../../assets/Place.svg?react";
import AtPlaceIcon from "../../assets/AtPlace.svg?react";
import SearchIcon from "../../assets/SearchHome.svg?react";
import AtSearchIcon from "../../assets/AtSearchHome.svg?react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const selectBoxOptions = [
  {
    title: "주변",
    icon: <PlaceIcon />,
    hoverIcon: <AtPlaceIcon />,
    path: "/place",
  },
  {
    title: "길찾기",
    icon: <SearchIcon />,
    hoverIcon: <AtSearchIcon />,
    path: "/search",
  },
];

const Home = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  return (
    <div>
      {/* 로그인에 따른 닉네임 및 로직 구현 필요 */}
      <div className="flex flex-col items-center justify-center">
        <Title title="000님, 안녕하세요!" />
        <InputPlace />
        {/* 맞춤형 검색 옵션 뷰 필요 */}
        <div className="flex gap-[26px] mt-[69px]">
          {selectBoxOptions.map((option, index) => (
            <SelectBox
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => {
                navigate(option.path);
              }}
            >
              {hoveredIndex === index ? option.hoverIcon : option.icon}
              <div>{option.title}</div>
            </SelectBox>
          ))}
        </div>
        <div className="mt-[60px]">
          <ShowBox>
            <div>
              <div>
                <div></div>
              </div>
            </div>
          </ShowBox>
        </div>
      </div>
    </div>
  );
};

export default Home;

const SelectBox = styled.div`
  width: 150px;
  height: 150px;
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #b3dbed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #6488ff;
    color: #ffffff;
  }
`;

const ShowBox = styled.div`
  width: 325px;
  height: 280px;
  background-color: #ffffff;
  border-radius: 15px 15px 0 0;
`;
