import InputPlace from "../../components/InputPlace";
import { useNavigate } from "react-router-dom";
import BackIcon from "../../assets/Back.svg?react";
import useLocationStore from "../../store/useLocationStore";

const Simple = () => {
  const navigate = useNavigate();
  const { start, end } = useLocationStore();
  const simplestart = start;
  const simpleend = end;

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
      <div className="flex-1 bg-[#ffffff] mt-[20px] rounded-t-[12px] border border-[#B3DBED]">
        {/* 맞춤형, 카테고리 별 컨텐츠 출력 필요 */}
      </div>
    </div>
  );
};

export default Simple;
