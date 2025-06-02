import { useState } from "react";
import Title from "../../components/Title";
import InputPlace from "../../components/InputPlace";
import PlaceIcon from "../../assets/Place.svg?react";
import AtPlaceIcon from "../../assets/AtPlace.svg?react";
import SearchIcon from "../../assets/SearchHome.svg?react";
import AtSearchIcon from "../../assets/AtSearchHome.svg?react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import BusStop from "./components/BusStop";
import Place from "./components/Place";
import { useFontSize } from "../../context/FontSizeContext";
import { getNickname } from "../../api/auth";

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
    path: "/preference",
  },
];

const Home = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const { currentFontSize } = useFontSize();
  const nickname = getNickname() || "사용자";

  return (
    <HomeContainer>
      <div className="flex flex-col items-center justify-start w-full h-full">
        <Title title={`${nickname}님, 안녕하세요!`} />

        {/* 폰트 사이즈 설정 버튼 */}
        <div className="mb-4">
          <button
            onClick={() => navigate("/font")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-small"
          >
            글자 크기 설정 (현재: {currentFontSize.title})
          </button>
        </div>

        <InputPlace />
        <div className="flex gap-[26px] mt-[40px]">
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
              <div className="text-base">{option.title}</div>
            </SelectBox>
          ))}
        </div>
        <div className="mt-[40px] flex flex-col gap-[30px] w-full flex flex-col items-center">
          <BusStop />
          <Place />
        </div>
      </div>
    </HomeContainer>
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

const HomeContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
