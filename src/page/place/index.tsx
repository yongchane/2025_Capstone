import styled from "@emotion/styled";
import BackIcon from "../../assets/back.svg?react";
import PlaceBox from "./components/PlaceBox";
import Category from "./components/Category";
import SearchIcon from "../../assets/search.svg?react";
import { useNavigate } from "react-router-dom";
import useLocationStore from "../../store/useLocationStore";
import { SearchRestaurant, SearchCafe, SearchBar } from "../../api/SearchPlace";
import { useEffect } from "react";
import usePlaceStore from "../../store/usePlaceStore";

const Place = () => {
  const navigate = useNavigate();
  const { xlocation, ylocation } = useLocationStore();
  const { restaurant, cafe, bar, setRestaurant, setCafe, setBar } =
    usePlaceStore();

  console.log(xlocation, ylocation, "xlocation, ylocation");

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

  return (
    <MainContainer>
      <div className="w-full pt-[20px] pb-[10px] pl-[10px] pr-[10px] flex flex-col justify-between items-center gap-[15px]">
        <div className="w-full flex justify-start" onClick={() => navigate(-1)}>
          <BackIcon />
        </div>
        <InputBoxContainer>
          <InputBox placeholder="맛집,카페,메뉴 검색" />
          {/* 버튼 연동 필요 */}
          <StyledButton>
            <SearchIcon />
          </StyledButton>
        </InputBoxContainer>
      </div>
      <ContentContainer>
        <Category />
        <PlaceBoxWrapper>
          <PlaceBox />
        </PlaceBoxWrapper>
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
  padding-bottom: 60px;
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
