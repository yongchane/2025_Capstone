import InputPlace from "../../components/InputPlace";
import { useNavigate } from "react-router-dom";
import BackIcon from "../../assets/Back.svg?react";
import useLocationStore from "../../store/useLocationStore";
import usePublicStore from "../../store/usePublicStore";
import { useState } from "react";

const Simple = () => {
  const navigate = useNavigate();
  const { start, end } = useLocationStore();
  const { routes, selectedRoute, routeCategories, setSelectedRoute } =
    usePublicStore();
  const [selectedTab, setSelectedTab] = useState<
    "전체" | "버스" | "지하철" | "버스 + 지하철"
  >("전체");
  const simplestart = start;
  const simpleend = end;

  // 시간 포맷팅 함수 (분 -> 시간분)
  const formatTime = (minutes: number) => {
    const mins = Math.floor(minutes / 60);
    const hours = Math.floor(mins / 60);
    if (mins < 60) {
      return `${mins}분`;
    }
    return `${hours}시간 ${mins}분`;
  };

  // 시간 문자열 포맷팅 (ISO -> HH:MM)
  const formatTimeString = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

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
        <div className="flex gap-[10px] mb-[20px] border-b border-gray-200">
          {["전체", "버스", "지하철", "버스 + 지하철"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab as typeof selectedTab)}
              className={`px-[15px] py-[10px] text-[14px] border-none outline-none bg-transparent ${
                selectedTab === tab
                  ? "text-[#4F94BF] border-b-2 border-[#4F94BF] font-bold"
                  : "text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 경로 리스트 */}
        {routes.length > 0 ? (
          <div className="flex flex-col gap-[15px]">
            {routes.map((route, index) => (
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
                      {leg.mode === "WALK" && (
                        <span className="text-[12px] bg-gray-200 px-[6px] py-[2px] rounded">
                          도보 {Math.round(leg.distance)}m
                        </span>
                      )}
                      {leg.mode === "SUBWAY" && (
                        <span className="text-[12px] bg-green-200 text-green-800 px-[6px] py-[2px] rounded">
                          🚇 {leg.route || "지하철"}
                        </span>
                      )}
                      {leg.mode === "BUS" && (
                        <span className="text-[12px] bg-blue-200 text-blue-800 px-[6px] py-[2px] rounded">
                          🚌 {leg.route || "버스"}
                        </span>
                      )}
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
            경로 정보가 없습니다.
          </div>
        )}

        {/* 선택된 경로의 카테고리별 상세 정보 */}
        {selectedRoute &&
          (selectedTab === "지하철" ||
            selectedTab === "버스" ||
            selectedTab === "버스 + 지하철") && (
            <div className="mt-[30px] p-[20px] bg-gray-50 rounded-[8px]">
              <h3 className="text-[16px] font-bold mb-[15px]">
                {selectedTab} 상세 정보
              </h3>

              {selectedTab === "지하철" &&
                routeCategories.subway.length > 0 && (
                  <div className="mb-[15px]">
                    <h4 className="text-[14px] font-bold text-green-800 mb-[8px]">
                      🚇 지하철 구간
                    </h4>
                    {routeCategories.subway.map((leg, index) => (
                      <div
                        key={index}
                        className="bg-white p-[10px] rounded mb-[5px]"
                      >
                        <div className="text-[14px] font-medium">
                          {leg.route || "지하철"}
                        </div>
                        <div className="text-[12px] text-gray-600">
                          {leg.startName} · {formatTime(leg.sectionTime)} ·{" "}
                          {leg.distance}m
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              {selectedTab === "버스" && routeCategories.bus.length > 0 && (
                <div className="mb-[15px]">
                  <h4 className="text-[14px] font-bold text-blue-800 mb-[8px]">
                    🚌 버스 구간
                  </h4>
                  {routeCategories.bus.map((leg, index) => (
                    <div
                      key={index}
                      className="bg-white p-[10px] rounded mb-[5px]"
                    >
                      <div className="text-[14px] font-medium">
                        {leg.route || "버스"}
                      </div>
                      <div className="text-[12px] text-gray-600">
                        {leg.startName} · {formatTime(leg.sectionTime)} ·{" "}
                        {leg.distance}m
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedTab === "버스 + 지하철" && (
                <div>
                  {routeCategories.subway.length > 0 && (
                    <div className="mb-[15px]">
                      <h4 className="text-[14px] font-bold text-green-800 mb-[8px]">
                        🚇 지하철 구간
                      </h4>
                      {routeCategories.subway.map((leg, index) => (
                        <div
                          key={index}
                          className="bg-white p-[10px] rounded mb-[5px]"
                        >
                          <div className="text-[14px] font-medium">
                            {leg.route || "지하철"}
                          </div>
                          <div className="text-[12px] text-gray-600">
                            {leg.startName} · {formatTime(leg.sectionTime)} ·{" "}
                            {leg.distance}m
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {routeCategories.bus.length > 0 && (
                    <div className="mb-[15px]">
                      <h4 className="text-[14px] font-bold text-blue-800 mb-[8px]">
                        🚌 버스 구간
                      </h4>
                      {routeCategories.bus.map((leg, index) => (
                        <div
                          key={index}
                          className="bg-white p-[10px] rounded mb-[5px]"
                        >
                          <div className="text-[14px] font-medium">
                            {leg.route || "버스"}
                          </div>
                          <div className="text-[12px] text-gray-600">
                            {leg.startName} · {formatTime(leg.sectionTime)} ·{" "}
                            {leg.distance}m
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
      </div>
    </div>
  );
};

export default Simple;
