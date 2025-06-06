import InputPlace from "../../components/InputPlace";
import { useNavigate } from "react-router-dom";
import BackIcon from "../../assets/Back.svg?react";
import useLocationStore from "../../store/useLocationStore";
import usePublicStore, {
  FilterTransitResponse,
} from "../../store/usePublicStore";
import { useState, useEffect } from "react";
import TmapAuto from "../../api/TmapAuto";

const Simple = () => {
  const navigate = useNavigate();
  const { start, end, setPreferred, startX, startY, endX, endY } =
    useLocationStore();
  const {
    filterData,
    selectedCategory,
    selectedRoute,
    setSelectedCategory,
    setSelectedRoute,
    getCurrentRoutes,
  } = usePublicStore();
  const [clickBox, setClickBox] = useState<boolean>(false);
  const [tabClickCounts, setTabClickCounts] = useState<{
    [key: string]: number;
  }>({});
  const [showCustomRoute, setShowCustomRoute] = useState<boolean>(false);
  const [customRouteData, setCustomRouteData] = useState<unknown>(null);
  const [showOriginalTabs, setShowOriginalTabs] = useState<boolean>(false);

  const simplestart = start;
  const simpleend = end;

  // 컴포넌트 마운트 시 TmapAuto API 호출
  useEffect(() => {
    const callTmapAuto = async () => {
      if (
        startX !== null &&
        startY !== null &&
        endX !== null &&
        endY !== null
      ) {
        try {
          console.log("TmapAuto API 호출 시작...");
          const response = await TmapAuto({
            startX,
            startY,
            endX,
            endY,
          });

          // 응답이 있으면 200 상태로 처리
          console.log("TmapAuto API 응답 (200):", response);
          setCustomRouteData(response);
          setShowCustomRoute(true);
        } catch (error: unknown) {
          console.log("TmapAuto API 에러:", error);

          // 204 상태 코드 확인
          if (
            error &&
            typeof error === "object" &&
            "response" in error &&
            error.response &&
            typeof error.response === "object" &&
            "status" in error.response &&
            error.response.status === 204
          ) {
            console.log(
              "TmapAuto API 응답 (204): 데이터 없음 - 기존 화면 유지"
            );
            setShowCustomRoute(false);
          } else {
            console.error("TmapAuto API 실패:", error);
            setShowCustomRoute(false);
          }
        }
      }
    };

    callTmapAuto();
  }, [startX, startY, endX, endY]);

  // localStorage에서 탭 클릭 횟수 불러오기
  useEffect(() => {
    const savedTabCounts = localStorage.getItem("tabClickCounts");
    if (savedTabCounts) {
      const parsedCounts = JSON.parse(savedTabCounts);
      setTabClickCounts(parsedCounts);
      // 종합 선호도 분석 실행
      analyzeComprehensivePreference(parsedCounts);
    }
  }, []);

  // Preference와 Simple 탭 데이터를 종합 분석하는 함수
  const analyzeComprehensivePreference = (currentTabCounts: {
    [key: string]: number;
  }) => {
    // Preference 컴포넌트의 클릭 데이터 가져오기
    const preferenceData = localStorage.getItem("preferenceClickCounts");
    let preferenceClickCounts = {};

    if (preferenceData) {
      preferenceClickCounts = JSON.parse(preferenceData);
    }

    console.log("=== 종합 선호도 분석 시작 ===");
    console.log("Preference 데이터:", preferenceClickCounts);
    console.log("Simple 탭 데이터:", currentTabCounts);

    // 1. Preference에서 가장 선호하는 교통수단 찾기
    const topTransportMode = getTopPreference(preferenceClickCounts);

    // 2. Simple에서 가장 선호하는 탭 유형 찾기
    const topTabPreference = getTopPreference(currentTabCounts);

    // 3. 두 선호도를 조합한 종합 결과 생성
    const comprehensiveResult = generateComprehensivePreference(
      topTransportMode,
      topTabPreference,
      preferenceClickCounts,
      currentTabCounts
    );

    // 4. 최종 선호도 저장
    if (comprehensiveResult) {
      setPreferred(comprehensiveResult);
      console.log("=== 최종 종합 선호도 ===");
      console.log("설정된 선호도:", comprehensiveResult);

      // 종합 결과를 별도 localStorage에도 저장
      const analysisResult = {
        transportMode: topTransportMode,
        tabPreference: topTabPreference,
        comprehensiveResult,
        timestamp: new Date().toISOString(),
        preferenceScores: preferenceClickCounts,
        tabScores: currentTabCounts,
      };
      localStorage.setItem(
        "comprehensivePreferenceAnalysis",
        JSON.stringify(analysisResult)
      );
    }
  };

  // 가장 높은 점수의 선호도 찾기
  const getTopPreference = (counts: { [key: string]: number }) => {
    if (!counts || Object.keys(counts).length === 0) return null;

    const maxCount = Math.max(...Object.values(counts));
    return Object.keys(counts).find((key) => counts[key] === maxCount) || null;
  };

  // 두 선호도를 조합해서 종합 결과 생성
  const generateComprehensivePreference = (
    transportMode: string | null,
    tabPreference: string | null,
    preferenceScores: { [key: string]: number },
    tabScores: { [key: string]: number }
  ) => {
    // 점수 기반 가중치 계산
    const transportWeight = transportMode
      ? preferenceScores[transportMode] || 0
      : 0;
    const tabWeight = tabPreference ? tabScores[tabPreference] || 0 : 0;

    console.log(`교통수단 선호: ${transportMode} (${transportWeight}점)`);
    console.log(`탭 선호: ${tabPreference} (${tabWeight}점)`);

    // 조합 로직
    if (!transportMode && !tabPreference) {
      return "데이터 부족"; // 둘 다 없으면 기본값
    }

    if (!transportMode) {
      return tabPreference; // 교통수단 선호가 없으면 탭 선호만
    }

    if (!tabPreference) {
      return transportMode; // 탭 선호가 없으면 교통수단 선호만
    }

    // 둘 다 있을 때 조합 전략
    const combinations = {
      // 교통수단 + 탭 선호 조합
      "버스+추천": "버스 추천 경로",
      "버스+최단시간": "버스 최단시간",
      "버스+최저요금": "버스 최저요금",
      "버스+최소환승": "버스 최소환승",
      "지하철+추천": "지하철 추천 경로",
      "지하철+최단시간": "지하철 최단시간",
      "지하철+최저요금": "지하철 최저요금",
      "지하철+최소환승": "지하철 최소환승",
      "버스+지하철+추천": "대중교통 추천 경로",
      "버스+지하철+최단시간": "대중교통 최단시간",
      "버스+지하철+최저요금": "대중교통 최저요금",
      "버스+지하철+최소환승": "대중교통 최소환승",
    };

    const combinationKey = `${transportMode}+${tabPreference}`;
    const result = combinations[combinationKey as keyof typeof combinations];

    if (result) {
      return result;
    }

    // 조합이 없으면 가중치가 높은 것 선택
    if (transportWeight >= tabWeight) {
      return `${transportMode} 우선`;
    } else {
      return `${tabPreference} 우선`;
    }
  };

  // 탭 클릭 핸들러 (종합 분석 추가)
  const handleTabClick = (tabKey: string, tabLabel: string) => {
    // 기존 카테고리 설정
    setSelectedCategory(tabKey as keyof FilterTransitResponse);

    // 클릭 횟수 증가
    const newCounts = {
      ...tabClickCounts,
      [tabLabel]: (tabClickCounts[tabLabel] || 0) + 1,
    };

    setTabClickCounts(newCounts);

    // localStorage에 클릭 횟수 저장
    localStorage.setItem("tabClickCounts", JSON.stringify(newCounts));

    // 클릭할 때마다 종합 분석 실행
    analyzeComprehensivePreference(newCounts);

    console.log(`${tabLabel} 탭 클릭됨! 총 ${newCounts[tabLabel]}번 클릭`);
    console.log("현재 탭 클릭 통계:", newCounts);
  };

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
        {/* 맞춤형 경로 표시 (TmapAuto 200 응답시) */}
        {showCustomRoute && customRouteData ? (
          <div className="flex flex-col">
            {/* 맞춤형 경로 헤더 */}
            <div className="flex items-center justify-between px-[20px] py-[15px] sticky top-0 bg-white z-10 border-b border-gray-200">
              <div className="flex items-center gap-[10px]">
                <h3 className="text-[16px] font-bold text-[#4F94BF]">
                  🎯 맞춤형 경로
                </h3>
                <span className="text-[12px] text-gray-500 bg-green-100 px-[8px] py-[2px] rounded-full">
                  AI 추천
                </span>
              </div>
              <button
                onClick={() => setShowOriginalTabs(!showOriginalTabs)}
                className="w-[30px] h-[30px] bg-[#4F94BF] text-white rounded-full flex items-center justify-center hover:bg-[#3d7ba3] transition-colors"
              >
                {showOriginalTabs ? "−" : "+"}
              </button>
            </div>

            {/* 맞춤형 경로 내용 */}
            <div className="px-[20px] py-[15px]">
              <div className="bg-blue-50 border border-blue-200 rounded-[8px] p-[15px]">
                <h4 className="text-[14px] font-bold text-[#333] mb-[10px]">
                  TmapAuto 응답 데이터:
                </h4>
                <pre className="text-[12px] text-gray-700 whitespace-pre-wrap overflow-x-auto bg-white p-[10px] rounded border">
                  {JSON.stringify(customRouteData, null, 2)}
                </pre>
              </div>
            </div>

            {/* + 버튼 클릭시 기존 탭 네비게이션 표시 */}
            {showOriginalTabs && (
              <div className="border-t border-gray-200">
                {/* 기존 탭 네비게이션 */}
                <div className="flex flex-col mb-[10px] sticky top-0 bg-white z-10">
                  <div className="flex gap-[5px] mb-[5px] pl-[20px] pt-[20px] overflow-x-auto">
                    {tabs.map((tab) => (
                      <div
                        key={tab.key}
                        onClick={() => handleTabClick(tab.key, tab.label)}
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
                        onClick={() => handleTabClick(subtab.key, subtab.label)}
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

                {/* 기존 경로 리스트 */}
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
                                <div
                                  key={legIndex}
                                  className="flex items-center"
                                >
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
                                    <span className="mx-[3px] text-gray-400">
                                      →
                                    </span>
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

                                  {leg.descriptions &&
                                    leg.descriptions.length > 0 && (
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
            )}
          </div>
        ) : (
          // 기존 탭 네비게이션 (TmapAuto가 204이거나 실패했을 때)
          <>
            {/* 탭 네비게이션 */}
            <div className="flex flex-col mb-[10px] sticky top-0 bg-white z-10">
              <div className="flex gap-[5px] mb-[5px] pl-[20px] pt-[20px] overflow-x-auto">
                {tabs.map((tab) => (
                  <div
                    key={tab.key}
                    onClick={() => handleTabClick(tab.key, tab.label)}
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
                    onClick={() => handleTabClick(subtab.key, subtab.label)}
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
                                <span className="mx-[3px] text-gray-400">
                                  →
                                </span>
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

                              {leg.descriptions &&
                                leg.descriptions.length > 0 && (
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
          </>
        )}
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
      </div>
    </div>
  );
};

export default Simple;
