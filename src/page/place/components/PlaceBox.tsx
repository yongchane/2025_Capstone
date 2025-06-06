import styled from "@emotion/styled";
import { usePlaceStore } from "../../../store/usePlaceStore";
import { Place } from "../../../store/usePlaceStore";
import { useInputPlace } from "../../../store/usePlaceStore";

const PlaceBox = () => {
  const { restaurant, cafe, bar, selectedCategory, recommendPlaces } =
    usePlaceStore();
  const { inputPlace, changeView } = useInputPlace();
  // 선택된 카테고리에 따라 표시할 데이터 결정
  const getDisplayData = (): Place[] => {
    switch (selectedCategory) {
      case "전체":
        return [...restaurant, ...cafe, ...bar];
      case "맞춤형 추천":
        return recommendPlaces;
      case "음식점":
        return restaurant;
      case "카페":
        return cafe;
      case "술집":
        return bar;
      default:
        return [];
    }
  };

  const displayData = getDisplayData();

  console.log(restaurant, cafe, bar, "restaurant, cafe, bar");
  console.log(selectedCategory, "선택된 카테고리");
  console.log(displayData, "표시될 데이터");
  console.log(inputPlace, "inputPlace");
  console.log(changeView, "changeView 상태");

  return (
    <PlaceGrid>
      {changeView === true ? (
        <>
          {inputPlace.length === 0 ? (
            <div className="flex items-center justify-center w-full h-[140px] text-gray-400 col-span-2">
              검색 결과를 불러오는 중...
            </div>
          ) : (
            inputPlace.map((place, index) => (
              <PlaceBoxContainer key={`search-${index}`}>
                <div className="w-full h-[60%] bg-[#F5F5F5] flex items-center justify-center text-gray-400 text-sm">
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
      ) : (
        <>
          {displayData.length === 0 ? (
            <div className="flex items-center justify-center w-full h-[140px] text-gray-400 col-span-2">
              {selectedCategory} 데이터를 불러오는 중...
            </div>
          ) : (
            displayData.map((place, index) => (
              <PlaceBoxContainer key={`${selectedCategory}-${index}`}>
                <div className="w-full h-[60%] bg-[#F5F5F5] flex items-center justify-center text-gray-400 text-sm">
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

const PlaceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
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
