import Title from "../../components/Title";
import SelectBox from "../../components/SelectBox";
import BusIcon from "../../assets/Bus.svg?react";
import AtBusIcon from "../../assets/AtBus.svg?react";
import SubwayIcon from "../../assets/Subway.svg?react";
import AtSubwayIcon from "../../assets/AtSubway.svg?react";
import MapIcon from "../../assets/Map.svg?react";
import AtMapIcon from "../../assets/AtMap.svg?react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

// 맞춤형 작업 어느정도 완료시 없애는 뷰 띄우기 필요

const preferenceOptions = [
  {
    icon: <BusIcon />,
    hoverIcon: <AtBusIcon />,
    subtitle: "버스",
    fontSize: 16,
    left: 0,
  },
  {
    icon: <SubwayIcon />,
    hoverIcon: <AtSubwayIcon />,
    subtitle: "지하철",
    fontSize: 16,
    left: 0,
  },
  {
    icon: <MapIcon />,
    hoverIcon: <AtMapIcon />,
    subtitle: "버스+지하철",
    fontSize: 16,
    left: 0,
  },
];

const Preference = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  return (
    <div>
      <Title title="대중교통 선호도 조사" />
      <TitleText>원하는 대중교통을 선택해 보세요!</TitleText>
      <div className=" text-[#A6A6A9] text-[10px]">
        ※ 대중교통 선호도 조사 과정이 끝나면 해당 선호도 조사는 사라집니다.
      </div>
      <div
        className="flex flex-col gap-[10px] mt-[30px]"
        onClick={() => {
          navigate("/search");
        }}
      >
        {preferenceOptions.map((option, index) => (
          <SelectBox
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            title={hoveredIndex === index ? option.hoverIcon : option.icon}
            subtitle={option.subtitle}
            fontSize={option.fontSize}
            left={option.left}
          />
        ))}
      </div>
    </div>
  );
};

export default Preference;
const TitleText = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
`;
