import Title from "../../components/Title";
import { useNavigate } from "react-router-dom";
import SelectBox from "../../components/SelectBox";
import {
  useFontSize,
  fontSizeOptions,
  FontSizeOption,
} from "../../context/FontSizeContext";
import styled from "@emotion/styled";

const Font = () => {
  const navigate = useNavigate();
  const { setFontSize } = useFontSize();

  const handleFontSizeSelect = (selectedOption: FontSizeOption) => {
    setFontSize(selectedOption);
    // 폰트 사이즈 선택 후 홈으로 이동
    navigate("/home");
  };

  return (
    <div className="font-size-page">
      <Title title="글자 크기 조정" />
      <SubText>원하는 글자 크기를 선택해 보세요!</SubText>
      {fontSizeOptions.map((option, index) => (
        <div
          key={index}
          onClick={() => handleFontSizeSelect(option)}
          className={`cursor-pointer transition-all duration-200 
          }`}
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

const SubText = styled.div`
  margin-bottom: 30px;
  font-size: 14px;
`;
