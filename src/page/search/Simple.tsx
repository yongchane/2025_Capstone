import InputPlace from "../../components/InputPlace";
import { useNavigate } from "react-router-dom";
import BackIcon from "../../assets/Back.svg?react";
import useLocationStore from "../../store/useLocationStore";
import usePublicStore from "../../store/usePublicStore";

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

  const simplestart = start;
  const simpleend = end;

  // 시간 포맷팅 함수 (분 -> 시간분)
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}시간 ${mins}분`;
    }
    return `${mins}분`;
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
        return "🚇";
      case "BUS":
        return "🚌";
      case "WALK":
        return "🚶";
      default:
        return "🚶";
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
    { key: "minTime", label: "최단시간" },
    { key: "minFare", label: "최저요금" },
    { key: "minTransfer", label: "최소환승" },
  ] as const;

  const currentRoutes = getCurrentRoutes();

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

      <div className="flex-1 bg-[#ffffff] mt-[20px] rounded-t-[12px] border border-[#B3DBED] p-[20px]">
        {/* 탭 네비게이션 */}
        <div className="flex gap-[5px] mb-[20px] border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedCategory(tab.key)}
              className={`px-[12px] py-[8px] text-[12px] border-none outline-none bg-transparent whitespace-nowrap ${
                selectedCategory === tab.key
                  ? "text-[#4F94BF] border-b-2 border-[#4F94BF] font-bold"
                  : "text-gray-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 경로 리스트 */}
        {filterData && currentRoutes.length > 0 ? (
          <div className="flex flex-col gap-[15px]">
            {currentRoutes.map((route, index) => (
              <div
                key={index}
                className={`border border-gray-200 rounded-[8px] p-[15px] cursor-pointer ${
                  selectedRoute === route
                    ? "border-[#4F94BF] bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedRoute(route)}
              >
                {/* 경로 헤더 정보 */}
                <div className="flex justify-between items-center mb-[10px]">
                  <div className="text-[16px] font-bold text-[#333]">
                    {formatTime(route.totalTime)}
                  </div>
                  <div className="text-[12px] text-gray-500">
                    도보 {route.totalWalkDistance}m
                  </div>
                </div>

                <div className="flex justify-between items-center mb-[10px]">
                  <div className="text-[14px] text-gray-600">
                    출발: {formatTimeString(route.departureTime)}
                  </div>
                  <div className="text-[14px] text-gray-600">
                    도착: {formatTimeString(route.arrivalTime)}
                  </div>
                </div>

                {/* 경로 상세 정보 */}
                <div className="flex flex-wrap gap-[5px] items-center">
                  {route.legs.map((leg, legIndex) => (
                    <div key={legIndex} className="flex items-center">
                      <span
                        className={`text-[12px] px-[6px] py-[2px] rounded ${getModeColor(
                          leg.mode
                        )}`}
                      >
                        {getModeIcon(leg.mode)} {leg.route || leg.mode}
                        {leg.mode.toUpperCase() === "WALK" &&
                          ` ${Math.round(leg.distance)}m`}
                      </span>
                      {legIndex < route.legs.length - 1 && (
                        <span className="mx-[3px] text-gray-400">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-[50px]">
            {filterData
              ? "해당 조건의 경로가 없습니다."
              : "경로 정보가 없습니다."}
          </div>
        )}

        {/* 선택된 경로의 상세 정보 */}
        {selectedRoute && (
          <div className="mt-[30px] p-[20px] bg-gray-50 rounded-[8px]">
            <h3 className="text-[16px] font-bold mb-[15px]">경로 상세 정보</h3>

            <div className="space-y-[10px]">
              {selectedRoute.legs.map((leg, index) => (
                <div key={index} className="bg-white p-[15px] rounded-[8px]">
                  <div className="flex items-center justify-between mb-[8px]">
                    <div className="flex items-center gap-[8px]">
                      <span className="text-[16px]">
                        {getModeIcon(leg.mode)}
                      </span>
                      <span className="text-[14px] font-medium">
                        {leg.route || leg.mode}
                      </span>
                    </div>
                    <span className="text-[12px] text-gray-500">
                      {formatTime(leg.sectionTime)}
                    </span>
                  </div>

                  <div className="text-[12px] text-gray-600 mb-[5px]">
                    {leg.startName} → {leg.endName}
                  </div>

                  {leg.stations && leg.stations.length > 0 && (
                    <div className="text-[11px] text-gray-500">
                      정거장 {leg.stationCount}개: {leg.stations.join(", ")}
                    </div>
                  )}

                  {leg.descriptions && leg.descriptions.length > 0 && (
                    <div className="text-[11px] text-blue-600 mt-[5px]">
                      {leg.descriptions.join(" | ")}
                    </div>
                  )}

                  <div className="text-[11px] text-gray-400 mt-[5px]">
                    거리: {leg.distance}m
                    {leg.predictTime && ` | 예상시간: ${leg.predictTime}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Simple;
