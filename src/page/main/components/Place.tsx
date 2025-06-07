import { ShowBox, ShowBoxTop } from "../../../style/components/ShowBox";
import PlaceBox from "../../place/components/PlaceBox";
import { useNavigate } from "react-router-dom";

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
        <PlaceBox isHome={isHome} />
      </ShowBoxTop>
    </ShowBox>
  );
};

export default Place;
