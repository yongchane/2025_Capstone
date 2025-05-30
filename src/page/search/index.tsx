import InputPlace from "../../components/InputPlace";
import BackIcon from "../../assets/Back.svg?react";
import useLocationStore from "../../store/useLocationStore";
import { getCurrentPosition } from "../../api/locationApi";

const Search = () => {
  const { searchHistory } = useLocationStore();
  const {
    clearHistory,
    removeFromHistory,
    setEnd,
    setXlocation,
    setYlocation,
  } = useLocationStore();

  const handleLocationClick = (location: string) => {
    setEnd(location);
  };

  const handleDeleteClick = (e: React.MouseEvent, location: string) => {
    e.stopPropagation(); // 상위 요소의 클릭 이벤트 전파 방지
    removeFromHistory(location);
  };

  const handleCurrentLocation = async () => {
    try {
      const position = await getCurrentPosition();
      const xlocation = Number(position.latitude.toFixed(6));
      const ylocation = Number(position.longitude.toFixed(6));
      setXlocation(xlocation);
      setYlocation(ylocation);
      console.log(xlocation, ylocation);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("위치 정보를 가져오는 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col mt-[24px] justify-between">
        <BackIcon />
      </div>
      <InputPlace width="400px" comwidth="300px" />
      <div className="flex flex-col mt-[30px] relative">
        <div
          className="absolute right-0 hover:cursor-pointer"
          onClick={handleCurrentLocation}
        >
          현위치
        </div>
        <div className="flex justify-between items-center mt-[40px]">
          <div className="text-[16px] font-bold">최근기록</div>
          {searchHistory.length > 0 && (
            <button
              onClick={clearHistory}
              className="text-sm text-gray-500 hover:text-gray-700 border-none outline-none bg-[#ffffff]"
            >
              전체 삭제
            </button>
          )}
        </div>
        <div className="mt-[16px] flex flex-col gap-[12px]">
          {searchHistory.map((location, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-[12px] hover:bg-gray-100 rounded-md cursor-pointer"
              onClick={() => handleLocationClick(location)}
            >
              <span>{location}</span>
              <button
                onClick={(e) => handleDeleteClick(e, location)}
                className="text-gray-400 hover:text-gray-600 px-2 border-none outline-none bg-[#ffffff]"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
