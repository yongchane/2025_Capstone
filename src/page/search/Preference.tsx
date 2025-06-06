import Title from "../../components/Title";
import SelectBox from "../../components/SelectBox";
import BusIcon from "../../assets/Bus.svg?react";
import AtBusIcon from "../../assets/AtBus.svg?react";
import SubwayIcon from "../../assets/Subway.svg?react";
import AtSubwayIcon from "../../assets/AtSubway.svg?react";
import MapIcon from "../../assets/Map.svg?react";
import AtMapIcon from "../../assets/AtMap.svg?react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import useLocationStore from "../../store/useLocationStore";

// 맞춤형 작업 어느정도 완료시 없애는 뷰 띄우기 필요
const preferenceOptions = [
  {
    icon: <BusIcon />,
    hoverIcon: <AtBusIcon />,
    subtitle: "버스",
    fontSize: 16,
    left: 0,
    value: "BUS", // 서버에서 기대하는 영어 값
  },
  {
    icon: <SubwayIcon />,
    hoverIcon: <AtSubwayIcon />,
    subtitle: "지하철",
    fontSize: 16,
    left: 0,
    value: "SUBWAY", // 서버에서 기대하는 영어 값
  },
  {
    icon: <MapIcon />,
    hoverIcon: <AtMapIcon />,
    subtitle: "버스+지하철",
    fontSize: 16,
    left: 0,
    value: "BUS_SUBWAY", // 서버에서 기대하는 영어 값
  },
];

interface ClickCounts {
  [key: string]: number;
}

const Preference = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickCounts, setClickCounts] = useState<ClickCounts>({});
  const { setPreferred } = useLocationStore();
  const navigate = useNavigate();

  // localStorage에서 클릭 횟수 불러오기
  useEffect(() => {
    const savedCounts = localStorage.getItem("preferenceClickCounts");
    if (savedCounts) {
      const parsedCounts = JSON.parse(savedCounts);
      setClickCounts(parsedCounts);
      updateMostClickedOption(parsedCounts);
    }
  }, []);

  // 가장 많이 클릭된 옵션 업데이트
  const updateMostClickedOption = (counts: ClickCounts) => {
    const maxCount = Math.max(...Object.values(counts));
    if (maxCount > 0) {
      const mostClicked = Object.keys(counts).find(
        (key) => counts[key] === maxCount
      );
      setPreferred(mostClicked || null);
    }
  };

  // 옵션 클릭 핸들러
  const handleOptionClick = (option: (typeof preferenceOptions)[0]) => {
    // 선호도 값을 즉시 store에 저장
    setPreferred(option.value);

    // 클릭 횟수 증가
    const newCounts = {
      ...clickCounts,
      [option.subtitle]: (clickCounts[option.subtitle] || 0) + 1,
    };

    setClickCounts(newCounts);

    // localStorage에 클릭 횟수 저장
    localStorage.setItem("preferenceClickCounts", JSON.stringify(newCounts));

    // 가장 많이 클릭된 옵션 업데이트
    updateMostClickedOption(newCounts);

    console.log(
      `${option.subtitle} 클릭됨! 총 ${newCounts[option.subtitle]}번 클릭`
    );
    console.log("현재 클릭 통계:", newCounts);
    console.log(`선택된 교통수단: ${option.value}`);

    // 검색 페이지로 이동
    navigate("/search");
  };

  return (
    <div>
      <Title title="대중교통 선호도 조사" />
      <TitleText>원하는 대중교통을 선택해 보세요!</TitleText>
      <div className=" text-[#A6A6A9] text-[10px]">
        ※ 대중교통 선호도 조사 과정이 끝나면 해당 선호도 조사는 사라집니다.
      </div>

      <div className="flex flex-col gap-[10px] mt-[30px]">
        {preferenceOptions.map((option, index) => (
          <div
            key={index}
            onClick={() => handleOptionClick(option)}
            className="cursor-pointer"
          >
            <SelectBox
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              title={hoveredIndex === index ? option.hoverIcon : option.icon}
              subtitle={`${option.subtitle} ${
                clickCounts[option.subtitle]
                  ? `(${clickCounts[option.subtitle]}번)`
                  : ""
              }`}
              fontSize={option.fontSize}
              left={option.left}
            />
          </div>
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
