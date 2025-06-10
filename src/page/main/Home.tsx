import { useEffect, useState } from "react";
import Title from "../../components/Title";
import InputPlace from "../../components/InputPlace";
import PlaceIcon from "../../assets/Place.svg?react";
import AtPlaceIcon from "../../assets/AtPlace.svg?react";
import SearchIcon from "../../assets/SearchHome.svg?react";
import AtSearchIcon from "../../assets/AtSearchHome.svg?react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
// import BusStop from "./components/BusStop";
import Place from "./components/Place";
import { useFontSize } from "../../context/FontSizeContext";
import { getNickname } from "../../utils/auth";
import { getCurrentPosition } from "../../api/locationApi";
import useLocationStore from "../../store/useLocationStore";
import PlaceAuto from "../../api/PlaceAuto";
import { useInputPlace, usePlaceStore } from "../../store/usePlaceStore";
import PlaceAll from "../../api/PlaceAll";

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
  const { setXlocation, setYlocation, xlocation, ylocation } =
    useLocationStore();
  const { setRecommendPlaces, setHasRecommendation } = usePlaceStore();
  const { setAllPlace } = useInputPlace();

  useEffect(() => {
    handleCurrentLocation();
    // 위치 정보가 이미 있다면 바로 PlaceAll 호출
    if (xlocation !== null && ylocation !== null) {
      handlePlaceAll(xlocation, ylocation);
    }
  }, []);

  // xlocation, ylocation이 변경될 때마다 handlePlaceAll 호출
  useEffect(() => {
    if (xlocation !== null && ylocation !== null) {
      handlePlaceAll(xlocation, ylocation);
    }
  }, [xlocation, ylocation]);

  const handleCurrentLocation = async () => {
    try {
      const position = await getCurrentPosition();
      const xlocation = Number(position.latitude.toFixed(6));
      const ylocation = Number(position.longitude.toFixed(6));
      setXlocation(xlocation);
      setYlocation(ylocation);
      console.log(xlocation, ylocation, "현재 위치");

      // 위치 정보 로드 후 자동으로 PlaceAuto 호출
      await handleAutoRecommend(xlocation, ylocation);
      // handlePlaceAll은 useEffect에서 xlocation, ylocation 변경을 감지해서 자동 호출됨
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("위치 정보를 가져오는 중 오류가 발생했습니다.");
      }
    }
  };

  const handleAutoRecommend = async (xlocation: number, ylocation: number) => {
    try {
      console.log("🏠 Home에서 자동 추천 시작 - 좌표:", xlocation, ylocation);

      const response = await PlaceAuto({ xlocation, ylocation });
      console.log("🏠 Home 자동 추천 응답:", response);

      // 응답 상태 코드가 204가 아닌 경우 (200, 201 등) 추천 데이터 저장
      if (response.status !== 204) {
        console.log("✅ 추천 데이터 저장 - 상태 코드:", response.status);
        setRecommendPlaces(response.data);
        setHasRecommendation(true);
      } else {
        console.log("⚠️ 204 응답 - 추천 데이터 없음");
        setHasRecommendation(false);
      }
    } catch (error) {
      console.error("🏠 Home 자동 추천 실패:", error);
      setHasRecommendation(false);
    }
  };

  const handlePlaceAll = async (xlocation: number, ylocation: number) => {
    try {
      console.log(
        "🏠 Home에서 PlaceAll API 호출 시작 - 좌표:",
        xlocation,
        ylocation
      );
      const response = await PlaceAll({ xlocation, ylocation });
      console.log("🏠 Home PlaceAll API 응답:", response);
      console.log("🏠 Home PlaceAll API 응답 타입:", typeof response);
      console.log(
        "🏠 Home PlaceAll API 응답 배열 확인:",
        Array.isArray(response)
      );

      if (response && Array.isArray(response) && response.length > 0) {
        console.log("✅ setAllPlace 호출 전 - 데이터:", response);
        setAllPlace(response);
        console.log("✅ setAllPlace 호출 완료 - 개수:", response.length);
        console.log("✅ 첫 번째 데이터 샘플:", response[0]);
      } else {
        console.log("⚠️ PlaceAll API 응답이 비어있거나 잘못된 형식");
        console.log("⚠️ 응답 세부사항:", {
          response,
          isArray: Array.isArray(response),
          length: response?.length,
        });
      }
    } catch (error) {
      console.error("🏠 Home PlaceAll API 호출 실패:", error);
    }
  };

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
          {/* <BusStop /> */}
          <Place isHome={true} />
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
