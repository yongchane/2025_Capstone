import styled from "@emotion/styled";
import BackIcon from "../../assets/back.svg?react";
import PlaceBox from "./components/PlaceBox";
import Category from "./components/Category";
import SearchIcon from "../../assets/Search.svg?react";
import { useNavigate } from "react-router-dom";
import useLocationStore from "../../store/useLocationStore";
import { SearchRestaurant, SearchCafe, SearchBar } from "../../api/SearchPlace";
import { useEffect, useState } from "react";
import { usePlaceStore } from "../../store/usePlaceStore";
import { useInputPlace } from "../../store/usePlaceStore";
import SearchRecommend from "../../api/SearchRecommend";
import PlaceAuto from "../../api/PlaceAuto";
import PlaceSearch from "./PlaceSearch";
const Place = () => {
  const navigate = useNavigate();
  const { xlocation, ylocation } = useLocationStore();
  const { restaurant, cafe, bar, setRestaurant, setCafe, setBar } =
    usePlaceStore();
  const { changeView, setChangeView, setInputPlace } = useInputPlace();
  const [searchInput, setSearchInput] = useState<string>("");

  console.log(xlocation, ylocation, "xlocation, ylocation");

  // 페이지 진입 시 초기화
  useEffect(() => {
    setChangeView(false); // changeView를 false로 초기화
    setSearchInput(""); // 검색어도 초기화
  }, []); // 컴포넌트 마운트 시에만 실행

  useEffect(() => {
    // xlocation, ylocation이 null이 아닐 때만 API 호출
    if (xlocation !== null && ylocation !== null) {
      handleSearchRestaurant();
      handleSearchCafe();
      handleSearchBar();
    }
  }, [xlocation, ylocation]); // 하나의 useEffect로 통합

  const handleSearchRestaurant = async () => {
    try {
      console.log("음식점 API 호출 시작 - 좌표:", xlocation, ylocation);
      const response = await SearchRestaurant({ xlocation, ylocation });
      console.log(response, "음식점 응답");
      setRestaurant(response);
    } catch (error) {
      console.error("음식점 API 호출 실패:", error);
    }
  };

  const handleSearchCafe = async () => {
    try {
      console.log("카페 API 호출 시작 - 좌표:", xlocation, ylocation);
      const response = await SearchCafe({ xlocation, ylocation });
      console.log(response, "카페 응답");
      setCafe(response);
    } catch (error) {
      console.error("카페 API 호출 실패:", error);
    }
  };

  const handleSearchBar = async () => {
    try {
      console.log("바 API 호출 시작 - 좌표:", xlocation, ylocation);
      const response = await SearchBar({ xlocation, ylocation });
      console.log(response, "바 응답");
      setBar(response);
    } catch (error) {
      console.error("바 API 호출 실패:", error);
    }
  };

  console.log(restaurant, cafe, bar, "restaurant, cafe, bar");

  const handleSearchRecommend = async () => {
    if (!searchInput.trim()) {
      alert("검색어를 입력해주세요.");
      return;
    }

    if (xlocation === null || ylocation === null) {
      alert("위치 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    try {
      console.log(
        "추천 검색 시작 - 검색어:",
        searchInput,
        "좌표:",
        xlocation,
        ylocation
      );

      // 입력된 검색어를 쉼표나 공백으로 분리하여 키워드 배열 생성
      const keywords = searchInput
        .split(/[,\s]+/) // 쉼표 또는 공백으로 분리
        .filter((keyword) => keyword.trim().length > 0) // 빈 문자열 제거
        .map((keyword) => keyword.trim()); // 앞뒤 공백 제거

      if (keywords.length === 0) {
        alert("유효한 검색어를 입력해주세요.");
        return;
      }

      console.log("처리된 키워드 배열:", keywords);

      const response = await SearchRecommend({
        keyword: keywords,
        xlocation,
        ylocation,
      });

      console.log("추천 검색 응답:", response);

      // API 응답을 inputPlace에 저장
      setInputPlace(response);

      // 검색 완료 후 changeView를 true로 설정
      setChangeView(true);

      // API 완료 후에만 페이지 이동
      // navigate("/place/search");
    } catch (error) {
      console.error("추천 검색 실패:", error);

      // 더 자세한 에러 처리
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: {
            status?: number;
          };
        };
        if (axiosError.response?.status === 400) {
          alert("잘못된 검색어입니다. 다시 입력해주세요.");
        } else if (axiosError.response?.status === 401) {
          alert("로그인이 필요합니다.");
        } else if (
          axiosError.response?.status &&
          axiosError.response.status >= 500
        ) {
          alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        } else {
          alert("검색에 실패했습니다. 다시 시도해주세요.");
        }
      } else {
        alert("네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.");
      }
    }
  };

  const handlePlaceAuto = async () => {
    if (xlocation === null || ylocation === null) {
      alert("위치 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    try {
      console.log("자동 추천 시작 - 좌표:", xlocation, ylocation);

      const response = await PlaceAuto({ xlocation, ylocation });
      console.log(response, "자동 추천 응답");

      // 응답 상태 코드가 200인 경우에만 실행
      if (response.status === 200) {
        console.log("✅ 200 응답 받음 - 자동 추천 결과 표시");

        // API 응답 데이터를 inputPlace에 저장 (response.data가 아닌 response.data)
        setInputPlace(response.data);

        // changeView를 true로 설정하여 검색 결과 화면으로 전환
        setChangeView(true);
      } else {
        console.log(`⚠️ 예상과 다른 응답 코드: ${response.status}`);
      }
    } catch (error) {
      console.error("자동 추천 실패:", error);
      alert("자동 추천에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 자동 추천 버튼이나 특정 조건에서 호출할 수 있도록 useEffect 추가
  useEffect(() => {
    // 위치 정보가 로드된 후 자동으로 PlaceAuto 호출 (예시)
    // 필요시 이 로직을 수정하거나 제거할 수 있습니다
    if (xlocation !== null && ylocation !== null) {
      // handlePlaceAuto(); // 자동 실행을 원하면 주석 해제
    }
  }, [xlocation, ylocation]);

  return (
    <MainContainer>
      <div className="w-full pt-[20px] pb-[10px] pl-[10px] pr-[10px] flex flex-col justify-between items-center gap-[15px]">
        <div className="w-full flex justify-start" onClick={() => navigate(-1)}>
          <BackIcon />
        </div>
        <InputBoxContainer>
          <InputBox
            placeholder="맛집,카페,메뉴 검색"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchRecommend();
              }
            }}
          />
          <div className="flex gap-2">
            <StyledButton onClick={handleSearchRecommend} title="검색">
              <SearchIcon />
            </StyledButton>
            <AutoButton onClick={handlePlaceAuto} title="자동 추천">
              🤖
            </AutoButton>
          </div>
        </InputBoxContainer>
      </div>
      <ContentContainer>
        {changeView === true ? (
          <PlaceBoxWrapper>
            <Category />
            <PlaceBoxWrapper>
              <PlaceSearch />
            </PlaceBoxWrapper>
          </PlaceBoxWrapper>
        ) : (
          <PlaceBoxWrapper>
            <Category />
            <PlaceBoxWrapper>
              <PlaceBox />
            </PlaceBoxWrapper>
          </PlaceBoxWrapper>
        )}
      </ContentContainer>
    </MainContainer>
  );
};

