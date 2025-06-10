import styled from "@emotion/styled";
import { useInputPlace } from "../../../store/usePlaceStore";

const HomePlace = () => {
  const { allPlace } = useInputPlace();
  console.log("🏠 HomePlace - allPlace:", allPlace);
  console.log("🏠 HomePlace - allPlace.length:", allPlace?.length);
  console.log(
    "🏠 HomePlace - Array.isArray(allPlace):",
    Array.isArray(allPlace)
  );

  // 안전성 검사: allPlace가 존재하고 배열이며 길이가 0보다 큰지 확인
  if (!allPlace || !Array.isArray(allPlace) || allPlace.length === 0) {
    console.log("🏠 HomePlace - 데이터 없음, 로딩 표시");
    return (
      <PlaceGrid>
        <div className="flex items-center justify-center w-full h-[140px] text-gray-400 col-span-2">
          주변 맛집을 불러오는 중...
        </div>
      </PlaceGrid>
    );
  }

  console.log("🏠 HomePlace - 렌더링할 데이터:", allPlace.slice(0, 2));

  return (
    <PlaceGrid>
      {allPlace.slice(0, 2).map((place, index) => (
        <PlaceBoxContainer key={index}>
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
      ))}
    </PlaceGrid>
  );
};

export default HomePlace;

const PlaceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
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
