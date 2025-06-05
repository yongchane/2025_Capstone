import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import InputPlace from "../../components/InputPlace";

import BackIcon from "../../assets/Back.svg?react";
import LocationIcon from "../../assets/Location.svg?react";
import ClockIcon from "../../assets/Clock.svg?react";

import useLocationStore from "../../store/useLocationStore";
import usePublicStore from "../../store/usePublicStore";

import { getCurrentPosition } from "../../api/locationApi";
import kakaoLocationAPI from "../../api/KakaoLocation";
import { KakaoPlace } from "../../api/KakaoLocation";
import TmapClickAPI from "../../api/TmapClickAPI";
import FilterTransit from "../../api/FilterTransit";

const Search = () => {
  const navigate = useNavigate();
  const [SearchEnd, setSearchEnd] = useState<string>("");
  const [SearchStart, setSearchStart] = useState<string>("");
  const [showHistory, setShowHistory] = useState<string>("기록");
  const [startSearchResults, setStartSearchResults] = useState<KakaoPlace[]>(
    []
  ); // 출발지 검색 결과
  const [endSearchResults, setEndSearchResults] = useState<KakaoPlace[]>([]); // 목적지 검색 결과
  const { searchHistory } = useLocationStore();
  const { setFilterData, setTmapRoutes } = usePublicStore();
  const {
    clearHistory,
    removeFromHistory,
    setEnd,
    setStart,
    setXlocation,
    setYlocation,
    start: searchStart,
    end: searchEndValue,
    click,
    startX,
    startY,
    endX,
    endY,
    preferred,
    setStartX,
    setStartY,
    setEndX,
    setEndY,
  } = useLocationStore();

  // 입력 시 검색 결과 가져오기
  useEffect(() => {
    const searchLocation = async (query: string, type: "start" | "end") => {
      if (!query.trim()) {
        if (type === "start") {
          setStartSearchResults([]);
        } else {
          setEndSearchResults([]);
        }
        return;
      }

      try {
        const result = await kakaoLocationAPI.searchByKeyword({
          query: query,
          size: 5,
        });

        if (type === "start") {
          setStartSearchResults(result.documents);
        } else {
          setEndSearchResults(result.documents);
        }
        console.log(`${type} 검색 결과:`, result.documents);
      } catch (error) {
        console.error(`${type} 검색 실패:`, error);
        if (type === "start") {
          setStartSearchResults([]);
        } else {
          setEndSearchResults([]);
        }
      }
    };

    if (searchStart) {
      searchLocation(searchStart, "start");
    }
    if (searchEndValue) {
      searchLocation(searchEndValue, "end");
    }
  }, [searchStart, searchEndValue]);

  const handleLocationClick = (location: string) => {
    if (click === "출발") {
      setStart(location);
    } else if (click === "목적지") {
      setEnd(location);
      setSearchEnd(location);
    }
  };

  const handleSimpleEndProcessed = () => {
    setSearchEnd("");
  };

  const handleSimpleStartProcessed = () => {
    setSearchStart("");
  };

  const handleInputPlaceClick = () => {
    setShowHistory(click);
    console.log("click", click, "showHistory", showHistory);
  };

  const handleDeleteClick = (e: React.MouseEvent, location: string) => {
    e.stopPropagation();
    removeFromHistory(location);
  };

  // 현재 위치 가져오기
  const handleCurrentLocation = async () => {
    try {
      const position = await getCurrentPosition();
      const xlocation = Number(position.latitude.toFixed(6));
      const ylocation = Number(position.longitude.toFixed(6));
      setXlocation(xlocation);
      setYlocation(ylocation);
      console.log(xlocation, ylocation, "현재 위치");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("위치 정보를 가져오는 중 오류가 발생했습니다.");
      }
    }
  };

  const handleSearchResultClick = (place: KakaoPlace) => {
    if (click === "출발") {
      setStart(place.place_name);
      setSearchStart(place.place_name);
      const newStartX = Number(place.x);
      const newStartY = Number(place.y);
      setStartX(newStartX);
      setStartY(newStartY);
    } else if (click === "목적지") {
      setEnd(place.place_name);
      setSearchEnd(place.place_name);
      const newEndX = Number(place.x);
      const newEndY = Number(place.y);
      setEndX(newEndX);
      setEndY(newEndY);
    }
    setShowHistory("기록");
  };

  // TmapClickAPI 호출 함수
  const handleTmapSearch = async () => {
    // 필수 좌표값들이 모두 있는지 확인
    console.log(
      startX,
      startY,
      endX,
      endY,
      "좌표값",
      preferred,
      "대중교통 선호도 확인"
    );
    if (startX === null || startY === null || endX === null || endY === null) {
      alert("출발지와 목적지의 좌표 정보가 필요합니다.");
      return;
    }

    // preferred 값이 설정되었는지 확인
    if (!preferred || preferred.trim() === "") {
      alert("대중교통 선호도를 먼저 설정해주세요.");
      navigate("/preference");
      return;
    }

    try {
      const response = await TmapClickAPI({
        startX,
        startY,
        endX,
        endY,
        preferred: preferred,
      });
      const filterResponse = await FilterTransit({
        startX,
        startY,
        endX,
        endY,
      });

      console.log(
        "TmapClickAPI 응답:",
        response,
        "FilterTransit 응답:",
        filterResponse
      );

      // 두 API 응답 모두 store에 저장
      if (response && Array.isArray(response)) {
        setTmapRoutes(response);
      }

      if (filterResponse) {
        setFilterData(filterResponse);
        // Simple 페이지로 이동
        navigate("/simple");
      } else {
        alert("경로 정보를 불러올 수 없습니다.");
      }
    } catch (error) {
      console.error("TmapClickAPI 호출 실패:", error);
      alert("경로 검색에 실패했습니다.");
    }
  };

  return (
    <div>
      <div
        className="flex flex-col mt-[24px] justify-between"
        onClick={() => navigate(-1)}
      >
        <BackIcon />
      </div>
      <InputPlace
        width="380px"
        comwidth="300px"
        paths="/simple"
        simpleend={SearchEnd}
        simplestart={SearchStart}
        onSimpleEndProcessed={handleSimpleEndProcessed}
        onSimpleStartProcessed={handleSimpleStartProcessed}
        onClick={handleInputPlaceClick}
        onSearchClick={handleTmapSearch}
      />
      {showHistory === "기록" ? (
        <div className="flex flex-col mt-[30px] relative">
          <div
            className="absolute right-0 hover:cursor-pointer flex items-center gap-[5px] text-[#4F94BF]"
            onClick={handleCurrentLocation}
          >
            <LocationIcon /> 현위치
          </div>
          <div className="flex justify-between items-center mt-[50px] w-[100%] h-[30px]">
            <div className="text-[16px] font-bold">최근기록</div>
            {searchHistory.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-sm text-gray-500 hover:text-gray-700 border-none outline-none bg-[#ffffff]"
              >
                전체 삭제
              </button>
            )}
          </div>
          <div className="mt-[16px] flex flex-col gap-[12px]">
            {searchHistory.length !== 0 ? (
              searchHistory.map((location, index) => (
                <div
                  key={index}
                  className="flex items-center pl-[5px] pr-[5px] pt-[12px] pb-[12px] hover:bg-gray-100 rounded-md cursor-pointer"
                  onClick={() => handleLocationClick(location)}
                >
                  <ClockIcon />
                  <span className="w-[95%] pl-[5%]">{location}</span>
                  <button
                    onClick={(e) => handleDeleteClick(e, location)}
                    className="px-2 border-none outline-none bg-[#ffffff]"
                  >
                    ✕
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">
                최근기록이 없습니다.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col mt-[30px] relative">
          <div className="text-[16px] font-bold mb-[16px]">
            {click === "출발" ? "출발지 검색 결과" : "목적지 검색 결과"}
          </div>
          <div className="flex flex-col gap-[12px]">
            {click === "출발" ? (
              startSearchResults.length > 0 ? (
                startSearchResults.map((place, index) => (
                  <div
                    key={place.id || index}
                    className="flex flex-col p-[12px] hover:bg-gray-100 rounded-md cursor-pointer border border-gray-200"
                    onClick={() => handleSearchResultClick(place)}
                  >
                    <div className="font-bold text-[16px] text-[#333]">
                      {place.place_name}
                    </div>
                    <div className="text-[14px] text-gray-600 mt-[4px]">
                      {place.address_name}
                    </div>
                    <div className="text-[12px] text-gray-500 mt-[2px]">
                      {place.category_name}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">
                  출발지 검색 결과가 없습니다.
                </div>
              )
            ) : endSearchResults.length > 0 ? (
              endSearchResults.map((place, index) => (
                <div
                  key={place.id || index}
                  className="flex flex-col p-[12px] hover:bg-gray-100 rounded-md cursor-pointer border border-gray-200"
                  onClick={() => handleSearchResultClick(place)}
                >
                  <div className="font-bold text-[16px] text-[#333]">
                    {place.place_name}
                  </div>
                  <div className="text-[14px] text-gray-600 mt-[4px]">
                    {place.address_name}
                  </div>
                  <div className="text-[12px] text-gray-500 mt-[2px]">
                    {place.category_name}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">
                목적지 검색 결과가 없습니다.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
