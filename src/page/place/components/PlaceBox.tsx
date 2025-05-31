import styled from "@emotion/styled";

const PlaceBox = () => {
  return (
    // 데이터 형태에 따른 변수 정의 필요
    <PlaceBoxContainer>
      <div className="w-full h-[60%] bg-[#F5F5F5]">사진</div>
      <div className="flex flex-col pl-[10px] pt-[5px]">
        <div> 음식점 이름 </div>
        <div className="flex flex-row text-[10px] gap-[10px] text-gray-400">
          <div> 지역 </div>
          <div> 종류 </div>
          <div> 좋아요 </div>
        </div>
      </div>
    </PlaceBoxContainer>
  );
};

export default PlaceBox;

const PlaceBoxContainer = styled.div`
  width: 165px;
  height: 140px;
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid #f5f5f5;
  display: flex;
  flex-direction: column;
`;