export default Place;

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden; /* 메인 컨테이너 스크롤 숨김 */
`;

const ContentContainer = styled.div`
  flex: 1;
  background-color: #ffffff;
  margin-top: 15px;
  border-radius: 12px 12px 0 0;
  border: 1px solid #b3dbed;
  overflow: hidden; /* 콘텐츠 컨테이너 스크롤 숨김 */
`;

const PlaceBoxWrapper = styled.div`
  padding: 20px;
  height: calc(100vh - 200px); /* 적절한 높이 설정 */
  overflow-y: auto; /* 스크롤 가능하지만 스크롤바 숨김 */

  /* 스크롤바 완전히 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */

  &::-webkit-scrollbar {
    display: none; /* WebKit browsers (Chrome, Safari, Edge) */
  }
`;

const InputBox = styled.input`
  width: 80%;
  height: 50px;
  background-color: #ffffff;
  border-radius: 10px;

  display: flex;
  align-items: center;
  padding-left: 10px;
  color: gray;
  border: none;
  outline: none;
  &:focus {
    outline: none;
    border: none;
  }
`;

const InputBoxContainer = styled.div`
  width: 95%;
  height: 54px;
  background-color: #ffffff;
  border-radius: 10px;
  margin: 5px;
  border: 1px solid #b3dbed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;

const StyledButton = styled.button`
  width: 30px;
  height: 30px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border: none;
  outline: none;
  cursor: pointer;

  &:focus {
    outline: none;
    border: none;
  }
`;

const AutoButton = styled.button`
  width: 30px;
  height: 30px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border: none;
  outline: none;
  cursor: pointer;

  &:focus {
    outline: none;
    border: none;
  }
`;
