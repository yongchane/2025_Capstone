import { ShowBox, ShowBoxTop } from "../../../style/components/ShowBox";
import { useNavigate } from "react-router-dom";
import HomePlace from "./HomePlcae";

interface PlaceProps {
  isHome?: boolean;
}

const Place = ({ isHome = false }: PlaceProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isHome) {
      navigate("/place");
    }
  };

  return (
    <ShowBox
      onClick={handleClick}
      style={{ cursor: isHome ? "pointer" : "default" }}
    >
      <div className="w-[auto] flex flex-col gap-[10px] text-[#ffffff] text-[12px] p-[14px]">
        주변
      </div>
      <ShowBoxTop>
        <div className="text-[14px]">추천 맛집</div>
        <div className="w-[100%] h-[1px] bg-gray-200 mt-[10px] mb-[10px]" />
        <HomePlace />
        <div className="flex justify-center mt-[15px]">
          <div className="flex items-center justify-center w-[50px] h-[auto] p-[5px] text-[12px] text-gray-400 border-[1px] border-gray-200 hover:bg-gray-200 rounded-[5px]">
            더보기
          </div>
        </div>
      </ShowBoxTop>
    </ShowBox>
  );
};

export default Place;
