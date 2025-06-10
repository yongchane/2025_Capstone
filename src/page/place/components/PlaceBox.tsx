import styled from "@emotion/styled";
import { usePlaceStore } from "../../../store/usePlaceStore";
import { Place } from "../../../store/usePlaceStore";
import { useInputPlace } from "../../../store/usePlaceStore";

interface PlaceBoxProps {
  isHome?: boolean;
}

const PlaceBox = ({ isHome = false }: PlaceBoxProps) => {
  const { restaurant, cafe, bar, selectedCategory, recommendPlaces } =
    usePlaceStore();
  const { inputPlace, changeView } = useInputPlace();
  // 선택된 카테고리에 따라 표시할 데이터 결정
  const getDisplayData = (): Place[] => {
    let data: Place[] = [];
    switch (selectedCategory) {
      case "전체":
        data = [...restaurant, ...cafe, ...bar];
        break;
      case "맞춤형 추천":
        data = recommendPlaces;
        break;
      case "음식점":
        data = restaurant;
        break;
      case "카페":
        data = cafe;
        break;
      case "술집":
        data = bar;
        break;
      default:
        data = [];
        break;
    }

    // isHome이 true일 때는 최대 2개만 반환
    return isHome ? data.slice(0, 2) : data;
  };

  const displayData = getDisplayData();

  console.log("=== PlaceBox 렌더링 디버깅 ===");
  console.log("changeView:", changeView);
  console.log("inputPlace:", inputPlace);
  console.log("inputPlace.length:", inputPlace?.length);
  console.log("Array.isArray(inputPlace):", Array.isArray(inputPlace));
  console.log("selectedCategory:", selectedCategory);
  console.log("displayData:", displayData);
  console.log("isHome:", isHome);
  console.log("===============================");

  return (
    <PlaceGrid isHome={isHome}>
      {changeView === true ? (
        <>
          {!inputPlace ||
          !Array.isArray(inputPlace) ||
          inputPlace.length === 0 ? (
            <div className="flex items-center justify-center w-full h-[140px] text-gray-400 col-span-2">
              {!inputPlace || !Array.isArray(inputPlace)
                ? "검색 결과 형식 오류"
                : "검색 결과를 불러오는 중..."}
            </div>
          ) : (
            // isHome일 때는 inputPlace도 최대 2개만 표시
            (isHome ? inputPlace.slice(0, 2) : inputPlace).map(
              (place, index) => (
                <PlaceBoxContainer key={`search-${index}`}>
                  <div className="w-full h-[60%] bg-[#F5F5F5] flex items-center justify-center text-gray-400 text-sm">
                    사진
                  </div>
                  <div className="flex flex-col pl-[10px] pt-[5px] flex-1">
                    <div
                      className="font-medium text-sm truncate"
                      title={place?.placeName || "이름 없음"}
                    >
                      {place?.placeName || "이름 없음"}
                    </div>
                    <div className="flex flex-col  gap-[2px] text-gray-400 mt-1">
                      <PlaceAddressName
                        title={place?.addressName || "주소 없음"}
                      >
                        {place?.addressName || "주소 없음"}
                      </PlaceAddressName>
                    </div>
                  </div>
                </PlaceBoxContainer>
              )
            )
          )}
        </>
      ) : (
        <>
          {displayData.length === 0 ? (
            <div className="flex items-center justify-center w-full h-[140px] text-gray-400 col-span-2">
              {selectedCategory} 데이터를 불러오는 중...
            </div>
          ) : (
            displayData.map((place, index) => (
              <PlaceBoxContainer key={`${selectedCategory}-${index}`}>
                <div className="w-full h-[60%] bg-[#F5F5F5] flex items-center justify-center text-gray-400 text-sm rounded-[10px]">
                  사진
                </div>
                <div className="flex flex-col pl-[10px] pt-[5px] flex-1">
                  <div
                    className="font-medium text-sm truncate"
                    title={place.placeName}
                  >
                    {place.placeName}
                  </div>
                  <div className="flex flex-col  gap-[2px] text-gray-400 mt-1">
                    <PlaceAddressName title={place.addressName}>
                      {place.addressName}
                    </PlaceAddressName>
                  </div>
                </div>
              </PlaceBoxContainer>
            ))
          )}
        </>
      )}
    </PlaceGrid>
  );
};

export default PlaceBox;

const PlaceGrid = styled.div<{ isHome?: boolean }>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${(props) => (props.isHome ? "10px" : "20px")};
  width: 100%;
`;

const PlaceBoxContainer = styled.div`
  width: 165px;
  height: 140px;
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid #f5f5f5;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: #4f94bf;
    box-shadow: 0 2px 8px rgba(79, 148, 191, 0.1);
    transform: translateY(-2px);
  }
`;

const PlaceAddressName = styled.div`
  font-size: 12px;
  font-weight: 500;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;
