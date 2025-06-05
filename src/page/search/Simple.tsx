import InputPlace from "../../components/InputPlace";
import { useNavigate } from "react-router-dom";
import BackIcon from "../../assets/Back.svg?react";
import useLocationStore from "../../store/useLocationStore";
import usePublicStore from "../../store/usePublicStore";
import { useState } from "react";

const Simple = () => {
  const navigate = useNavigate();
  const { start, end } = useLocationStore();
  const {
    filterData,
    selectedCategory,
    selectedRoute,
    setSelectedCategory,
    setSelectedRoute,
    getCurrentRoutes,
  } = usePublicStore();
  const [clickBox, setClickBox] = useState<boolean>(false);

  const simplestart = start;
  const simpleend = end;

  // 시간 포맷팅 함수 (분 -> 시간분)
  const formatTime = (seconds: number) => {
    const totalMinutes = Math.floor(seconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    if (hours > 0) {
      return `${hours}시간 ${remainingMinutes}분`;
    } else {
      return `${totalMinutes}분`;
    }
  };

  // 시간 문자열 포맷팅 (ISO -> HH:MM)
  const formatTimeString = (timeString: string) => {
    try {
      const date = new Date(timeString);
      return date.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    } catch {
      return timeString;
    }
  };

  // 교통수단 아이콘 반환
  const getModeIcon = (mode: string) => {
    switch (mode.toUpperCase()) {
      case "SUBWAY":
        return "🚇 지하철";
      case "BUS":
        return "🚌 버스";
      case "WALK":
        return "🚶 도보";
      default:
        return "🚶 도보";
    }
  };

  // 교통수단별 색상 반환
  const getModeColor = (mode: string) => {
    switch (mode.toUpperCase()) {
      case "SUBWAY":
        return "bg-green-200 text-green-800";
      case "BUS":
        return "bg-blue-200 text-blue-800";
      case "WALK":
        return "bg-gray-200 text-gray-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  // 탭 정보 정의
  const tabs = [
    { key: "recommended", label: "추천" },
    { key: "subwayOnly", label: "지하철" },
    { key: "busOnly", label: "버스" },
  ] as const;

  const subtabs = [
    { key: "minTime", label: "최단시간" },
    { key: "minFare", label: "최저요금" },
    { key: "minTransfer", label: "최소환승" },
  ] as const;

  const currentRoutes = getCurrentRoutes();
  console.log(currentRoutes, "currentRoutes");

  return (
    <div className="w-[100%] flex flex-col h-screen">
      <div className="pt-[20px] pl-[20px] pr-[20px]">
        <div
          className="flex flex-col mt-[24px] justify-between"
          onClick={() => navigate(-1)}
        >
          <BackIcon />
        </div>
        <InputPlace
          width="380px"
          comwidth="300px"
          simplestart={simplestart}
          simpleend={simpleend}
        />
      </div>

      <div className="flex-1 bg-[#ffffff] mt-[20px] rounded-t-[12px] border border-[#B3DBED] hide-scrollbar overflow-y-auto">
        {/* 탭 네비게이션 */}
        <div className="flex flex-col mb-[10px] sticky top-0 bg-white z-10">
          <div className="flex gap-[5px] mb-[5px] pl-[20px] pt-[20px] overflow-x-auto">
            {tabs.map((tab) => (
              <div
                key={tab.key}
                onClick={() => setSelectedCategory(tab.key)}
                className={`px-[12px] py-[8px] text-[12px] rounded-[15px] transition-colors cursor-pointer ${
                  selectedCategory === tab.key
                    ? "text-[#4F94BF] font-bold "
                    : "text-gray-600 border-transparent bg-white hover:border-[#4F94BF] hover:shadow-sm hover:rounded-[15px]"
                }`}
              >
                {tab.label}
              </div>
            ))}
          </div>
          <div className="w-[100%] h-[1px] bg-gray-200" />
          <div className="flex gap-[10px] pl-[20px] pt-[10px] pb-[10px] overflow-x-auto">
            {subtabs.map((subtab) => (
              <div
                key={subtab.key}
                onClick={() => setSelectedCategory(subtab.key)}
                className={`px-[12px] py-[8px] text-[12px] w-auto bg-[#ffffff] border border-gray-200 rounded-[15px] cursor-pointer ${
                  selectedCategory === subtab.key
                    ? "text-[#ffffff] font-bold border-[#4F94BF] bg-[#61AFFE]"
                    : "text-gray-600"
                }`}
              >
                {subtab.label}
              </div>
            ))}
          </div>
        </div>
        {/* 스크롤바 숨기기 위한 스타일 */}
        <style>
          {`
          .hide-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;  /* Chrome, Safari and Opera */
          }
        `}
        </style>
        {/* 경로 리스트 */}
        {filterData && currentRoutes.length > 0 ? (
          <div className="flex flex-col gap-[15px] pl-[20px] pr-[20px] pt-[10px] pb-[40px]">
            {currentRoutes.map((route, index) => (
              <div
                key={index}
                className={`border border-gray-200 rounded-[8px] p-[15px] cursor-pointer ${
                  selectedRoute === route
                    ? "border-[#4F94BF] bg-blue-50"
                    : "hover:bg-[#F5F5F5]"
                }`}
                onClick={() => {
                  setSelectedRoute(route);
                  setClickBox(!clickBox);
                }}
              >
                {clickBox === false ? (
                  // 간단한 뷰 (clickBox가 false일 때)
                  <>
                    <div className="flex justify-between items-center mb-[10px]">
                      <div className="flex flex-col text-[16px] font-bold text-[#333]">
                        {formatTime(route.totalTime)}
                        <div className="text-[12px] text-gray-500 font-normal">
                          도착 시간{formatTimeString(route.arrivalTime)}
                        </div>
                      </div>
                      <div className="text-[12px] text-gray-500">
                        도보 {route.totalWalkDistance}m
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-[5px] items-center">
                      {route.legs.map((leg, legIndex) => (
                        <div key={legIndex} className="flex items-center">
                          <span
                            className={`text-[12px] px-[6px] py-[2px] rounded ${getModeColor(
                              leg.mode
                            )}`}
                          >
                            {getModeIcon(leg.mode)} {leg.route}
                            {leg.mode.toUpperCase() === "WALK" &&
                              ` ${Math.round(leg.distance)}m`}
                          </span>
                          {legIndex < route.legs.length - 1 && (
                            <span className="mx-[3px] text-gray-400">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  // 상세한 뷰 (clickBox가 true일 때)
                  <>
                    <div className="flex justify-between items-center mb-[10px]">
                      <div className="text-[16px] font-bold text-[#333]">
                        {formatTime(route.totalTime)}
                      </div>
                      <div className="text-[12px] text-gray-500">
                        도보 {route.totalWalkDistance}m
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-[15px]">
                      <div className="text-[14px] text-gray-600">
                        출발: {formatTimeString(route.departureTime)}
                      </div>
                      <div className="h-[1px] flex-1 mx-[8px] bg-[#90CB13]" />
                      <div className="text-[14px] text-gray-600">
                        도착: {formatTimeString(route.arrivalTime)}
                      </div>
                    </div>

                    {/* 상세 경로 정보 */}
                    <div className="space-y-[10px] ">
                      {route.legs.map((leg, legIndex) => (
                        <div
                          key={legIndex}
                          className="bg-gray-50 p-[12px] rounded-[6px]"
                        >
                          <div className=" w-[auto] flex items-center justify-between mb-[8px]">
                            <div className="flex items-center gap-[8px]">
                              <span className="text-[16px]">
                                {getModeIcon(leg.mode)}
                              </span>
                              <span className="text-[14px] font-medium">
                                {leg.route}
                              </span>
                            </div>
                            <div className="h-[1px] flex-1 mx-[8px] bg-gray-400" />
                            <span className=" w-[auto] text-[12px] text-gray-500">
                              {formatTime(leg.sectionTime)}
                            </span>
                          </div>

                          <div className="text-[14px] text-gray-600 font-bold mb-[5px]">
                            {leg.startName} → {leg.endName}
                          </div>

                          {leg.stations && leg.stations.length > 0 && (
                            <div className="text-[11px] text-gray-500">
                              정거장 {leg.stationCount}개:{" "}
                              {leg.stations.join(", ")}
                            </div>
                          )}

                          {leg.descriptions && leg.descriptions.length > 0 && (
                            <div className="text-[11px] mt-[5px] space-y-1">
                              <div className="flex items-center justify-between">
                                <div className=" mt-[5px] text-[14px] text-[#61AFFE] font-bold">
                                  길안내
                                </div>
                                <div className="h-[1px] flex-1 ml-[8px] mt-[3px] bg-[#61AFFE]" />
                              </div>
                              {leg.descriptions.map(
                                (description, descIndex) => (
                                  <div
                                    key={descIndex}
                                    className=" px-2 py-1 rounded text-[12px]"
                                  >
                                    {descIndex + 1}. {description}
                                  </div>
                                )
                              )}
                            </div>
                          )}

                          <div className="text-[11px] text-gray-400 mt-[5px]">
                            거리: {leg.distance}m
                            {leg.predictTime &&
                              ` | 예상시간: ${leg.predictTime}`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-[50px] pl-[20px] pr-[20px]">
            {filterData
              ? "해당 조건의 경로가 없습니다."
              : "경로 정보가 없습니다."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Simple;
