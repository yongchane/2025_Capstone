import Title from "../../components/Title";
import { useNavigate } from "react-router-dom";
import SelectBox from "../../components/SelectBox";

const fontSizeOptions = [
  { title: "작은 텍스트", subtitle: "A", fontSize: 12, left: 120 },
  { title: "중간 텍스트", subtitle: "A", fontSize: 18, left: 120 },
  { title: "큰 텍스트", subtitle: "A", fontSize: 30, left: 120 },
];

const Font = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* 폰트 전역 설정 필요 */}
      <Title title="글자 크기 조정" />
      <div className="mb-[30px]">원하는 글자 크기를 선택해 보세요!</div>
      {fontSizeOptions.map((option, index) => (
        <div
          key={index}
          onClick={() => {
            navigate("/home");
          }}
        >
          <SelectBox
            title={option.title}
            subtitle={option.subtitle}
            fontSize={option.fontSize}
            left={option.left}
          />
        </div>
      ))}
    </div>
  );
};

export default Font;
